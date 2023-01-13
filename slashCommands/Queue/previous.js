const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-previous', // name of the command
  description: 'Plays the previous song in the queue.', // description of the command
  usage: '/previous', // usage of the cmd
  category: 'Queue', // cmd category
  developer: false, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  inVoiceChannel: true,
  sameVoice: true,
  options: [], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Previous used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    const { member, guildId, options, guild } = interaction;
    const { channel } = member.voice;
    const queue = client.distube.getQueue(guildId);
    try {
      if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        if (!queue || !queue.songs || queue.songs.length == 0) return interaction.reply({
          embeds: [
            new EmbedBuilder().setColor(client.important.ERR_COLOR).setTitle(`${client.emoji.blank} | Error`).setDescription(client.emoji.cross + " | No songs are playing at the moment")
          ],
          ephemeral: true
        }).then(() => {
          interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
        })
        if (check_if_dj(client, member, queue.songs[0])) {
          return interaction.reply({
            embeds: [new EmbedBuilder()
              .setColor(client.important.ERR_COLOR)
              .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
              .setTitle(client.emoji.blank + " Not DJ!")
              .setDescription(`${client.emoji.warning} | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
            ],
            ephemeral: true
          }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
        }
        if (queue.previousSongs.length == 0) {
          const noskip = new EmbedBuilder()
            .setDescription(`${client.emoji.warning} | There are no songs in queue!`)
            .setColor(client.important.ERR_COLOR)
          return interaction.reply({ embeds: [noskip] }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
        } else {
          await client.distube.previous(interaction)
            .then(song => {
              const embed = new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setDescription("⏮ | **Song has been:** `Previous`")
                .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL() })

              interaction.reply({ content: ' ', embeds: [embed], fetchReply: true });
            }).then(() => {
              interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
            })
        }
      } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        if (!queue || !queue.songs || queue.songs.length == 0) return interaction.reply({
          embeds: [
            new EmbedBuilder().setColor(client.important.ERR_COLOR).setTitle(`${client.emoji.cross} | No songs are playing at the moment!`)
          ],
          ephemeral: true
        })
        if (check_if_dj(client, member, queue.songs[0])) {
          return interaction.reply({
            embeds: [new EmbedBuilder()
              .setColor(client.important.ERR_COLOR)
              .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
              .setTitle(client.emoji.blank + " Not DJ!")
              .setDescription(`${client.emoji.warning} | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
            ],
            ephemeral: true
          });
        }
        if (queue.previousSongs.length == 0) {
          const embed = new EmbedBuilder()
            .setColor(client.important.ERR_COLOR)
            .setDescription("🚨 | **There are no** `Previous` **songs**")

          interaction.reply({ content: ' ', embeds: [embed], ephemeral: true });
        } else {
          await client.distube.previous(interaction)
            .then(song => {
              const embed = new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setDescription("⏮ | **Song has been:** `Previous`")
                .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL() })

              interaction.reply({ content: ' ', embeds: [embed], fetchReply: true });
            });
        }
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