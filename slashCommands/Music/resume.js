const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require('discord.js');
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-resume',
  description: 'Resume the currently paused song!',
  usage: '/resume', // usage of the cmd
  category: 'Music', // cmd category
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  inVoiceChannel: true,
  sameVoice: true,
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Resume used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    try {
      const { member, guildId, guild } = interaction;
      const queue = client.distube.getQueue(guildId)
      try {
        if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
          const nomusic = new EmbedBuilder()
            .setDescription(`${client.emoji.cross} | There is no music currently playing!`)
            .setColor(client.important.ERR_COLOR)
          if (!queue || !queue.songs || queue.songs.length == 0) return interaction.reply({ embeds: [nomusic], ephemeral: true }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          }).catch(e => { })
          if (check_if_dj(client, member, queue.songs[0])) {
            return interaction.reply({
              embeds: [new EmbedBuilder()
                .setColor(client.important.ERR_COLOR)
                .setFooter({ text: "WaifuMusic", iconURL: client.user.displayAvatarURL() })
                .setDescription(`${client.emoji.cross} | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
              ],
              ephemeral: true
            }).then(() => {
              interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
            })
          }
          if (!queue.paused) {
            let rsong = new EmbedBuilder()
              .setDescription(`${client.emoji.cross} | The song/queue is already been resumed!`)
              .setColor(client.important.ERR_COLOR)
            return interaction.reply({ embeds: [rsong], ephemeral: true }).then(() => {
              interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
            })
          }
          queue.resume();
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setAuthor({ name: 'Continue', iconURL: `${client.user.displayAvatarURL()}` })
                .setDescription('Song continued!')
                .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
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
                .setFooter({ text: "WaifuMusic", iconURL: client.user.displayAvatarURL() })
                .setDescription(`${client.emoji.cross} | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
              ],
              ephemeral: true
            });
          }
          if (!queue.paused) {
            let rsong = new EmbedBuilder()
              .setDescription(`${client.emoji.cross} | The song/queue is already been resumed!`)
              .setColor(client.important.ERR_COLOR)
            return interaction.reply({ embeds: [rsong], ephemeral: true })
          }
          queue.resume();
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setAuthor({ name: 'Continue', iconURL: `${client.user.displayAvatarURL()}` })
                .setDescription('Song continued!')
                .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
            ]
          })
        }
      } catch (e) {
        console.log(e)
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
      console.log(e)
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