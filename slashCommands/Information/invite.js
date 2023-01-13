const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
    name: 'waifu-invite', // name of the command
    description: 'Send an invitation link', // description of the command
    usage: '/waifu-invite', // usage of the cmd
    category: 'Info', // cmd category
    developer: false, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
    userPerms: ['SendMessages'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    options: [], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **Invite used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        try {
            const embed = new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setDescription(`**Invite me**\n [${client.user.username}](https://waifumusic.ml/)`)

            await interaction.reply({ embeds: [embed] })
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