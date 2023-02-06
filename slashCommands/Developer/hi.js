const { EmbedBuilder, ApplicationCommandType } = require("discord.js"); // packages

const wait = require('node:timers/promises').setTimeout; // this is built in, no need to npm install

module.exports = {
  name: 'hi', // name of the command
  description: 'test', // description of the command
  usage: '', // usage of the cmd
  category: 'dev', // cmd category
  developer: true, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'Administrator', // discord perms
  options: [], // options string
  execute: async (client, interaction) => {
    try {
      await interaction.reply('hi' + embed)
      wait(1000)
      await interaction.editReply('hello')
    } catch (e) {
      console.log(e)
      interaction.reply({ content: e.stack, ephemeral: true })
    }
  }
}