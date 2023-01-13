const { ApplicationCommandType, EmbedBuilder } = require("discord.js"); // packages

module.exports = {
  name: 'userInfo', // name of the command
  // description: '', description of the command
  developer: false, // false if the command is for public
  type: ApplicationCommandType.User, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms
  // options: [], options string
  execute: async (client, interaction) => {
    const Embed = new EmbedBuilder()
      .setColor(client.embed.color)
      .setAuthor({ name: interaction.targetUser.tag, iconURL: interaction.targetUser.displayAvatarURL() })
      .setThumbnail(interaction.targetUser.displayAvatarURL())
      .addFields(
        { name: "ID", value: `${interaction.targetUser.id}` },
        // { name: "Roles", value: `${interaction.targetUser.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "None"}` },
        { name: "Member Since", value: `<t:${parseInt(interaction.targetUser.joinedTimestamp / 1000)}:R>`, inline: true },
        { name: "Discord User Since", value: `<t:${parseInt(interaction.targetUser.createdTimestamp / 1000)}:R>`, inline: true }
      )

    interaction.reply({ embeds: [Embed], ephemeral: true })
  }
}