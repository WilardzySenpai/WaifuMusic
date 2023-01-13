const { EmbedBuilder } = require("discord.js");
const ee = require('../Config/embed.json');
const { Database } = require("st.db");

const GVoice = new Database("./databases/models/voice.json", { databaseInObject: true });

module.exports = async (client, queue) => {
    const db = await GVoice.get(queue.textChannel.guild.id);

    if (db.voice_enable === true) {
        await client.UpdateMusic(queue);

        const embed = new EmbedBuilder()
            .setTitle(client.emoji.blank + " Song Ended")
            .setDescription('End of songs in the list')
            .setColor(client.important.MAIN_COLOR)

        queue.textChannel.send({ embeds: [embed] })
    } else if (db.voice_enable === false) {
        await client.UpdateMusic(queue);
        await client.distube.voices.leave(queue.textChannel.guild);

        const embed = new EmbedBuilder()
            .setTitle(client.emoji.blank + " Song Ended")
            .setDescription('End of songs in the list')
            .setColor(client.important.MAIN_COLOR)

        queue.textChannel.send({ embeds: [embed] })
    }
}