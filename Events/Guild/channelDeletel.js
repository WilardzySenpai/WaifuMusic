const { Database } = require("st.db");
const client = require('../../Structures/WaifuMusic');

const GSetup = new Database("./databases/models/setup.json", { databaseInObject: true });

module.exports = {
    name: 'channelDelete',
    execute: async (channel) => {
        if (channel.type == 2) {
            if (channel.members.has(client.user.id)) {
                const queue = client.distube.getQueue(channel.guild.id);
                if (queue) {
                    client.distube.stop(channel);
                    return;
                }
            }
        }

        if (channel.type == 13) {
            if (channel.members.has(client.user.id)) {
                const queue = client.distube.getQueue(channel.guild.id);
                if (queue) {
                    client.distube.stop(channel);
                    return;
                }
            }
        }

        if (channel.type == 0) {
            const db = await GSetup.get(channel.guild.id);
            if (db.setup_ch == channel.id) {
                const queue = client.distube.getQueue(channel.guild.id);
                await client.createAlreadySetup(channel); // Can find on handlers/loadDatabase.js
                if (queue) {
                    client.distube.stop(channel);
                    client.distube.voices.leave(channel.guild);
                    return;
                }
            }
        }
    }
}