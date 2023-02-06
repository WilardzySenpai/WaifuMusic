const { ApplicationCommandType } = require("discord.js"); // packages

module.exports = {
  name: 'nuke', // name of the command
  description: 'Nuke the channel', // description of the command
  category: 'dev', // cmd category
  developer: true, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'ManageChannels', // discord perms
  options: [
    {
      name: 'channel',
      description: 'channel to nuke',
      type: 7
    }
  ], // options string
  execute: async (client, interaction) => {
    const channeltonuke = interaction.options.getChannel('channel') || interaction.channel;
    interaction.reply(`Nuking ${channeltonuke}`);
    const position = channeltonuke.position;
    const newChannel = await channeltonuke.clone();
    await channeltonuke.delete();
    newChannel.setPosition(position);
    newChannel.send(`Channel Nuked by ${interaction.user} @everyone!!`);
    return newChannel.send("https://media1.tenor.com/images/e275783c9a40b4551481a75a542cdc79/tenor.gif?itemid=3429833");
  }
}