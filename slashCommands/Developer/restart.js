const { EmbedBuilder, ApplicationCommandType } = require("discord.js"); // packages

// const { check_if_dj } = require("../../Util/functions");

module.exports = {
    name: 'waifu-restart', // name of the command
    description: 'Set news to waifumusic', // description of the command
    developer: true, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'Administrator', // discord perms
    options: [], // options string
    execute: async (client, interaction) => {
        try {
            await interaction.deferReply({ ephemeral: false });
            if (interaction.user.id != "939867069070065714") return interaction.channel.send("You not the client the owner!")

            const embed = new EmbedBuilder()
                .setDescription("**Account has been**: `Shutting down...`")
                .setColor(client.important.MAIN_COLOR);

            await interaction.editReply({ embeds: [embed] });
            process.exit();
        } catch (e) {
            console.log(e)
        }
    }
}