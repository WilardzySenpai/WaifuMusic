const { EmbedBuilder } = require("discord.js");
const ee = require('../Config/embed.json');
const client = require('../Structures/WaifuMusic');

module.exports = async (channel, e) => {
    const embed = new EmbedBuilder()
        .setTitle(client.emoji.blank + " Boom Error!")
        .setDescription(client.emoji.warning + `An error encountered: ${e}`)
        .setColor(client.important.ERR_COLOR)

    channel.send({ embeds: [embed] })
    console.error(e)
}