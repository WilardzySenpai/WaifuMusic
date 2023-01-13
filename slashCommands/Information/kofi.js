const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const hachiki = "https://i.imgur.com/jUwn6sF.png";
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-kofi', // name of the command
  description: 'Support Hachiki on Ko-fi!', // description of the command
  usage: '/waifu-kofi', // usage of the cmd
  category: 'Info', // cmd category
  developer: false, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  options: [], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **KoFi used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    try {
        await interaction.reply({ embeds: [
            new EmbedBuilder()
            .setColor('White')
            .setAuthor({ name: 'Ko-fi' })
            .setDescription('**[Support Hachiki on Ko-fi! ❤️. ko-fi.com/hachiki_hoshino](https://ko-fi.com/hachiki_hoshino)**\n\nSupport Hachiki On Ko-fi. Ko-fi lets you support the people and causes you love with small donations')
            .setImage(hachiki)
        ] 
    })
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