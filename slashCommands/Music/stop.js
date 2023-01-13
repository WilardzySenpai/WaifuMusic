const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require('discord.js');
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-stop',
  description: 'Stop the current song and leave the voice channel.',
  usage: '/stop', // usage of the cmd
  category: 'Music', // cmd category
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  inVoiceChannel: true,
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Stop used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    try {
      const { member, guildId, guild } = interaction;
      const queue = client.distube.getQueue(guildId)
      try {
        if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
          const nomusic = new EmbedBuilder()
            .setDescription(`${client.emoji.cross} | There is no music currently playing!`)
            .setColor(client.important.ERR_COLOR)
          if (!queue || !queue.songs || queue.songs.length == 0) return interaction.reply({ embeds: [nomusic], ephemeral: true }).catch(e => { })
          if (check_if_dj(client, member, queue.songs[0])) {
            return interaction.reply({
              embeds: [new EmbedBuilder()
                .setColor(client.important.ERR_COLOR)
                .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setDescription(`${client.emoji.cross} | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
              ],
              ephemeral: true
            }).then(() => {
              interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
            })
          }
          queue.stop();
          const msg = await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setAuthor({ name: 'Stop the Queue', iconURL: `${client.user.displayAvatarURL()}` })
                .setDescription(`${client.emoji.check} | The has been Stop and Clear!`)
                .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            ]
          }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
        } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
          const nomusic = new EmbedBuilder()
            .setDescription(`${client.emoji.cross} | There is no music currently playing!`)
            .setColor(client.important.ERR_COLOR)
          if (!queue || !queue.songs || queue.songs.length == 0) return interaction.reply({ embeds: [nomusic], ephemeral: true }).catch(e => { })
          if (check_if_dj(client, member, queue.songs[0])) {
            return interaction.reply({
              embeds: [new EmbedBuilder()
                .setColor(client.important.ERR_COLOR)
                .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setDescription(`${client.emoji.cross} | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
              ],
              ephemeral: true
            })
          }
          queue.stop();
          const msg = await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setAuthor({ name: 'Stop the Queue', iconURL: `${client.user.displayAvatarURL()}` })
                .setDescription(`${client.emoji.check} | The has been Stop and Clear!`)
                .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            ]
          })
        }
      } catch (e) {
        console.log(e.stack)
        await interaction.reply({
            embeds:
                [
                    new EmbedBuilder()
                        .setTitle(client.emoji.warning + " Error!")
                        .setDescription("*n error occured!" + `${e}`)
                        .setColor(client.important.ERR_COLOR)
                ],
                ephemeral: true
        })
      }
    } catch (e) {
      console.log(e.stack)
      await interaction.reply({
          embeds:
              [
                  new EmbedBuilder()
                      .setTitle(client.emoji.warning + " Error!")
                      .setDescription("*n error occured!" + `${e}`)
                      .setColor(client.important.ERR_COLOR)
              ],
              ephemeral: true
      })
    }
  }
}