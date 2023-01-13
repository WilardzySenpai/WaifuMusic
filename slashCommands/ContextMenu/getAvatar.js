const { ApplicationCommandType, EmbedBuilder } = require("discord.js"); // packages

module.exports = {
  name: 'getAvatar', // name of the command
  // description: '', description of the command
  developer: false, // false if the command is for public
  type: ApplicationCommandType.User, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms
  // options: [], options string
  execute: async (client, interaction) => {
    const Embed = new EmbedBuilder()
      .setColor(client.embed.color)
      .setDescription(`${interaction.targetUser.username} Avatar`)
      .setImage(`${interaction.targetUser.displayAvatarURL({ size: 512 })}`)
      .setFooter({ text: 'If you want to get this user avatar user /avatar instead'})

    await interaction.reply({ embeds: [Embed], ephemeral: true })
  }
}