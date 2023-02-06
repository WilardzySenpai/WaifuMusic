const { ApplicationCommandType, EmbedBuilder, WebhookClient } = require("discord.js"); // packages
const { randomQuote } = require('animequotes');
const { searchAnime } = require('node-kitsu');
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-aniquote', // name of the command
  description: 'Generate random anime quote', // description of the command
  category: 'Anime', // cmd category
  developer: false, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  // options: [], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Quote used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    const { guild } = interaction;
    try {
      if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        const { quote, anime, id, name } = randomQuote();
        const res = await searchAnime(anime, 0).catch(() => { }) || [];

        const image = res?.[0]?.attributes?.coverImage?.original || null;
        const aniEmbed = new EmbedBuilder()
          .setColor(client.important.MAIN_COLOR)
          .addFields(
            { name: `*Quoted from ${anime}*`, value: `${quote}\n\n-*${name}*` }
          )
          .setImage(image)
          .setTimestamp()
          .setFooter({ text: `Anime Quotes | ${interaction.guild.name}`, iconURL: client.user.displayAvatarURL() })
        return interaction.reply({ embeds: [aniEmbed] }).then(() => {
          interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
        })
      } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        const { quote, anime, id, name } = randomQuote();
        const res = await searchAnime(anime, 0).catch(() => { }) || [];

        const image = res?.[0]?.attributes?.coverImage?.original || null;
        const aniEmbed = new EmbedBuilder()
          .setColor(client.important.MAIN_COLOR)
          .addFields(
            { name: `*Quoted from ${anime}*`, value: `${quote}\n\n-*${name}*` }
          )
          .setImage(image)
          .setTimestamp()
          .setFooter({ text: `Anime Quotes | ${interaction.guild.name}`, iconURL: client.user.displayAvatarURL() })
        return interaction.reply({ embeds: [aniEmbed] })
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