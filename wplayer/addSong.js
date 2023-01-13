const { EmbedBuilder } = require("discord.js");
const ee = require('../Config/embed.json');
const { Database } = require("st.db");

const GMessage = new Database("./databases/models/message.json", { databaseInObject: true });
const GSetup = new Database("./databases/models/setup.json", { databaseInObject: true });

const fstatus = queue =>
    `Volume: ${queue.volume}% | Filter: ${queue.filters.names.join(', ') || 'Off'} | Loop: ${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
    } | Autoplay: ${queue.autoplay ? 'On' : 'Off'}`

module.exports = async (client, queue, song) => {
    const db = await GSetup.get(queue.textChannel.guild.id);
    if (db.setup_enable === true) return;

    const data = await GMessage.get(queue.textChannel.guild.id);
    const msg = await queue.textChannel.messages.cache.get(data.message_id);

    const embed = new EmbedBuilder()
        .setColor(client.important.MAIN_COLOR)
        .setTitle(client.emoji.blank + " Added...")
        .setThumbnail(song.thumbnail)
        .addFields(
            { name: `${client.emoji.playing} | Song`, value: `╰ [${song.name}](${song.url})`, inline: true },
            { name: `${client.emoji.posted} | Posted by`, value: `╰ [${song.uploader.name}](${song.uploader.url})`, inline: true },
            { name: `${client.emoji.timer} | Time`, value: `╰ ${song.formattedDuration}`, inline: true },
        )
        .setFooter({ text: `Status • ${fstatus(queue).toString()}` })

    await msg.edit({ content: " ", embeds: [embed] })
}