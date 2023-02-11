const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
    id: weblog.cmdl.id,
    token: weblog.cmdl.token,
});

module.exports = {
    name: 'waifu-setprefix', // name of the command
    description: 'Set custom prefix', // description of the command
    usage: '/waifu-setprefix [w?]', // usage of the cmd
    category: 'Settings', // cmd category
    developer: false, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'Administrator', // discord perms user to see the cmd 
    userPerms: ['Administrator'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    // inVoiceChannel: true,
    // sameVoice: true,
    options: [
        {
            name: 'prefix',
            description: 'The prefix you want to use',
            type: 3,
            required: true
        }
    ], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **Set prefix used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        const { member, options } = interaction;
        const { guild } = member;
        let prefixN = options.getString("prefix");
        client.settings.ensure(guild.id, {
            prefix: client.important.WAIFU_PREFIX
        });
        try {
            client.settings.set(guild.id, prefixN, "prefix");
            interaction.reply({
                embeds:
                    [
                        new EmbedBuilder()
                            .setColor(client.important.MAIN_COLOR)
                            .setTitle(client.emoji.blank + " Custom Prefix!")
                            .setDescription(client.emoji.check + " A new prefix has been set!\n> " + prefixN)
                    ]
            })
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