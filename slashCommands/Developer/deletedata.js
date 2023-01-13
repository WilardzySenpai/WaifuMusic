const { EmbedBuilder, ApplicationCommandType } = require("discord.js"); // packages

module.exports = {
  name: 'waifu-deletedata', // name of the command
  description: 'delete all the data', // description of the command
  usage: '/delete', // usage of the cmd
  category: 'dev', // cmd category
  developer: true, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'Administrator', // discord perms
  options: [], // options string
  execute: async (client, interaction) => {
    try {
      client.usernews.clear()
      interaction.reply({ content: 'Data completed.' });
    } catch (e) {
      console.log(e)
    }
  }
}