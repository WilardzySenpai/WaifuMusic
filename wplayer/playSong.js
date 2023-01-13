const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const ee = require('../Config/embed.json');
const client = require("../Structures/WaifuMusic.js");
const Format = Intl.NumberFormat();
const lyricsfinder = require('lyrics-finder');
const { check_if_dj } = require("../Util/functions");
const { Database } = require("st.db");

const GSetup = new Database("./databases/models/setup.json", { databaseInObject: true });

module.exports = async (client, queue, song) => {

    await client.UpdateQueueMsg(queue);
    await client.addChart(song.id);

    const db = await GSetup.get(queue.textChannel.guild.id);
    if (db.setup_enable === true) return;

    var newQueue = client.distube.getQueue(queue.id)
    var data = waifu(newQueue, song)

    const nowplay = await queue.textChannel.send(data)

    const filter = (message) => {
        if (message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId === message.member.voice.channelId) return true;
        else {
            message.reply({ content: "You need to be in a same/voice channel.", ephemeral: true });
        }
    };

    const collector = nowplay.createMessageComponentCollector({ filter, time: 120000, idle: 360000 });

    collector.on('end', async () => {
        collector.stop()
    });

    collector.on('collect', async (message) => {
        const id = message.customId;
        const queue = client.distube.getQueue(message.guild.id);
        const { member } = message;
        if (id == 'pre') {
            if (!queue) {
                collector.stop();
            }
            if (check_if_dj(client, member, newQueue.songs[0])) return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.important.ERR_COLOR)
                        .setTitle(client.emoji.blank + " Not a DJ!")
                        .setDescription(`${client.emoji.warning} | You are not a DJ and not the Song Requester!\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
                ],
                ephemeral: true
            });
            if (queue.previousSongs.length == 0) {
                const noskip = new EmbedBuilder()
                    .setDescription(`${client.emoji.warning} | There are no songs in queue!`)
                    .setColor(client.important.ERR_COLOR)
                message.reply({ embeds: [noskip], ephemeral: true })
            } else {
                await client.distube.previous(message)
                const embed = new EmbedBuilder()
                    .setColor(client.important.MAIN_COLOR)
                    .setTitle(client.emoji.blank + " Previous")
                    .setDescription(client.emoji.check + " Song has been previous")

                await nowplay.edit({ components: [] });
                message.reply({ embeds: [embed], ephemeral: true });
            }
        } else if (id == 'pause') {
            if (!queue) {
                collector.stop()
            }
            if (check_if_dj(client, member, newQueue.songs[0])) return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.important.ERR_COLOR)
                        .setTitle(client.emoji.blank + " Not a DJ!")
                        .setDescription(`${client.emoji.warning} | You are not a DJ and not the Song Requester!\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
                ],
                ephemeral: true
            });
            if (queue.paused) {
                let qpaused = new EmbedBuilder()
                    .setDescription(`${client.emoji.cross} | The song/queue are already paused!`)
                    .setColor(client.important.ERR_COLOR)
                message.reply({ embeds: [qpaused], ephemeral: true })
            } else {
                const pau = new EmbedBuilder()
                    .setColor(client.important.MAIN_COLOR)
                    .setTitle(client.emoji.blank + " Pause")
                    .setDescription(client.emoji.pause + ' Song paused!')
                queue.pause();
                message.reply({ embeds: [pau], ephemeral: true })
            }
        } else if (id == 'resume') {
            if (!queue) {
                collector.stop()
            }
            if (check_if_dj(client, member, newQueue.songs[0])) return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.important.ERR_COLOR)
                        .setTitle(client.emoji.blank + " Not a DJ!")
                        .setDescription(`${client.emoji.warning} | You are not a DJ and not the Song Requester!\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
                ],
                ephemeral: true
            });
            if (!queue.paused) {
                let rsong = new EmbedBuilder()
                    .setDescription(`${client.emoji.cross} | The song/queue is already been resumed!`)
                    .setColor(client.important.ERR_COLOR)
                return interaction.reply({ embeds: [rsong], ephemeral: true })
            } else {
                queue.resume();
                const embed = new EmbedBuilder()
                    .setColor(client.important.MAIN_COLOR)
                    .setTitle(client.emoji.blank + " Continue")
                    .setDescription('Song resumed!')
                message.reply({ embeds: [embed], ephemeral: true })
            }
        } else if (id == 'stop') {
            if (!queue) {
                collector.stop()
            }
            if (check_if_dj(client, member, newQueue.songs[0])) return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.important.ERR_COLOR)
                        .setTitle(client.emoji.blank + " Not a DJ!")
                        .setDescription(`${client.emoji.warning} | You are not a DJ and not the Song Requester!\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
                ],
                ephemeral: true
            });
            queue.stop();
            const embed = new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setTitle(client.emoji.blank + " Stop the Queue")
                .setDescription(`${client.emoji.check} | The has been Stop and Clear!`)
            await nowplay.edit({ components: [] });
            message.reply({ embeds: [embed], ephemeral: true })
        } else if (id == 'next') {
            if (!queue) {
                collector.stop()
            }
            if (check_if_dj(client, member, newQueue.songs[0])) return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.important.ERR_COLOR)
                        .setTitle(client.emoji.blank + " Not a DJ!")
                        .setDescription(`${client.emoji.warning} | You are not a DJ and not the Song Requester!\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
                ],
                ephemeral: true
            });
            if (queue.songs.length === 1 && queue.autoplay === false) {
                const noskip = new EmbedBuilder()
                    .setDescription(`${client.emoji.warning} | There are no songs in queue!`)
                    .setColor(client.important.ERR_COLOR)
                message.reply({ embeds: [noskip], ephemeral: true })
            } else {
                await queue.skip()
                const embed = new EmbedBuilder()
                    .setColor(client.important.MAIN_COLOR)
                    .setTitle(client.emoji.blank + " Skip song")
                    .setDescription('⏭ | Skipped song!')
                await nowplay.edit({ components: [] });
                message.reply({ embeds: [embed] })
            }
        } else if (id == 'vol1') {
            if (!queue) {
                collector.stop()
            }
            if (check_if_dj(client, member, newQueue.songs[0])) return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.important.ERR_COLOR)
                        .setTitle(client.emoji.blank + " Not a DJ!")
                        .setDescription(`${client.emoji.warning} | You are not a DJ and not the Song Requester!\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
                ],
                ephemeral: true
            });
            await client.distube.setVolume(message, queue.volume - 5);
            const embed = new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setTitle(client.emoji.blank + " Change the volume")
                .setDescription(`Changed the volume to **${queue.volume}%**`)
            message.reply({ embeds: [embed], ephemeral: true });
        } else if (id == 'vol2') {
            if (!queue) {
                collector.stop()
            }
            if (check_if_dj(client, member, newQueue.songs[0])) return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.important.ERR_COLOR)
                        .setTitle(client.emoji.blank + " Not a DJ!")
                        .setDescription(`${client.emoji.warning} | You are not a DJ and not the Song Requester!\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
                ],
                ephemeral: true
            });
            await client.distube.setVolume(message, queue.volume + 5);
            const embed = new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setTitle(client.emoji.blank + " Change the volume")
                .setDescription(`Changed the volume to **${queue.volume}%**`)
            message.reply({ embeds: [embed], ephemeral: true });
        } else if (id == 'loop') {
            if (!queue) {
                collector.stop()
            }
            if (check_if_dj(client, member, newQueue.songs[0])) return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.important.ERR_COLOR)
                        .setTitle(client.emoji.blank + " Not a DJ!")
                        .setDescription(`${client.emoji.warning} | You are not a DJ and not the Song Requester!\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
                ],
                ephemeral: true
            });
            if (queue.repeatMode === 0) {
                client.distube.setRepeatMode(message.guild.id, 1)
                const embed = new EmbedBuilder()
                    .setColor(client.important.MAIN_COLOR)
                    .setTitle(client.emoji.blank + " Repeat the song")
                    .setDescription('Repeated current song!')
                message.reply({ embeds: [embed], ephemeral: true })
            } else {
                client.distube.setRepeatMode(message.guild.id, 0)
                const embed = new EmbedBuilder()
                    .setColor(client.important.MAIN_COLOR)
                    .setTitle(client.emoji.blank + " Off repeat")
                    .setDescription('Repeat turned off!')
                message.reply({ embeds: [embed], ephemeral: true })
            }
        } else if (id == 'shuffle') {
            if (!queue) {
                collector.stop()
            }
            if (check_if_dj(client, member, newQueue.songs[0])) return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.important.ERR_COLOR)
                        .setTitle(client.emoji.blank + " Not a DJ!")
                        .setDescription(`${client.emoji.warning} | You are not a DJ and not the Song Requester!\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
                ],
                ephemeral: true
            });
            client.maps.set(`beforeshuffle-${queue.id}`, queue.songs.map(track => track).slice(1));
            await queue.shuffle();
            const embed = new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setTitle(client.emoji.blank + " Shuffled")
                .setDescription(`🔀 | Suffled ${queue.songs.length} Songs!`)
            message.reply({ embeds: [embed], ephemeral: true })
        } else if (id == 'lyrics') {
            if (!queue) {
                collector.stop()
            }
            let CurrentSong = queue.songs[0];
            let song = CurrentSong.name
            let lyrics = null;

            lyrics = await lyricsfinder(song, "");
            if (!lyrics) await message.reply({ content: `${client.emoji.cross} | I couldn't find any lyrics for that song!`, ephemeral: true })
            let lyricsEmbed = new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setTitle(client.emoji.blank + `${song}`)
                .setDescription(`${lyrics || `No Lyrics Found!`}`)
                .setTimestamp();
            if (lyrics.length > 2048) {
                lyricsEmbed.setDescription(`${client.emoji.warning} | Lyrics too long to display!`);
                lyricsEmbed2.setColor(client.important.ERR_COLOR);
            }
            message.followUp({ embeds: [lyricsEmbed], ephemeral: true })
        }
    })
}

function waifu(nowQueue, song) {
    const status = nowQueue =>
        `Volume: \`${nowQueue.volume}%\` | Filter: \`${nowQueue.filters.names.join(', ') || 'Off'}\` | Loop: \`${nowQueue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
        }\` | Autoplay: \`${nowQueue.autoplay ? 'On' : 'Off'}\``

    const fstatus = nowQueue =>
        `Volume: ${nowQueue.volume}% | Filter: ${nowQueue.filters.names.join(', ') || 'Off'} | Loop: ${nowQueue.repeatMode ? (nowQueue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
        } | Autoplay: ${nowQueue.autoplay ? 'On' : 'Off'}`

    const embed = new EmbedBuilder()
        .setColor(client.important.MAIN_COLOR)
        .setTitle(client.emoji.blank + " Now playing...")
        .setThumbnail(song.thumbnail)
        .addFields(
            { name: `${client.emoji.stats} | Status`, value: `╰ ${status(nowQueue).toString()}`, inline: false },
            { name: `${client.emoji.playing} | Song`, value: `╰ [${song.name}](${song.url})`, inline: true },
            { name: `${client.emoji.posted} | Posted by`, value: `╰ [${song.uploader.name}](${song.uploader.url})`, inline: true },
            { name: `${client.emoji.headphone} | Listens`, value: `╰ ${Format.format(song.views)}`, inline: true },
            { name: `${client.emoji.timer} | Time`, value: `╰ ${song.formattedDuration}`, inline: true },
            { name: `${client.emoji.download} | Download link`, value: `╰ [Click here](${song.streamURL})`, inline: true },
            { name: `${client.emoji.request} | Request by`, value: `╰ ${song.user}`, inline: true }
        )
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("pre")
                .setEmoji(client.emoji.previous)
                .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId("pause")
                .setEmoji(client.emoji.pause)
                .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId("resume")
                .setEmoji(client.emoji.resume)
                .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId("stop")
                .setEmoji(client.emoji.stop)
                .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId("next")
                .setEmoji(client.emoji.next)
                .setStyle(ButtonStyle.Secondary)
        )



    const row2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("vol1")
                .setEmoji(client.emoji.voldown)
                .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId("vol2")
                .setEmoji(client.emoji.volup)
                .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId("loop")
                .setEmoji(client.emoji.loop)
                .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId("shuffle")
                .setEmoji(client.emoji.shuffle)
                .setStyle(ButtonStyle.Secondary)
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId("lyrics")
                .setEmoji(client.emoji.lyrics)
                .setStyle(ButtonStyle.Secondary)
        )

    return {
        embeds: [embed],
        components: [row, row2]
    }
}