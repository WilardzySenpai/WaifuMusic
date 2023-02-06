const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const fetch = require("node-fetch");
const subreddits = [
  "animememes",
  "animememe",
  "animemes",
];
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-animeme', // name of the command
  description: 'Get random anime meme', // description of the command
  category: 'Anime', // cmd category
  developer: false, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  options: [], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Meme used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    const rads = subreddits[Math.floor(Math.random() * subreddits.length)];
    const res = await fetch(`https://www.reddit.com/r/${rads}/random/.json`);
    const json = await res.json();
    try {
      const { guild } = interaction;
      if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        if (!json[0]) return interaction.reply({
          content: `${client.emoji.cross} | Could not find a new Meme...\n> *Try again please!*`, ephemeral: true
        });
        const data = json[0].data.children[0].data;
        const Embed = new EmbedBuilder()
          .setColor(client.important.MAIN_COLOR)
          .setURL(`https://reddit.com${data.permalink}`)
          .setTitle(data.title)
          .setDescription(`Author : ${data.author}`)
          .setImage(data.url)
          .setFooter({ text: `${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬` })
          .setTimestamp();
        return interaction.reply({ embeds: [Embed] }).then(() => {
          interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
        })
      } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        if (!json[0]) return interaction.reply({
          content: `${client.emoji.cross} | Could not find a new Meme...\n> *Try again please!*`, ephemeral: true
        });
        const data = json[0].data.children[0].data;
        const Embed = new EmbedBuilder()
          .setColor(client.important.MAIN_COLOR)
          .setURL(`https://reddit.com${data.permalink}`)
          .setTitle(data.title)
          .setDescription(`Author : ${data.author}`)
          .setImage(data.url)
          .setFooter({ text: `${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬` })
          .setTimestamp();
        return interaction.reply({ embeds: [Embed] }).then(() => {
          interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
        })
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