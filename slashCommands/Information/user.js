const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, WebhookClient } = require("discord.js"); // packages
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
    name: 'waifu-report', // name of the command
    description: 'Directly report a user', // description of the command
    usage: '/report', // usage of the cmd
    category: 'Info', // cmd category
    developer: false, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
    userPerms: ['SendMessages'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    options: [], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **Report used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        try {
            const modal = new ModalBuilder()
                .setCustomId('report_user')
                .setTitle('Repot a user');

            const report_user_name = new TextInputBuilder()
                .setCustomId('report_user2')
                .setLabel("What is the name of the user?")
                .setRequired(true)
                .setStyle(TextInputStyle.Short) // style = Short & Paragraph
                .setPlaceholder("Hachiki#3819")
            const report_user_id = new TextInputBuilder()
                .setCustomId('report_user3')
                .setLabel("What is the user ID?")
                .setPlaceholder("939867069070065714")
                .setMaxLength(18)
                .setRequired(true)
                .setStyle(TextInputStyle.Short) // style = Short & Paragraph
            const report_user_reason = new TextInputBuilder()
                .setCustomId('report_user4')
                .setLabel("Reason")
                .setPlaceholder("Being too handsome and smart. This human is not normal at all.")
                .setStyle(TextInputStyle.Paragraph);

            const firstActionRow = new ActionRowBuilder().addComponents(report_user_name);
            const secondActionRow = new ActionRowBuilder().addComponents(report_user_id);
            const thirdActionRow = new ActionRowBuilder().addComponents(report_user_reason);

            // Add inputs to the modal
            modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

            // Show the modal to the user
            await interaction.showModal(modal);
        } catch (e) {
            console.log(e)
        }
    }
}
