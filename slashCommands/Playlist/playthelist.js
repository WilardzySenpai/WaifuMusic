const { EmbedBuilder, ApplicationCommandType } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");

module.exports = {
  name: 'waifu-playthelist', // name of the command
  description: 'Play your custom playlist that you make', // description of the command
  usage: '/waifu-playthelist', // usage of the cmd
  category: 'Playlist', // cmd category
  developer: true, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  inVoiceChannel: true,
  options: [], // options string
  execute: async (client, interaction) => {
    const { member } = interaction;
    try {
        const song = ["https://www.youtube.com/watch?v=N-4YMlihRf4", "https://www.youtube.com/watch?v=rhTl_OyehF8"]
        const playlist = await client.distube.createCustomPlaylist(song, {
            member: member,
            propertice: { name: "Tesint Playlist" },
            parallel: true
        })

        client.distube.play(member.voice.channel, playlist)
    } catch (e) {
      console.log(e)
    }
  }
}