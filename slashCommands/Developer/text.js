const { EmbedBuilder, ApplicationCommandType } = require("discord.js"); // packages

const { check_if_dj } = require("../../Util/functions");

module.exports = {
  name: 'waifu-text', // name of the command
  description: 'Testing reload', // description of the command
  category: 'dev', // cmd category
  developer: true, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'ManageRoles', // discord perms
  options: [], // options string
  execute: async (client, interaction) => {
    try {
      interaction.reply({ content: `hi hello` })
    } catch (e) {
      console.log(e)
    }
  }
}