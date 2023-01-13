const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle, WebhookClient } = require('discord.js');
const { check_if_dj } = require("../../Util/functions");
const Format = Intl.NumberFormat();
const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-nowplaying',
  description: 'Shows the current song playing',
  usage: '/nowplaying', // usage of the cmd
  category: 'Music', // cmd category
  cooldown: 3000, // cooldown of the commands
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Nowplaying used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    try {
      const { member, guildId, guild } = interaction;
      const queue = client.distube.getQueue(guildId);
      const uni = `${queue.songs[0].playing ? '⏸️ |' : '🔴 |'}`;
      const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);
      const song = queue.songs[0];
      if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {

        const embed = new EmbedBuilder()
          .setColor(client.important.MAIN_COLOR)
          .setAuthor({ name: 'Now playing...', iconURL: `${client.user.displayAvatarURL()}` })
          .setDescription(`[${song.name}](${song.url})`)
          .setThumbnail(song.thumbnail)
          .addFields(
            { name: `${client.emoji.stats} | Status`, value: `╰${status(queue).toString()}`, inline: false },
            { name: `${client.emoji.posted} | Posted by`, value: `╰┈[${song.uploader.name}](${song.uploader.url})`, inline: true },
            { name: `${client.emoji.like} | Prefer`, value: `╰┈${Format.format(song.likes)}`, inline: true },
            { name: `${client.emoji.timer} | Played`, value: `${queue.formattedCurrentTime} / ${song.formattedDuration}`, inline: true },
            { name: `${client.emoji.download} | Download link`, value: `╰┈[Click here](${song.streamURL})`, inline: true },
            { name: `${client.emoji.request} | Request by`, value: `╰┈${song.user}`, inline: true },
            { name: `Current Duration: \`[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\``, value: `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(30 - part)}\`\`\`` }
          )

        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('save_song')
              .setLabel('Save Song')
              .setStyle(ButtonStyle.Success),
          );

        const msg = interaction.reply({ embeds: [embed], components: [row], fetchReply: true }).then(() => {
          interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
        })
      } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {

        const embed = new EmbedBuilder()
          .setColor(client.important.MAIN_COLOR)
          .setAuthor({ name: 'Now playing...', iconURL: `${client.user.displayAvatarURL()}` })
          .setDescription(`[${song.name}](${song.url})`)
          .setThumbnail(song.thumbnail)
          .addFields(
            { name: `${client.emoji.stats} | Status`, value: `╰${status(queue).toString()}`, inline: false },
            { name: `${client.emoji.posted} | Posted by`, value: `╰┈[${song.uploader.name}](${song.uploader.url})`, inline: true },
            { name: `${client.emoji.like} | Prefer`, value: `╰┈${Format.format(song.likes)}`, inline: true },
            { name: `${client.emoji.timer} | Played`, value: `${queue.formattedCurrentTime} / ${song.formattedDuration}`, inline: true },
            { name: `${client.emoji.download} | Download link`, value: `╰┈[Click here](${song.streamURL})`, inline: true },
            { name: `${client.emoji.request} | Request by`, value: `╰┈${song.user}`, inline: true },
            { name: `Current Duration: \`[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\``, value: `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(30 - part)}\`\`\`` }
          )

        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('save_song')
              .setLabel('Save Song')
              .setStyle(ButtonStyle.Success),
          );

        const msg = interaction.reply({ embeds: [embed], components: [row], fetchReply: true })
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