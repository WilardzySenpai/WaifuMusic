const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-queue', // name of the command
  description: 'Display the list of songs in the queue.', // description of the command
  usage: '/queue', // usage of the cmd
  category: 'Queue', // cmd category
  developer: false, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  inVoiceChannel: true,
  sameVoice: true,
  options: [
    {
      name: 'page',
      description: 'Page of the queue list',
      type: 10,
      required: false
    }
  ], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Queue used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    try {
      const args = [interaction.options.getNumber('page')];
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
          const qt = queue.songs
            .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
            .join('\n')

          const tracks = queue.songs
            .map((song, i) => `**${i}** - [${song.name}](${song.url}) | \`${song.formattedDuration}\` **Requested by :** ${song.user}`)

          const songs = queue.songs.length;
          const nextSongs = songs > 10 ? `And **${songs - 10}** another song...` : `In playlist **${songs}** songs...`;

          const embed = new EmbedBuilder()
            .setColor(client.important.MAIN_COLOR)
            .setAuthor({ name: `Queue - ${interaction.guild.name}` })
            .setDescription(`${tracks.slice(1, 10).join('\n')}\n\n${nextSongs}`)
            .addFields(
              { name: "**Now playing:**", value: `[${queue.songs[0].name}](${queue.songs[0].url}) - ${queue.songs[0].formattedDuration} | Request by: ${queue.songs[0].user}`, inline: false }
            )
            .setFooter({ text: `${songs} • Songs | ${queue.formattedDuration}` })
            .setTimestamp()
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
          const qt = queue.songs
            .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
            .join('\n')

          const tracks = queue.songs
            .map((song, i) => `**${i}** - [${song.name}](${song.url}) | \`${song.formattedDuration}\` **Requested by :** ${song.user}`)

          const songs = queue.songs.length;
          const nextSongs = songs > 10 ? `And **${songs - 10}** another song...` : `In playlist **${songs}** songs...`;

          const embed = new EmbedBuilder()
            .setColor(client.important.MAIN_COLOR)
            .setAuthor({ name: `Queue - ${interaction.guild.name}` })
            .setDescription(`${tracks.slice(1, 10).join('\n')}\n\n${nextSongs}`)
            .addFields(
              { name: "**Now playing:**", value: `[${queue.songs[0].name}](${queue.songs[0].url}) - ${queue.songs[0].formattedDuration} | Request by: ${queue.songs[0].user}`, inline: false }
            )
            .setFooter({ text: `${songs} • Songs | ${queue.formattedDuration}` })
            .setTimestamp()
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
    } catch (e) {
      console.log(e)
    }
  }
}