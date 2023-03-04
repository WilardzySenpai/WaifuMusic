const { MessageEmbed } = require("discord.js");
const { checkIfDJ } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
    id: weblog.cmdl.id,
    token: weblog.cmdl.token,
});

module.exports = {
    name: 'pause',
    description: 'Pause the current music',
    aliases: ['wait', 'zawardo'],
    usage: 'w!pause',
    category: 'Music',
    cooldown: 3,
    userPerms: ['SEND_MESSAGES'],
    botPerms: ['CONNECT', 'SPEAK', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
    inVoiceChannel: true,
    sameVoiceChannel: true,
    options: [],
    async execute(client, message, args) {
        wbc.send(`[prefixCommand] :: **Name used by ${message.author.tag} from ${message.guild.name}**`);

        const { member, guildId } = message;
        const queue = await client.distube.getQueue(guildId);

        try {
            if (!queue || !queue.songs || queue.songs.length === 0) {
                const noMusicEmbed = new MessageEmbed()
                    .setDescription(`${client.emoji.cross} | There is no music currently playing!`)
                    .setColor(client.important.ERR_COLOR);

                return message.reply({ embeds: [noMusicEmbed] }).then(msg => msg.delete({ timeout: 5000 })).catch(console.error);
            }

            const djRole = checkIfDJ(client, member, queue.songs[0]);

            if (!djRole) {
                const notDJEmbed = new MessageEmbed()
                    .setColor(client.important.ERR_COLOR)
                    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                    .setDescription(`${client.emoji.cross} | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${djRole}`);

                return message.reply({ embeds: [notDJEmbed] }).then(msg => msg.delete({ timeout: 5000 })).catch(console.error);
            }

            if (queue.paused) {
                const queuePausedEmbed = new MessageEmbed()
                    .setDescription(`${client.emoji.cross} | The song/queue is already paused!`)
                    .setColor(client.important.ERR_COLOR);

                return message.reply({ embeds: [queuePausedEmbed] }).then(msg => msg.delete({ timeout: 5000 })).catch(console.error);
            }

            queue.pause();

            const pausedEmbed = new MessageEmbed()
                .setColor(client.important.MAIN_COLOR)
                .setTitle(client.emoji.blank + ' Pause')
                .setDescription(`${client.emoji.pause} | Song paused!`)
                .setFooter({ text: `⚠ - Action by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

            message.reply({ embeds: [pausedEmbed] });
        } catch (error) {
            console.error(error);

            const errorEmbed = new MessageEmbed()
                .setTitle(client.emoji.warning + ' Error!')
                .setDescription(`An error occurred: ${error}`)
                .setColor(client.important.ERR_COLOR);

            await message.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
};
