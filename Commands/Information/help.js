const { EmbedBuilder, WebhookClient } = require("discord.js");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
    id: weblog.cmdl.id,
    token: weblog.cmdl.token,
});

module.exports = {
    name: 'help',
    aliases: ['h', 'hel', 'hp'],
    category: 'Information',
    userPerms: ['SendMessages'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    execute: async (client, message, args) => {
        wbc.send(`[prefixCommand] :: **help used by ${message.author.tag} from ${message.guild.name}**`);
        try {
            if (!args[0]) return getAll(client, message);
            return getCMD(client, message, args[0]);
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

function getAll(client, message) {

    const embed = new EmbedBuilder()
        .setTitle(client.emoji.song + ` ${client.user.username} Help Prefix's Command`)
        .setColor(client.important.MAIN_COLOR)
        .setFooter({ text: `Use ${client.important.WAIFU_PREFIX}help [command name] for more details!` })
        .addFields(
            {
                name: '🎵 - Music', value: `${client.commands.filter((cmd) => cmd.category === "Music").map((cmd) =>
                    `\`${cmd.name}\``).join(", ")}`
            },
            {
                name: '⚙️ - Information', value: `${client.commands.filter((cmd) => cmd.category === "Information").map((cmd) =>
                    `\`${cmd.name}\``).join(", ")}`
            }
        )
    return message.channel.send({ embeds: [embed] });
}

function getCMD(client, message, input) {
    const embed = new EmbedBuilder()
    const cmd = client.commands.get(input.toLowerCase() || client.commands.get(client.aliases.get(input.toLowerCase())))

    if (!cmd) return message.channel.send({ embeds: [embed.setColor(client.important.ERR_COLOR).setTitle(client.emoji.warning + " Oops!").setDescription("There's no command with that name")] })

    if (cmd.name) info = `**Command name:** ${cmd.name}`
    if (cmd.aliases) info += `\n**Other name:** ${cmd.aliases.map(a => `\`${a}\``).join(',')}`
    if (cmd.description) info += `\n**Command details:** ${cmd.description}`
    if (cmd.usage) {
        info += `\n**How to use the command:** ${cmd.usage}`;
        embed.setFooter({ text: "Syntax <> = required, [] = optional" })
    }
    return message.channel.send({ embeds: [embed.setColor(client.important.MAIN_COLOR).setDescription(info)] })
}