const { EmbedBuilder } = require("discord.js");
const ee = require('../Config/embed.json');

module.exports = async (client, queue) => {
    await client.UpdateMusic(queue);
    
    const embed = new EmbedBuilder()
        .setTitle(client.emoji.blank + " Empty Queue")
        .setDescription('End of the queue')

    queue.textChannel.send({ embeds: [embed] })
}