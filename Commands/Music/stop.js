const { EmbedBuilder, ApplicationCommandType, WebhookClient, PermissionsBitField } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
    id: weblog.cmdl.id,
    token: weblog.cmdl.token,
});

module.exports = {
    name: 'stop', // name of the command
    description: 'Stop the music and the queue', // description of the command
    aliases: ['', ''], // aliases of the cmd
    usage: 'w!stop', // usage of the cmd
    category: 'Music', // cmd category
    cooldown: 3000, // cooldown of the commands
    userPerms: ['SendMessages'],
    botPerms: ['Connect', 'Speak', 'SendMessages', 'ReadMessageHistory'],
    inVoiceChannel: true,
    sameVoice: true,
    options: [], // options string
    execute: async (client, message, args) => {
        wbc.send(`[prefixCommand] :: **Stop used by ${message.author.tag} from ${message.guild.name}**`);
        const { member, guildId } = message;
        const queue = await client.distube.getQueue(guildId);
        try {
            if (!message.guild.members.me.permissions.has([PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak])) {
                return message.reply({ content: `${client.emoji.warning} | I need \`Connect\`, \`Speak\` permission to proceed.` })
            }
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
            queue.stop();
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.important.MAIN_COLOR)
                        .setTitle(client.emoji.blank + " Stop the queue")
                        .setDescription(`${client.emoji.check} | The has been Stop and Clear!`)
                        .setFooter({ text: `⚠ - Action by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                ]
            });
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