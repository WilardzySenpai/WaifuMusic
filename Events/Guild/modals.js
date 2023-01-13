const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../Config/config.json');

module.exports = {
    name: 'interactionCreate',
    execute: async (interaction, client) => {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId === 'myModal') {
            await interaction.reply({ content: 'Your submission was received successfully!' });

            // Get the data entered by the user
            const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
            const hobbies = interaction.fields.getTextInputValue('hobbiesInput');
            console.log({ favoriteColor, hobbies });

            await client.channels.cache.get("1018692674963914783").send({
                embeds: [new EmbedBuilder().setTitle("Hobbies and Color").addFields(
                    { name: `Test`, value: `${favoriteColor}` },
                    { name: 'Hobbies', value: `${hobbies}` }
                )]
            })
        }

        // modals for use reporting
        if (interaction.customId === 'report_user') {
            await interaction.reply({ ephemeral: true, content: `${client.emoji.check} | Your submission was received succesfully!` });

            const report_users2 = interaction.fields.getTextInputValue('report_user2');
            const report_users3 = interaction.fields.getTextInputValue('report_user3');
            const report_users4 = interaction.fields.getTextInputValue('report_user4')
            await client.channels.cache.get("1033020014292369508").send({
                embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle("User Report").addFields(
                    { name: `What is the name of the user?`, value: `┕\`${report_users2}\`` },
                    { name: 'What is the user ID?', value: `┕\`${report_users3}\`` },
                    { name: 'Reason:', value: `┕\`${report_users4}\`` }
                ).setFooter({ text: `${interaction.user.tag} | Reported a user!`, iconURL: `${interaction.user.displayAvatarURL()}` })]
            })
        }

        // modals for bug reporting
        if (interaction.customId === 'bug_report') {
            await interaction.reply({ ephemeral: true, content: `${client.emoji.check} | Your submission was received succesfully!` });

            const bug_reports2 = interaction.fields.getTextInputValue('bug_report2');
            const bug_reports3 = interaction.fields.getTextInputValue('bug_report3');
            await client.channels.cache.get("1033019986706452640").send({
                embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle("Bug Report").addFields(
                    { name: `What command?`, value: `┕\`${bug_reports2}\`` },
                    { name: 'Please describe your bug below.', value: `┕\`${bug_reports3}\`` },
                ).setFooter({ text: `${interaction.user.tag} | Reported a bug!`, iconURL: `${interaction.user.displayAvatarURL()}` })]
            })
        }
    }
}