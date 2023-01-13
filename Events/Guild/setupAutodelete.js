const { EmbedBuilder } = require("discord.js");
const { Database } = require("st.db");
const delay = require("delay");

const db = new Database("./databases/models/setup.json", { databaseInObject: true });

module.exports = {
    name: 'messageCreate',
    execute: async (message, client) => {
        if (!message.guild || !message.guild.available) return;

        await client.createExSetup(message);

        const data = await db.get(message.guild.id);
        if (data.setup_enable === false) return;

        const channel = await message.guild.channels.cache.get(data.setup_ch);
        if (!channel) return;

        if (data.setup_ch != message.channel.id) return;

        if (message.author.id === client.user.id) {
            await delay(3000);
            message.delete();
        }

        if (message.author.bot) return;

        const song = message.cleanContent;
        await message.delete();

        const voiceChannel = await message.member.voice.channel;
        if (!voiceChannel) return message.channel.send(`You need to be in a voice channel.`);

        const options = {
            member: message.member,
            textChannel: message.channel,
            message,
        }

        await client.distube.play(message.member.voice.channel, song, options);
        await UpdateQueue(client, message);
    }
}

async function UpdateQueue(client, message) {
    const queue = client.distube.getQueue(message);
    if (queue) {
        await client.UpdateQueueMsg(queue);
    }
  }