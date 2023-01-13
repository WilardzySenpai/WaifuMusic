const { EmbedBuilder } = require("discord.js");
const ee = require('../Config/embed.json');

module.exports = async (client, queue) => {
    const embed = new EmbedBuilder()
        .setTitle(client.emoji.blank + " Oh no!")
        .setDescription(client.emoji.cross + "I can't find any related song to play")
        .setColor(client.important.ERR_COLOR)

    queue.textChannel.send({ embeds: [embed] })
}