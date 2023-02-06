const { EmbedBuilder, ApplicationCommandType } = require("discord.js"); // packages

// const { check_if_dj } = require("../../Util/functions");
const SlayBotDB = require('../../databases/schema/news');

module.exports = {
  name: 'waifu-setnews', // name of the command
  description: 'Set news to waifumusic', // description of the command
  category: 'dev', // cmd category
  developer: true, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'ManageRoles', // discord perms
  options: [
    {
      name: 'text',
      description: 'news you want to spread',
      type: 3,
      required: true
    }
  ], // options string
  execute: async (client, interaction) => {
    try {
      client.usernews.clear()
      const news = interaction.options.getString("text");
      if (!SlayBotDB.news) return await SlayBotDB.create({ news: news, tag: '939867069070065714', time: new Date() }) + await SlayBotDB.updateOne({ news: news, tag: '939867069070065714', time: new Date() }) + interaction.reply({ content: `${client.emoji.check} | Updated news!` })
      await SlayBotDB.updateOne({ news: news, tag: '939867069070065714', time: new Date() })
    } catch (e) {
      console.log(e)
    }
  }
}