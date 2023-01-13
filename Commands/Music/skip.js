const { EmbedBuilder, ApplicationCommandType, WebhookClient, PermissionsBitField } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const interactionCreate = require("../../Events/Guild/interactionCreate");
const wbc = new WebhookClient({
    id: weblog.cmdl.id,
    token: weblog.cmdl.token,
});

module.exports = {
    name: 'skip', // name of the command
    description: 'Skip to the next song', // description of the command
    aliases: ['next'], // aliases of the cmd
    usage: 'w!skp', // usage of the cmd
    category: 'Music', // cmd category
    cooldown: 3000, // cooldown of the commands
    userPerms: ['SendMessages'],
    botPerms: ['Connect', 'Speak', 'SendMessages', 'ReadMessageHistory'],
    inVoiceChannel: true,
    sameVoice: true,
    options: [], // options string
    execute: async (client, message, args) => {
        wbc.send(`[prefixCommand] :: **Skip used by ${message.author.tag} from ${message.guild.name}**`);
        const { member, guildId } = message;
        const queue = await client.distube.getQueue(guildId);
        try {
            const nomusic = new EmbedBuilder()
                .setDescription(`${client.emoji.cross} | There is no music currently playing!`)
                .setColor(client.important.ERR_COLOR)
            const noskip = new EmbedBuilder()
                .setDescription(`${client.emoji.warning} | There are no songs in queue!`)
                .setColor(client.important.ERR_COLOR)
            if (queue.songs.length === 1 && queue.autoplay === false) {
                return message.reply({ embeds: [noskip] }).then(msg => {
                    setTimeout(() => msg.delete(), 5000)
                }).catch((err) => console.log(err));
            } else if (!queue || !queue.songs || queue.songs.length == 0) return message.reply({ embeds: [nomusic] }).then(msg => {
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
            await queue.skip();
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.important.MAIN_COLOR)
                        .setTitle(client.emoji.blank + " Skipped")
                        .setDescription(`${client.emoji.skip} | Skipped a song!`)
                        .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
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