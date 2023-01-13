const { EmbedBuilder, ApplicationCommandType, WebhookClient, PermissionsBitField } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
    id: weblog.cmdl.id,
    token: weblog.cmdl.token,
});

module.exports = {
    name: 'queue', // name of the command
    description: 'Check the queue', // description of the command
    aliases: ['q', 'que'], // aliases of the cmd
    usage: 'w!queue', // usage of the cmd
    category: 'Music', // cmd category
    cooldown: 3000, // cooldown of the commands
    userPerms: ['SendMessages'],
    botPerms: ['Connect', 'Speak', 'SendMessages', 'ReadMessageHistory'],
    inVoiceChannel: true,
    sameVoice: true,
    options: [], // options string
    execute: async (client, message, args) => {
        wbc.send(`[prefixCommand] :: **Queue used by ${message.author.tag} from ${message.guild.name}**`);
        const { member, guildId, guild } = message;
        const queue = await client.distube.getQueue(guildId);
        try {
            if (!queue || !queue.songs || queue.songs.length == 0) return message.reply({
                embeds: [
                    new EmbedBuilder().setColor(client.important.ERR_COLOR).setTitle(`${client.emoji.cross} | No songs are playing at the moment!`)
                ]
            }).then(msg => {
                setTimeout(() => msg.delete(), 5000)
            }).catch((err) => console.log(err));
            const qt = queue.songs
                .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
                .join('\n')

            const tracks = queue.songs
                .map((song, i) => `**${i}** - [${song.name}](${song.url}) | \`${song.formattedDuration}\` **Requested by :** ${song.user}`)

            const songs = queue.songs.length;
            const nextSongs = songs > 10 ? `And **${songs - 10}** another song...` : `In playlist **${songs}** songs...`;

            const embed = new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setTitle(client.emoji.blank + " Queue - " + message.guild.name)
                .setDescription(`${tracks.slice(1, 10).join('\n')}\n\n${nextSongs}`)
                .addFields(
                    { name: "**Now playing:**", value: `[${queue.songs[0].name}](${queue.songs[0].url}) - ${queue.songs[0].formattedDuration} | Request by: ${queue.songs[0].user}`, inline: false }
                )
                .setFooter({ text: `${songs} • Songs | ${queue.formattedDuration}` })
                .setTimestamp()
            message.reply({ embeds: [embed] })
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