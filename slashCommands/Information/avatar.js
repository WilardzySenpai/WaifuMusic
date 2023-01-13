const { ApplicationCommandType, EmbedBuilder, WebhookClient } = require("discord.js"); // packages
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-avatar', // name of the command
  description: 'Get user avatar', // description of the command
  category: 'Info', // cmd category
  developer: false, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  options: [
    {
      name: 'user',
      description: 'Select a user',
      type: 6,
      required: false
    }
  ], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Avatar used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    const target = interaction.options.getMember("user") || interaction.user;
    try {
      const { guild } = interaction;
      if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        const UserAvatar = new EmbedBuilder()
          .setColor(client.important.MAIN_COLOR)
          .addFields(
            { name: `JPG`, value: `${client.emoji.waifu_right} [Click here](${target.displayAvatarURL({ size: 1024, extension: 'jpg' })})`, inline: true },
            { name: `PNG`, value: `${client.emoji.waifu_right} [Click here:](${target.displayAvatarURL({ size: 1024, extension: 'png' })})`, inline: true },
            { name: `GIF`, value: `${client.emoji.waifu_right} [Click here](${target.displayAvatarURL({ size: 1024, extension: 'gif' })})`, inline: true }
          )
          .setImage(target.displayAvatarURL({ size: 1024, extension: 'webp' || 'gif' }))
          .setFooter({ text: `The webp option is a default link`, iconURL: client.user.displayAvatarURL() })
        return interaction.reply({ embeds: [UserAvatar], ephemeral: true }).then(() => {
          interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
        })
      } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        const UserAvatar = new EmbedBuilder()
          .setColor(client.important.MAIN_COLOR)
          .addFields(
            { name: `JPG`, value: `${client.emoji.waifu_right} [Click here](${target.displayAvatarURL({ size: 1024, extension: 'jpg' })})`, inline: true },
            { name: `PNG`, value: `${client.emoji.waifu_right} [Click here:](${target.displayAvatarURL({ size: 1024, extension: 'png' })})`, inline: true },
            { name: `GIF`, value: `${client.emoji.waifu_right} [Click here](${target.displayAvatarURL({ size: 1024, extension: 'gif' })})`, inline: true }
          )
          .setImage(target.displayAvatarURL({ size: 1024, extension: 'webp' || 'gif' }))
          .setFooter({ text: `The webp option is a default link`, iconURL: client.user.displayAvatarURL() })
        return interaction.reply({ embeds: [UserAvatar], ephemeral: true })
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