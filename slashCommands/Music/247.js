const { EmbedBuilder, ApplicationCommandType, WebhookClient, PermissionBitField } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const { Database } = require("st.db");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
    id: weblog.cmdl.id,
    token: weblog.cmdl.token,
});

const GVoice = new Database("./databases/models/voice.json", { databaseInObject: true });

module.exports = {
    name: 'waifu-247', // name of the command
    description: 'Enable never leave the VC!', // description of the command
    usage: '/waify-247', // usage of the cmd
    category: 'Info', // cmd category
    developer: false, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'Administrator', // discord perms user to see the cmd 
    userPerms: ['Administrator'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    inVoiceChannel: true,
    sameVoice: true,
    options: [], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **247 used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        try {
            const queue = client.distube.getQueue(interaction);
            const nomusic = new EmbedBuilder()
                .setDescription(`${client.emoji.cross} | There is no music currently playing!`)
                .setColor(client.important.ERR_COLOR)
            if (!queue || !queue.songs || queue.songs.length == 0) return interaction.reply({ embeds: [nomusic], ephemeral: true })

            const db = await GVoice.get(interaction.guild.id);

            if (db.voice_enable === true) {
                await client.createDVoice(interaction);
    
                const embed = new EmbedBuilder()
                    .setTitle(client.emoji.blank + " Turned Off")
                    .setDescription(`${client.emoji.off247} | Mode 24/7 has been: **Deactivated**`)
                    .setColor(client.important.MAIN_COLOR);
    
                interaction.reply({ embeds: [embed] });
            } else if (db.voice_enable === false) {
                await client.createEVoice(interaction);
    
                const embed = new EmbedBuilder()
                    .setTitle(client.emoji.blank + " Turned On")
                    .setDescription(`${client.emoji.on247} | Mode 24/7 has been: **Activated**`)
                    .setColor(client.important.MAIN_COLOR);
    
                await interaction.reply({ embeds: [embed] });
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