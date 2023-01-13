const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    execute: async (interaction, client) => {
        if (!interaction.isButton()) return;

        const button = client.buttons.get(interaction.customId);
        if (!button) return;

        try {
            if (button.permissions) {
                if (!interaction.memberPermissions.has(PermissionsBitField.resolve(button.permissions || []))) {
                    const perms = new EmbedBuilder()
                        .setDescription(`${client.emoji.warning} | ${interaction.user}, You don't have \`${button.permissions}\` permissions to interact this button!`)
                        .setColor(client.important.ERR_COLOR)
                    return interaction.reply({ embeds: [perms], ephemeral: true })
                }
            }
            await button.execute(client, interaction);
        } catch (error) {
            console.log(error);
        }
    }
}