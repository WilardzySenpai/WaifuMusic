const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../Config/config.json');


module.exports = {
    name: 'interactionCreate',
    execute: async (interaction, client) => {
        if (interaction.type == 4) {
            if (interaction.isContextMenuCommand()) {
                const { command } = client;
                const { commandName } = interaction;
                const contextCommand = command.get(commandName);
                if (!contextCommand) return;
    
                try {
                    await contextCommand.execute(client, interaction)
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
}