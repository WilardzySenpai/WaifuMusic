const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require('discord.js');
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-loop',
  description: 'Loop the current song.',
  usage: '/loop [type]', // usage of the cmd
  category: 'Music', // cmd category
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  inVoiceChannel: true,
  sameVoice: true,
  options: [
    {
      name: 'type',
      description: 'Choose what kind of loop',
      type: 3,
      required: true,
      choices: [
        {
          name: 'Off',
          value: 'off'
        },
        {
          name: 'The song',
          value: 'song'
        },
        {
          name: 'Queue',
          value: 'queue'
        }
      ]
    }
  ],
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Loop used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    try {
      const { member, guildId, guild } = interaction;
      const loop = interaction.options.getString('type');
      const queue = client.distube.getQueue(guildId);
      try {
        if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
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
          if (!queue) {
            return interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor(client.important.ERR_COLOR)
                  .setAuthor({ name: 'Error', iconURL: `${client.user.displayAvatarURL()}` })
                  .setDescription('No songs are playing!')
              ], ephemeral: true
            }).then(() => {
              interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
            })
          }
          if (loop == 'off') {
            queue.setRepeatMode(0);
            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor(client.important.MAIN_COLOR)
                  .setAuthor({ name: 'Off repeat', iconURL: `${client.user.displayAvatarURL()}` })
                  .setDescription('Repeat turned off!')
                  .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
              ]
            }).then(() => {
              interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
            })
          } else if (loop == 'song') {
            queue.setRepeatMode(1);
            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor(client.important.MAIN_COLOR)
                  .setAuthor({ name: 'Repeat the song', iconURL: `${client.user.displayAvatarURL()}` })
                  .setDescription('Repeated current song!')
                  .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
              ]
            }).then(() => {
              interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
            })
          } else if (loop == 'queue') {
            queue.setRepeatMode(2);
            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor(client.important.MAIN_COLOR)
                  .setAuthor({ name: 'Repeat the song', iconURL: `${client.user.displayAvatarURL()}` })
                  .setDescription('Repeated playlist!')
                  .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
              ]
            }).then(() => {
              interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
            })
          }
        } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
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
          if (!queue) {
            return interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor(client.important.ERR_COLOR)
                  .setAuthor({ name: 'Error', iconURL: `${client.user.displayAvatarURL()}` })
                  .setDescription('No songs are playing!')
              ], ephemeral: true
            })
          }
          if (loop == 'off') {
            queue.setRepeatMode(0);
            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor(client.important.MAIN_COLOR)
                  .setAuthor({ name: 'Off repeat', iconURL: `${client.user.displayAvatarURL()}` })
                  .setDescription('Repeat turned off!')
                  .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
              ]
            })
          } else if (loop == 'song') {
            queue.setRepeatMode(1);
            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor(client.important.MAIN_COLOR)
                  .setAuthor({ name: 'Repeat the song', iconURL: `${client.user.displayAvatarURL()}` })
                  .setDescription('Repeated current song!')
                  .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
              ]
            })
          } else if (loop == 'queue') {
            queue.setRepeatMode(2);
            await interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor(client.important.MAIN_COLOR)
                  .setAuthor({ name: 'Repeat the song', iconURL: `${client.user.displayAvatarURL()}` })
                  .setDescription('Repeated playlist!')
                  .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
              ]
            })
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