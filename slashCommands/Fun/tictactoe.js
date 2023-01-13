const { EmbedBuilder, ApplicationCommandType, PermissionsBitField, WebhookClient } = require("discord.js"); // packages
const xox = require("discord-tictactoe");
const game = new xox({ language: "en", commandOptionName: "user" })
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-tictactoe', // name of the command
  description: 'Play TicTacToe', // description of the command
  usage: '/waitcu-tictactoe <user>', // usage of the cmd
  category: 'Fun', // cmd category
  developer: false, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  options: [
    {
      name: "user",
      description: "Pick a user you wanna play with",
      type: 6,
      required: false

    }
  ], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **TicTacToe used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    try {
        if (!interaction.guild.members.me.permissions.has([PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages])) {
            return interaction.reply({ content: `${client.emoji.warning} | I need \`ViewChannel\`, \`SendMessages\`, & \`ReadMessageHistory\`  to permission to proceed.`, ephemeral: true })
          }
          game.handleInteraction(interaction);
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