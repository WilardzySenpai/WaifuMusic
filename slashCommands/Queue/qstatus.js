const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-qstatus', // name of the command
  description: 'Show the queue status', // description of the command
  usage: '/qstatus', // usage of the cmd
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
    wbc.send(`[slashCommand] :: **Qstatus used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    const { member, guildId, guild } = interaction;
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
        var djs = client.settings.get(queue.id, `djroles`);
        if (!djs || !Array.isArray(djs)) djs = [];
        else djs = djs.map(r => `<@&${r}>`);
        if (djs.length == 0) djs = "`None`";
        else djs.slice(0, 15).join(", ");
        let newTrack = queue.songs[0];
        let embed = new EmbedBuilder()
          .setColor(client.important.MAIN_COLOR)
          .addFields(
            { name: `💡 Requested by:`, value: `┕${newTrack.user}`, inline: true },
            { name: `⏱ Duration:`, value: `┕\`${queue.formattedCurrentTime} / ${newTrack.formattedDuration}\``, inline: true },
            { name: `🌀 Queue:`, value: `┕\`${queue.songs.length} song(s)\`\n┕\`${queue.formattedDuration}\``, inline: true },
            { name: `🔊 Volume:`, value: `┕\`${queue.volume}%\``, inline: true },
            { name: `♾ Loop:`, value: `┕${queue.repeatMode ? queue.repeatMode === 2 ? `✅ \`Queue\`` : `✅ \`Song\`` : `❌ \`None\``}`, inline: true },
            { name: `↪️ Autoplay:`, value: `┕${queue.autoplay ? `✅` : `❌ \`None\``}`, inline: true },
            { name: `❔ Download Song:`, value: `┕[\`Click here\`](${newTrack.streamURL})`, inline: true },
            { name: `❔ Filter${queue.filters.length > 0 ? "s" : ""}:`, value: `┕${queue.filters && queue.filters.length > 0 ? `${queue.filters.map(f => `✅ \`${f}\``).join(`, `)}` : `❌ \`None\``}`, inline: true },
            { name: `🎧 DJ-Role${djs.length > 1 ? "s" : ""}:`, value: `┕${djs}`, inline: true }
          )
          .setAuthor({ name: `${newTrack.name}` })
          .setThumbnail(`https://img.youtube.com/vi/${newTrack.id}/mqdefault.jpg`)
          .setFooter({ text: `💯 ${newTrack.user.tag}`, iconURL: newTrack.user.displayAvatarURL() });
        interaction.reply({ embeds: [embed] }).then(() => {
          interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
        })
      } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        if (!queue || !queue.songs || queue.songs.length == 0) return interaction.reply({
          embeds: [
            new EmbedBuilder().setColor(client.important.ERR_COLOR).setTitle(`${client.emoji.blank} | Error`).setDescription(client.emoji.cross + " | No songs are playing at the moment")
          ],
          ephemeral: true
        })
        var djs = client.settings.get(queue.id, `djroles`);
        if (!djs || !Array.isArray(djs)) djs = [];
        else djs = djs.map(r => `<@&${r}>`);
        if (djs.length == 0) djs = "`None`";
        else djs.slice(0, 15).join(", ");
        let newTrack = queue.songs[0];
        let embed = new EmbedBuilder()
          .setColor(client.important.MAIN_COLOR)
          .addFields(
            { name: `💡 Requested by:`, value: `┕${newTrack.user}`, inline: true },
            { name: `⏱ Duration:`, value: `┕\`${queue.formattedCurrentTime} / ${newTrack.formattedDuration}\``, inline: true },
            { name: `🌀 Queue:`, value: `┕\`${queue.songs.length} song(s)\`\n┕\`${queue.formattedDuration}\``, inline: true },
            { name: `🔊 Volume:`, value: `┕\`${queue.volume}%\``, inline: true },
            { name: `♾ Loop:`, value: `┕${queue.repeatMode ? queue.repeatMode === 2 ? `✅ \`Queue\`` : `✅ \`Song\`` : `❌ \`None\``}`, inline: true },
            { name: `↪️ Autoplay:`, value: `┕${queue.autoplay ? `✅` : `❌ \`None\``}`, inline: true },
            { name: `❔ Download Song:`, value: `┕[\`Click here\`](${newTrack.streamURL})`, inline: true },
            { name: `❔ Filter${queue.filters.length > 0 ? "s" : ""}:`, value: `┕${queue.filters && queue.filters.length > 0 ? `${queue.filters.map(f => `✅ \`${f}\``).join(`, `)}` : `❌ \`None\``}`, inline: true },
            { name: `🎧 DJ-Role${djs.length > 1 ? "s" : ""}:`, value: `┕${djs}`, inline: true }
          )
          .setAuthor({ name: `${newTrack.name}` })
          .setThumbnail(`https://img.youtube.com/vi/${newTrack.id}/mqdefault.jpg`)
          .setFooter({ text: `💯 ${newTrack.user.tag}`, iconURL: newTrack.user.displayAvatarURL() });
        interaction.reply({ embeds: [embed] })
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