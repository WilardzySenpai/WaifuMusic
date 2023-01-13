const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const Guild = require('../../databases/schema/news');
const moment = require("moment");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-news', // name of the command
  description: 'Show the latest bot news', // description of the command
  usage: '/news', // usage of the cmd
  category: 'Info', // cmd category
  developer: false, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  options: [], // options string
  execute: async (client, interaction) => {
    try {
      wbc.send(`[slashCommand] :: **News used by ${interaction.user.tag} from ${interaction.guild.name}**`);
      const { guild } = interaction;
      // if the user uses this commmand the user id will be addded to the database to stop the alert pop up
      // if not the pop up alert continue
      client.usernews.push(guild.id, interaction.user.id, "news");
        
      const guildDB = await Guild.findOne({
        tag: '939867069070065714'
      });

      if(!guildDB) return interaction.reply({ content: `There is no news` });

      const embed = new EmbedBuilder()
        .setColor(client.important.MAIN_COLOR)
        .setTitle('WaifuMusic News!')
        .addFields(
          // { name: 'Date Published', value: `╰${moment(guildDB.time).format("dddd, MMMM Do YYYY")} - *__[\`(${moment(guildDB.time).fromNow()})\`](https://waifumusic.ml)__*` },
          { name: 'Latest News', value: `╰${guildDB.news}` }
        )
        .setFooter({ text: `WaifuMusic | waifumusic.ml`, iconURL: client.user.displayAvatarURL() })
        .setTimestamp();
      await interaction.reply({ embeds: [embed] })
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