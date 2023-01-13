const { EmbedBuilder, ApplicationCommandType, WebhookClient, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js"); // packages
const validUrl = require("valid-url");
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const { Database } = require("st.db");
const wbc = new WebhookClient({
    id: weblog.cmdl.id,
    token: weblog.cmdl.token,
});

const GSetup = new Database("./databases/models/setup.json", { databaseInObject: true });

module.exports = {
    name: 'play', // name of the command
    description: 'Play a music you like', // description of the command
    aliases: ['p', 'pl'],
    usage: 'w!play [song title]', // usage of the cmd
    category: 'Music', // cmd category
    cooldown: 3000, // cooldown of the commands
    userPerms: ['SendMessages'],
    botPerms: ['Connect', 'Speak', 'SendMessages', 'ReadMessageHistory'],
    inVoiceChannel: true,
    sameVoice: true,
    options: [], // options string
    execute: async (client, message, args) => {
        wbc.send(`[prefixCommand] :: **Play used by ${message.author.tag} from ${message.guild.name}**`);
        const { member, guildId, options, guild } = message;
        const voiceChannel = member.voice.channel;
        const string = args.join(' ');
        const db = await GSetup.get(message.guild.id);

        if (db.setup_enable === true) return message.reply({ content: client.emoji.warning + " | This command is disabled cause of music channel is already setup." + `\n> <#${db.setup_ch}>` });
        try {
            if (string) {
                if (!message.guild.members.me.permissions.has([PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak])) {
                    return message.reply({ content: `${client.emoji.warning} | I need \`ViewChannel\`, \`SendMessages\`, \`ReadMessageHistory\`, \`Connect\`, \`Speak\` permission to proceed.` })
                }
                if (validUrl.isUri(string)) {
                    return message.reply({ content: `${client.emoji.warning} | Oops! this song/link is not allowed on prefix!` });
                }
                const msg = await message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.important.MAIN_COLOR)
                            .setDescription(`${client.emoji.song} | Searching...`)
                    ]
                })
                setTimeout(() => msg.delete(), 5000);

                client.distube.play(voiceChannel, string, {
                    member: message.member,
                    textChannel: message.channel,
                    message
                }).catch((err) => message.channel.send({ content: `${client.emoji.warning} | An error encountered: ${err.toString().slice(0, 1974)}` }));
            } else if (!string) {
                // bot join of the user
                client.distube.voices.join(voiceChannel)

                const n_embed = new EmbedBuilder()
                    .setDescription(`Pick a button of genre music you would like to hear!`)
                    .setColor(client.important.MAIN_COLOR)
                    .setTitle(client.emoji.blank + " Music Picker")

                const n_button = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Lo-Fi')
                        .setCustomId('lofi')
                        .setEmoji(client.emoji.lofi)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setLabel('Sadness')
                        .setCustomId('sadgirl')
                        .setEmoji(client.emoji.sad)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setLabel('Anime')
                        .setCustomId('anime')
                        .setEmoji(client.emoji.anime)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setLabel('Metal')
                        .setCustomId('metal')
                        .setEmoji(client.emoji.metal)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setLabel('Kpop')
                        .setCustomId('kpop')
                        .setEmoji(client.emoji.kpop)
                        .setStyle(ButtonStyle.Secondary)
                )
                const dn_button = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Lo-Fi')
                        .setCustomId('lofi')
                        .setEmoji(client.emoji.lofi)
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setLabel('Sadness')
                        .setCustomId('sadgirl')
                        .setEmoji(client.emoji.sad)
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setLabel('Anime')
                        .setCustomId('anime')
                        .setEmoji(client.emoji.anime)
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setLabel('Metal')
                        .setCustomId('metal')
                        .setEmoji(client.emoji.metal)
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setLabel('Kpop')
                        .setCustomId('kpop')
                        .setEmoji(client.emoji.kpop)
                        .setDisabled(true)
                        .setStyle(ButtonStyle.Secondary)
                )
                // const re_button = new ActionRowBuilder().addComponents(
                //     new ButtonBuilder()
                //         .setLabel('Refresh')
                //         .setCustomId('refresh')
                //         .setStyle(ButtonStyle.Success)
                // )
                const msg = await message.reply({ content: 'You did not provide any song so here am I!', embeds: [n_embed], components: [n_button] })
                const collector = message.channel.createMessageComponentCollector({
                    filter: (b) => {
                        if (b.user.id === message.author.id) return true;
                        else {
                            b.reply({ content: `Only **${message.author.username}** can use this button, run the command again to use the help menu.` }); return false;
                        };
                    },
                    time: 120000,
                    idle: 30000
                });
                collector.on('end', async () => {
                    // bot leave of the user if did not interact or the queue is empty
                    const queue = client.distube.getQueue(message.guildId)
                    const message_random = ["I guess really don't wanna hear music...", "Well times up!", "Why did you left me hanging?", "Hmm? where are you?", "Oh! no one click...", "Are you there?", "Hello?", "Hey! you forgot to click!", "What happened to you?", "Oh no...", "Huh? why am I alone?", "No one want to hear music", "I disabled the buttons", "I guess the music youd like isn't here?", "empty space...", "Get back here!", "Umm? mosh mosh?", "Oh god...", "Ehh? no one interaction with me?", "Next time don't foget to put song/name!", "Are you tired to click?", "Bruh"]
                    const msg_desc = message_random[Math.floor(Math.random() * message_random.length)]
                    if (!queue || !queue.songs || queue.songs.length == 0) {
                        client.distube.voices.leave(voiceChannel)
                        await msg.edit({
                            embeds: [new EmbedBuilder()
                                .setDescription(`${msg_desc}`)
                                .setColor(client.important.MAIN_COLOR)
                                .setFooter({ text: 'Out of bounds...' })
                                .setTitle(client.emoji.blank + " Music Picker")], components: [dn_button], content: 'You did not interact with me...'
                        })
                        // if the queue is not empty then dont leave
                    } else if (queue) {
                        const song = queue.songs[0];
                        await msg.edit({
                            embeds: [new EmbedBuilder()
                                .setDescription(`${client.emoji.playing} ─ Current music: [ ${song.name} ]`)
                                .setThumbnail(song.thumbnail)
                                .setColor(client.important.MAIN_COLOR)
                                .setFooter({ text: 'Hey, you can add more songs!' })
                                .setTimestamp()
                                .setTitle(client.emoji.blank + " Music Picker")], content: ' '
                        })
                    }
                });
                collector.on('collect', async (b) => {
                    // if (!b.deferred) await b.deferUpdate()
                    // if (b.customId === "refresh") {
                    //     client.distube.voice.join(voiceChannel)
                    //     await msg.edit({ embeds: [n_embed], components: [n_button] })
                    // }
                    if (!b.deferred) await b.deferUpdate()
                    if (b.customId === "lofi") {
                        const lofi_option = ["Lo-Fi", "Relaxing Lo-Fi", "Chill Lo-Fi", "study lofi", "lofi girl", "anime lofi", "japan lofi", "lofi to sleep", "lofi sleep, relax, study", "lofi best", "lofi 247", "piano lofi"]
                        const d_lofi = lofi_option[Math.floor(Math.random() * lofi_option.length)]
                        const msg = await message.channel.send({
                            content: `*Random lo-fi found: ${d_lofi}*`, embeds: [
                                new EmbedBuilder()
                                    .setColor(client.important.MAIN_COLOR)
                                    .setDescription(`${client.emoji.song} | Playing/Added Lo-Fi songs!`)
                            ]
                        })
                        setTimeout(() => msg.delete(), 5000);

                        client.distube.play(voiceChannel, d_lofi, {
                            member: message.member,
                            textChannel: message.channel,
                            message
                        }).catch((err) => message.channel.send({ content: `${client.emoji.warning} | An error encountered: ${err.toString().slice(0, 1974)}` }));
                    }
                    if (!b.deferred) await b.deferUpdate()
                    if (b.customId === "sadgirl") {
                        const sad_option = ["Lo-Fi", "Relaxing Lo-Fi", "Chill Lo-Fi", "study lofi", "lofi girl", "anime lofi", "japan lofi", "lofi to sleep", "lofi sleep, relax, study", "lofi best", "lofi 247", "piano lofi"]
                        const s_sadg = sad_option[Math.floor(Math.random() * sad_option.length)]
                        const msg = await message.channel.send({
                            content: `*Random lo-fi found: ${s_sadg}*`, embeds: [
                                new EmbedBuilder()
                                    .setColor(client.important.MAIN_COLOR)
                                    .setDescription(`${client.emoji.song} | Playing/Added Sad songs!`)
                            ]
                        })
                        setTimeout(() => msg.delete(), 5000);

                        client.distube.play(voiceChannel, s_sadg, {
                            member: message.member,
                            textChannel: message.channel,
                            message
                        }).catch((err) => message.channel.send({ content: `${client.emoji.warning} | An error encountered: ${err.toString().slice(0, 1974)}` }));
                    }
                });
            }
        } catch (e) {
            console.log(e)
            await message.reply({
                embeds:
                    [
                        new EmbedBuilder()
                            .setTitle(client.emoji.warning + " Error!")
                            .setDescription("*n error occured!" + `${e}`)
                            .setColor(client.important.ERR_COLOR)
                    ],
                ephemeral: true
            })
        }
    }
}