const { ApplicationCommandType, WebhookClient } = require("discord.js");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: "waifu-roundtrip",
  description: "Check the Roundtrip Latency",
  category: 'Info', // cmd category
  developer: true,
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Roundtrip used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
  }
}