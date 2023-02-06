const { ApplicationCommandType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: 'skyavatar',
  description: 'Set SkyAnime Utilities avatar',
  category: 'dev', // cmd category
  developer: true,
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  default_member_permissions: 'Administrator',
  options: [
    {
      name: 'link',
      description: 'a direct link of png/jpg picture',
      type: 3,
      required: true
    }
  ],
  execute: async (client, interaction) => {
    const link = interaction.options.getString('link');
    client.user.setAvatar(`${link}`);
    const skyavatar = new EmbedBuilder()
      .setColor("#303236")
      .setDescription("✅ | Success")
      .setFooter({ text: 'I have change my avatar', iconURL: `${link}` })
      .setImage(`${link}`)
    await interaction.reply({ embeds: [skyavatar] })
  }
}