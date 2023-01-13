const { EmbedBuilder } = require("discord.js");
const { Database } = require("st.db");
const client = require("../../Structures/WaifuMusic");

const db = new Database("./databases/models/setup.json", { databaseInObject: true });

module.exports = {
    name: 'interactionCreate',
    execute: async (interaction) => {
        if (!interaction.guild || interaction.user.bot) return;
        if (interaction.isButton()) {
            const { customId, member } = interaction;
            let voiceMember = interaction.guild.members.cache.get(member.id);
            let channel = voiceMember.voice.channel;

            const queue = client.distube.getQueue(interaction);
            if (!queue) return;

            const data = await db.get(interaction.guild.id);
            if (data.setup_enable === false) return;

            switch (customId) {
                case "sprevious":
                    {
                        if (!channel) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else if (queue.previousSongs.length == 0) {
                            interaction.reply("🚨 | There are no **Previous songs**");
                        } else {
                            await client.distube.previous(interaction);
                            const embed = new EmbedBuilder()
                                .setDescription("⏮ | Song has been: **Previous**")
                                .setColor(client.important.MAIN_COLOR);

                            interaction.reply({ embeds: [embed] });
                        }
                    }
                    break;

                case "sskip":
                    {
                        if (!channel) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else if (queue.songs.length === 1 && queue.autoplay === false) {
                            const embed = new EmbedBuilder()
                                .setColor(client.important.ERR_COLOR)
                                .setDescription("\`🚨\` | There are no **Songs in queue**")

                            interaction.reply({ embeds: [embed] });
                        } else {
                            await client.distube.skip(interaction);
                            interaction.reply({
                                embeds: [new EmbedBuilder()
                                    .setColor(client.important.MAIN_COLOR)
                                    .setAuthor({ name: 'Skip song', iconURL: `${client.user.displayAvatarURL()}` })
                                    .setDescription('⏭ | Skipped song!')]
                            })
                        }
                    }
                    break;

                case "sstop":
                    {
                        if (!channel) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else {
                            await client.distube.stop(interaction);
                            await client.distube.voices.leave(interaction.guild);

                            const memberVoice = interaction.member.voice.channel;

                            const embed = new EmbedBuilder()
                                .setDescription(`🚫 | **Left:** | \`${memberVoice.name}\``)
                                .setColor(client.important.MAIN_COLOR)
                            interaction.reply({ embeds : [embed] });
                            client.UpdateMusic(queue);
                        }
                    }
                    break;

                case "spause":
                    {
                        if (!channel) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } if (queue.paused) {
                            return interaction.reply(`Song is already paused.`)
                        } else {
                            await client.distube.pause(interaction);

                            const embed = new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setDescription(`⏸ | Song has been **Paused**`);

                            interaction.reply({ embeds: [embed] });
                            client.UpdateQueueMsg(queue);
                        }
                    }
                    break;

                case "sresume":
                    {
                        if (!channel) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } if (!queue.paused) {
                            return interaction.reply(`Song is already resumed.`)
                        } else {
                            await client.distube.resume(interaction);

                            const embed = new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setDescription(`▶ | Song has been **Resumed**`);

                            interaction.reply({ embeds: [embed] });
                            client.UpdateQueueMsg(queue);
                        }
                    }
                    break;

                case "svoldown":
                    {
                        if (!channel) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else {
                            await client.distube.setVolume(interaction, queue.volume - 10);

                            const embed = new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setDescription(`🔊 | Decrease volume to: **${queue.volume}%**`)

                            interaction.reply({ embeds: [embed] });
                            client.UpdateQueueMsg(queue);
                        }
                    }
                    break;

                case "svolup":
                    {
                        if (!channel) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else {
                            await client.distube.setVolume(interaction, queue.volume + 10);

                            const embed = new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setDescription(`🔊 | Increase volume to: **${queue.volume}%**`)

                            interaction.reply({ embeds: [embed] });
                            client.UpdateQueueMsg(queue);
                        }
                    }
                    break;

                case "sloop":
                    {
                        if (!channel) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else if (queue.repeatMode === 2) {
                            await client.distube.setRepeatMode(interaction, 0);

                            const embed = new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setDescription(`🔁 | Song is unloop: **All**`)

                            interaction.reply({ embeds: [embed] });
                        } else {
                            await client.distube.setRepeatMode(interaction, 2);

                            const embed = new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setDescription(`🔁 | Song is loop: **All**`)

                            interaction.reply({ embeds: [embed] });
                        }
                    }
                    break;

                case "sautoplay":
                    {
                        if (!channel) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else {
                            const autoplay = queue.toggleAutoplay();

                            const embed = new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setDescription(`🟡 | Autoplay: ${autoplay ? '**On**' : '**Off**'}`)

                            interaction.reply({ embeds: [embed] });
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }
}