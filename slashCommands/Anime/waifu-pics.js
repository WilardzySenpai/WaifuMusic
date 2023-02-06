const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const fetch = require("node-fetch");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
    id: weblog.cmdl.id,
    token: weblog.cmdl.token,
});

module.exports = {
    name: 'waifu-pics', // name of the command
    description: 'Get waifu pics with options', // description of the command
    usage: '/waifu-pics <shinobu>', // usage of the cmd
    category: 'Anime', // cmd category
    developer: false, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
    userPerms: ['SendMessages'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'EmbedLinks', 'AttachFiles'], // bot permissions
    // inVoiceChannel: true,
    // sameVoice: true,
    options: [
        {
            name: 'characters',
            description: 'Select a character name',
            type: 3,
            required: true,
            choices: [
                {
                    name: 'Shinobu',
                    value: 'shinobu'
                },
                {
                    name: 'Megumin',
                    value: 'megumin'
                },
                {
                    name: 'Neko',
                    value: 'neko',
                },
                {
                    name: 'Random',
                    value: 'waifu'
                }
            ]
        }
    ], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **Waifu-pics used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        const { member, guild, options } = interaction;
        const query = options.getString("characters");
        try {
            const embed = new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setTitle(client.emoji.blank + ` ${query} Pics!`)
                .setFooter('Powered by: https://waifu.pics')
            if (query === "shinobu") {
                return interaction.reply({ embeds: [embed.setImage(query)] })
            } else if (query === "menumin") {
                return interaction.reply({ embeds: [embed.setImage(query)] })
            } else if (query === "neko") {
                return interaction.reply({ embeds: [embed.setImage(query)] })
            } else if (query === "waifu") {
                return interaction.reply({ embeds: [embed.setImage(query)] })
            }
        } catch (e) {
            console.log(e)
            await interaction.reply({
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