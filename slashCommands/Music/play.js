const { EmbedBuilder, ApplicationCommandType, PermissionsBitField, WebhookClient } = require('discord.js');
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wait = require('node:timers/promises').setTimeout; // this is built in, no need to npm install
const { Database } = require("st.db");
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

const GSetup = new Database("./databases/models/setup.json", { databaseInObject: true });


module.exports = {
  name: 'waifu-play',
  description: 'Play a song from YouTube, SoundCloud, & Spotify',
  usage: '/play [song_name]', // usage of the cmd
  category: 'Music', // cmd category
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  // inVoiceChannel: true,
  // sameVoice: true,
  options: [
    {
      name: 'input',
      description: 'Song name or url',
      type: 3,
      required: true,
      autocomplete: true,
    }
  ],
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Play used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    const { member, guildId, options, guild } = interaction;
    const voiceChannel = interaction.member.voice.channel;
    const queue = client.distube.getQueue(guildId);
    const db = await GSetup.get(interaction.guild.id);

    if (db.setup_enable === true) return interaction.reply({ content: client.emoji.warning + " | This command is disabled cause of music channel is already setup." + `\n> <#${db.setup_ch}>`, ephemeral: true });

    try {
      if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        if (interaction.options.getString('input')) {
          const string = interaction.options.getString('input');
          if (!interaction.guild.members.me.permissions.has([PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak])) {
            return interaction.reply({ content: `${client.emoji.warning} | I need \`Connect\` to permission to proceed.`, ephemeral: true })
          }
          if (string == "https://www.youtube.com/watch?v=PJjo9ZAUiUs") return interaction.reply({ content: `${client.emoji.warning} | Oops! this song/link is not allowed`, ephemeral: true }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
          if (!interaction.member.voice.channel) {
            return await interaction.reply({ ephemeral: true, embeds: [new EmbedBuilder().setColor(client.important.ERR_COLOR).setDescription(`${client.emoji.cross} | You must be in a voice channel!`)] }).then(() => {
              interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
            })
          }
          if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(interaction.member.voice.channel)) return await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(client.important.ERR_COLOR)
                .setDescription(`${client.emoji.cross} | You must be in the same voice channel as the <@${client.user.id}> to use this command!`)
            ], ephemeral: true
          }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
          const msg = await interaction.reply({ content: `${client.emoji.song} | Searching...`, fetchReply: true })
          const message = await interaction.fetchReply();
          await interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          await client.createPlay(interaction, message.id);
          await wait(3000)
          await msg.edit({ content: '', embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setDescription(client.emoji.check + `** | Successfully searched!**`)], fetchReply: true });
          client.distube.play(voiceChannel, string, {
            textChannel: interaction.channel,
            member: interaction.member
          }).catch((err) => interaction.followUp({ content: `${client.emoji.warning} | An error encountered: ${err.toString().slice(0, 1974)}`, ephemeral: true }));
        }
      } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        if (interaction.options.getString('input')) {
          const string = interaction.options.getString('input');
          if (string == "https://www.youtube.com/watch?v=PJjo9ZAUiUs") return interaction.reply({ content: `${client.emoji.warning} | Oops! this song/link is not allowed`, ephemeral: true })
          if (!interaction.member.voice.channel) {
            return await interaction.reply({ ephemeral: true, embeds: [new EmbedBuilder().setColor(client.important.ERR_COLOR).setDescription(`${client.emoji.cross} | You must be in a voice channel!`)] })
          }
          if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(interaction.member.voice.channel)) return await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(client.important.ERR_COLOR)
                .setDescription(`${client.emoji.cross} | You must be in the same voice channel as the <@${client.user.id}> to use this command!`)
            ], ephemeral: true
          })
          const msg = await interaction.reply({ content: `${client.emoji.song} | Searching...`, fetchReply: true })
          const message = await interaction.fetchReply();
          await wait(3000)
          await msg.edit({ content: '', embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setDescription(client.emoji.check + `** | Successfully searched!**`)], fetchReply: true });
          await client.createPlay(interaction, message.id);
          client.distube.play(voiceChannel, string, {
            textChannel: interaction.channel,
            member: interaction.member
          }).catch((err) => interaction.followUp({ content: `${client.emoji.warning} | An error encountered: ${err.toString().slice(0, 1974)}`, ephemeral: true }));
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