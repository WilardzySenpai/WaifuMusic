const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require('discord.js');
const { check_if_dj } = require("../../Util/functions");
const lyricsfinder = require('lyrics-finder');
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-lyrics',
  description: 'Display/Find the lyrics of the song',
  usage: '/lyrics <song>', // usage of the cmd
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
      name: 'current',
      description: 'Lyrics of the playing song',
      type: 1,
    },
    {
      name: 'song',
      description: 'Lyrics of the song you want',
      type: 1,
      options: [
        {
          name: 'name',
          description: 'The song name',
          type: 3,
          required: true
        }
      ]
    }
  ],
  execute: async (client, interaction, args) => {
    wbc.send(`[slashCommand] :: **Lyrics used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    const { member, guildId, options, guild } = interaction;
    const Sub = options.getSubcommand(["current", "song"]);
    const queue = client.distube.getQueue(guildId);
    if (Sub === 'current') {
      try {
        if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
          const msg = await interaction.reply({ content: `Searching for lyrics...`, fetchReply: true }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
          if (!queue) interaction.reply({ content: `${client.emoji.cross} | There is nothing in the queue right now!`, ephemeral: true }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
          let CurrentSong = queue.songs[0];
          let song = CurrentSong.name

          let lyrics = null;
          try {
            lyrics = await lyricsfinder(song, "");
            if (!lyrics) await interaction.followUp({ content: `${client.emoji.cross} | I couldn't find any lyrics for that song!`, ephemeral: true }).then(() => {
              interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
            })
          } catch (e) {
            console.log(e)
          }
          let lyricsEmbed = new EmbedBuilder()
            .setColor(client.important.MAIN_COLOR)
            .setTitle(`${song}`)
            .setDescription(`${lyrics || `No Lyrics Found!`}`)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();
          if (lyrics.length > 2048) {
            lyricsEmbed.setDescription(`${client.emoji.warning} | Lyrics too long to display!`);
            lyricsEmbed2.setColor(client.important.ERR_COLOR);
          }
          await msg.edit({ content: '', embeds: [lyricsEmbed], fetchReply: true }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
        } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
          const msg = await interaction.reply({ content: `Searching for lyrics...`, fetchReply: true })
          if (!queue) interaction.reply({ content: `${client.emoji.cross} | There is nothing in the queue right now!`, ephemeral: true })
          let CurrentSong = queue.songs[0];
          let song = CurrentSong.name

          let lyrics = null;
          try {
            lyrics = await lyricsfinder(song, "");
            if (!lyrics) await interaction.followUp({ content: `${client.emoji.cross} | I couldn't find any lyrics for that song!`, ephemeral: true })
          } catch (e) {
            console.log(e)
          }
          let lyricsEmbed = new EmbedBuilder()
            .setColor(client.important.MAIN_COLOR)
            .setTitle(`${song}`)
            .setDescription(`${lyrics || `No Lyrics Found!`}`)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();
          if (lyrics.length > 2048) {
            lyricsEmbed.setDescription(`${client.emoji.warning} | Lyrics too long to display!`);
          }
          await msg.edit({ content: '', embeds: [lyricsEmbed], fetchReply: true })
        }
      } catch (e) {
        console.log(e)
      }
    }
    if (Sub === 'song') {
      try {
        if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
          const string = interaction.options.getString('name');
          if (!string) return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(`${client.emoji.warning} | Lyrics <song title> The lyrics may be incorrect.`)
                .setColor(client.important.ERR_COLOR)
            ], ephemeral: true
          }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
          const msg = await interaction.reply({ content: "Searching for lyrics...", fetchReply: true });
          try {
            lyrics = await lyricsfinder(string, "");
            if (!lyrics) await interaction.followUp({ content: `${client.emoji.cross} | I couldn't find any lyrics for that song!`, ephemeral: true }).then(() => {
              interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
            })
          } catch (err) {
            console.log(err);
          }
          let lyricsEmbed2 = new EmbedBuilder()
            .setColor(client.important.MAIN_COLOR)
            .setTitle(`${string}`)
            .setDescription(`${lyrics || `No Lyrics Found!`}`)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

          if (lyrics.length > 4096) {
            lyricsEmbed2.setDescription(`${client.emoji.warning} | Lyrics too long to display!`);
            lyricsEmbed2.setColor(client.important.ERR_COLOR);
          }
          msg.edit({ content: '', embeds: [lyricsEmbed2], fetchReply: true }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
        } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
          const string = interaction.options.getString('name');
          if (!string) return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(`${client.emoji.warning} | Lyrics <song title> The lyrics may be incorrect.`)
                .setColor(client.important.ERR_COLOR)
            ], ephemeral: true
          })
          const msg = await interaction.reply({ content: "Searching for lyrics...", fetchReply: true });
          try {
            lyrics = await lyricsfinder(string, "");
            if (!lyrics) await interaction.followUp({ content: `${client.emoji.cross} | I couldn't find any lyrics for that song!`, ephemeral: true });
          } catch (err) {
            console.log(err);
          }
          let lyricsEmbed2 = new EmbedBuilder()
            .setColor(client.important.MAIN_COLOR)
            .setTitle(`${string}`)
            .setDescription(`${lyrics || `No Lyrics Found!`}`)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

          if (lyrics.length > 4096) {
            lyricsEmbed2.setDescription(`${client.emoji.warning} | Lyrics too long to display!`);
            lyricsEmbed2.setColor(client.important.ERR_COLOR);
          }
          msg.edit({ content: '', embeds: [lyricsEmbed2], fetchReply: true })
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
}