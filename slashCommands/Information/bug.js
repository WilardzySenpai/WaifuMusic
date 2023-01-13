const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, WebhookClient } = require("discord.js"); // packages
const { trusted } = require("mongoose");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
    name: 'waifu-bug', // name of the command
    description: 'Directly report a bug you found', // description of the command
    usage: '/bug', // usage of the cmd
    category: 'Info', // cmd category
    developer: false, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
    userPerms: ['SendMessages'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    options: [], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **Bug used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        try {
            const modal = new ModalBuilder()
                .setCustomId('bug_report')
                .setTitle('Bug Report');

            const bug_reports = new TextInputBuilder()
                .setCustomId('bug_report2')
                .setLabel("What command?")
                .setRequired(true)
                .setStyle(TextInputStyle.Short) // style = Short & Paragraph
                .setPlaceholder("/help")
            const bug_reports2 = new TextInputBuilder()
                .setCustomId('bug_report3')
                .setLabel("Please describe your bug below.")
                .setPlaceholder('Avoid using non-descriptive words like "it glitches" or "its broken"')
                .setStyle(TextInputStyle.Paragraph);

            const firstActionRow = new ActionRowBuilder().addComponents(bug_reports);
            const secondActionRow = new ActionRowBuilder().addComponents(bug_reports2);

            // Add inputs to the modal
            modal.addComponents(firstActionRow, secondActionRow);

            // Show the modal to the user
            await interaction.showModal(modal);
        } catch (e) {
            console.log(e)
        }
    }
}
