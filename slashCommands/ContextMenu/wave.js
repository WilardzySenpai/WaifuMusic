const { ApplicationCommandType, EmbedBuilder } = require("discord.js"); // packages
const superagent = require('superagent');

module.exports = {
    name: 'wave', // name of the command
    // description: '', description of the command
    developer: false, // false if the command is for public
    type: ApplicationCommandType.User, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'SendMessages', // discord perms
    // options: [], options string
    execute: async (client, interaction) => {
        try {
            let { body } = await superagent.get(`https://api.waifu.pics/sfw/wave`);
            const embed = new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setDescription(`Hey <@${interaction.targetUser.id}>!, <@${interaction.user.id}> just wave at you!`)
                .setImage(body.url)
                .setTimestamp()
                .setFooter({ text: `${client.user.username} | waifumusic.ml` })
            interaction.reply({ embeds: [embed] })
        } catch (e) {
            console.log(e)
        }
    }
}