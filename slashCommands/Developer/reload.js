const { ApplicationCommandType } = require("discord.js");
const { loadEvents } = require("../../Handlers/eventHandler");
const { loadslashCommands } = require("../../Handlers/commandHandler");
const { loadError } = require("../../Handlers/errorHandler");

module.exports = {
  name: "reload",
  description: 'reload the events or commands',
  category: 'dev', // cmd category
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: 'Administrator',
  developer: true,
  options: [
    {
      name: 'events',
      description: 'reload the events',
      type: 1
    },
    {
      name: 'commands',
      description: 'reload the commands',
      type: 1
    },
    {
      name: 'handler',
      description: 'reload the commands',
      type: 1
    }
  ],
  execute: async (client, interaction) => {
    const sub = interaction.options.getSubcommand(["events", "commands"]);

    switch (sub) {
      case "events": {
        loadEvents(client);
        await interaction.reply({ content: 'events loaded' });
      }
        break;
      case "commands": {
        loadslashCommands(client);
        await interaction.reply({ content: 'commands loaded' });
      }
        break;
      case "handler": {
        loadError(client)
        await interaction.reply({ content: 'handler loaded' })
      }
        break;
    }

  }
}