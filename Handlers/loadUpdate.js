function loadUpdate(client) {
    const { EmbedBuilder } = require("discord.js");
    const { Database } = require("st.db");
    const ee = require("../Config/embed.json");
    const chalk = require("chalk");

    const db = new Database("./databases/models/setup.json", { databaseInObject: true });

    console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.white('[') + chalk.green('WAIFU_INFO') + chalk.white('] ') + chalk.green('Load ') + chalk.white('Update') + chalk.green(' Loaded!'));

    client.UpdateQueueMsg = async function (queue) {
        const CheckDB = await db.has(queue.textChannel.guild.id);
        if (!CheckDB) return;

        const data = await db.get(queue.textChannel.guild.id);
        if (data.setup_enable === false) return;

        const channel = await client.channels.cache.get(data.setup_ch);
        if (!channel) return;

        const playMsg = await channel.messages.fetch(data.setup_msg, { cache: false, force: true });
        if (!playMsg) return;

        const songStrings = [];
        const queuedSongs = queue.songs.map((song, i) => `*\`${i + 1} • ${song.name} • [${song.formattedDuration}]\`* • \`${song.user.tag}\``);

        songStrings.push(...queuedSongs);

        const cSong = queue.songs[0];

        const played = queue.playing ? `Starting playing...` : `Song pause...`;


        const embed = new EmbedBuilder()
            .setAuthor({ name: `${played}`, iconURL: "https://media.tenor.com/images/f004837db9447f6d52a67181d5cca6f5/tenor.gif" })
            .setDescription(`[${cSong.name}](${cSong.url}) \`[${cSong.formattedDuration}]\` • ${cSong.user}`)
            .setColor(client.important.MAIN_COLOR)
            .setImage(`https://img.youtube.com/vi/${cSong.id}/maxresdefault.jpg`)
            .setFooter({ text: `${queue.songs.length} • Song's in Queue | Volume • ${queue.volume}% | ${queue.formattedDuration} • Total Duration` })

        return playMsg.edit({
            embeds: [embed],
            components: [client.enSwitch, client.enSwitch2]
        }).catch((e) => { });
    };

    client.UpdateMusic = async function (queue) {
        const CheckDB = await db.has(queue.textChannel.guild.id);
        if (!CheckDB) return;

        const data = await db.get(queue.textChannel.guild.id);

        if (data.setup_enable === false) return;

        const channel = await client.channels.cache.get(data.setup_ch);
        if (!channel) return;

        const playMsg = await channel.messages.fetch(data.setup_msg, { cache: false, force: true });
        if (!playMsg) return;

        const playEmbed = new EmbedBuilder()
            .setColor(client.important.MAIN_COLOR)
            .setAuthor({ name: `No song playing currently.` })
            .setImage(`https://media1.tenor.com/images/5b81f2b847f75b6fe8be15cca644260a/tenor.gif?itemid=27318347`)
            .setDescription(`>>> [Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2184310032&scope=bot%20applications.commands) | [Support](https://discord.gg/pD6VPPhWXC) | [Website](https://waifumusic.ml/)`)
            .setFooter({ text: `Prefix is: / & w!` });

        return playMsg.edit({
            embeds: [playEmbed],
            components: [client.disSwitch, client.disSwitch2]
        }).catch((e) => { });
    }
}

module.exports = { loadUpdate }