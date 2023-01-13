const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require('discord.js');
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-leave',
  description: 'Disconnect WaifuMusic in a vc',
  usage: '/leave', // usage of the cmd
  category: 'Music', // cmd category
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  inVoiceChannel: true,
  sameVoice: true,
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Leave used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    try {
      const { member, guild } = interaction;
      const queue = client.distube.getQueue(interaction)
      try {
        if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
          const yesmusic = new EmbedBuilder()
            .setDescription(`${client.emoji.cross} | Someone still using me!`)
            .setColor(client.important.ERR_COLOR)
          if (queue) return interaction.reply({ embeds: [yesmusic], ephemeral: true }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          }).catch(e => { });
          client.distube.voices.leave(interaction);
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setAuthor({ name: 'Disconnect', iconURL: `${client.user.displayAvatarURL()}` })
                .setDescription(`${client.emoji.check} | Disconnected from voice channel!`)
                .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            ]
          }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
        } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
          const yesmusic = new EmbedBuilder()
            .setDescription(`${client.emoji.cross} | Someone still using me!`)
            .setColor(client.important.ERR_COLOR)
          if (queue) return interaction.reply({ embeds: [yesmusic], ephemeral: true }).catch(e => { });
          client.distube.voices.leave(interaction);
          await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setAuthor({ name: 'Disconnect', iconURL: `${client.user.displayAvatarURL()}` })
                .setDescription(`${client.emoji.check} | Disconnected from voice channel!`)
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