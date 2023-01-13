const { EmbedBuilder, ApplicationCommandType, WebhookClient, PermissionsBitField } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
    id: weblog.cmdl.id,
    token: weblog.cmdl.token,
});

module.exports = {
    name: 'pause', // name of the command
    description: 'Pause the current music', // description of the command
    aliases: ['wait', 'zawardo'], // aliases of the cmd
    usage: 'w!pause', // usage of the cmd
    category: 'Music', // cmd category
    cooldown: 3000, // cooldown of the commands
    userPerms: ['SendMessages'],
    botPerms: ['Connect', 'Speak', 'SendMessages', 'ReadMessageHistory'],
    inVoiceChannel: true,
    sameVoice: true,
    options: [], // options string
    execute: async (client, message, args) => {
        wbc.send(`[prefixCommand] :: **Name used by ${message.author.tag} from ${message.guild.name}**`);
        const { member, guildId } = message;
        const queue = await client.distube.getQueue(guildId);
        try {
            const nomusic = new EmbedBuilder()
                .setDescription(`${client.emoji.cross} | There is no music currently playing!`)
                .setColor(client.important.ERR_COLOR)
            if (!queue || !queue.songs || queue.songs.length == 0) return message.reply({ embeds: [nomusic] }).then(msg => {
                setTimeout(() => msg.delete(), 5000)
            }).catch((err) => console.log(err));
            if (check_if_dj(client, member, queue.songs[0])) {
                return message.reply({
                    embeds: [new EmbedBuilder()
                        .setColor(client.important.ERR_COLOR)
                        .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                        .setDescription(`${client.emoji.cross} | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
                    ]
                }).then(msg => {
                    setTimeout(() => msg.delete(), 5000)
                }).catch((err) => console.log(err));
            }
            if (queue.paused) {
                let qpaused = new EmbedBuilder()
                    .setDescription(`${client.emoji.cross} | The song/queue are already paused!`)
                    .setColor(client.important.ERR_COLOR)
                return message.reply({ embeds: [qpaused] }).then(msg => {
                    setTimeout(() => msg.delete(), 5000)
                }).catch((err) => console.log(err));
            }
            queue.pause();
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.important.MAIN_COLOR)
                        .setTitle(client.emoji.blank + " Pause")
                        .setDescription(`${client.emoji.pause} | Song paused!`)
                        .setFooter({ text: `⚠ - Action by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                ]
            })
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