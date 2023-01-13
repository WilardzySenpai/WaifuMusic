const { EmbedBuilder, ApplicationCommandType, WebhookClient, PermissionBitField, Embed } = require("discord.js"); // packages
const Playlist = require('../../databases/schema/Playlist');
const { check_if_dj } = require("../../Util/functions");
const { Database } = require("st.db");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
    id: weblog.cmdl.id,
    token: weblog.cmdl.token,
});

const GSetup = new Database("./databases/models/setup.json", { databaseInObject: true });

module.exports = {
    name: 'waifu-setup', // name of the command
    description: 'Setup a music channel for waifumusic', // description of the command
    usage: '/waifu-setup', // usage of the cmd
    category: 'Settings', // cmd category
    developer: false, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'Administrator', // discord perms user to see the cmd 
    userPerms: ['Administrator'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    default_member_permissions: 'Administrator', // discord perms
    //   inVoiceChannel: true,
    //   sameVoice: true,
    options: [], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **Setup music used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        // await interaction.deferReply({ ephemeral: false });
        const db = await GSetup.get(interaction.guild.id);

        if (db.setup_enable === true) return interaction.reply({ content: client.emoji.warning + " | Music channel is already been setup!" + `\n> <#${db.setup_ch}>`, ephemeral: true });

        try {
            await interaction.guild.channels.create({
                name: 'waifu-music',
                type: 0,
                topic: 'A channel for waifumusic! easy to use.',
                parent_id: interaction.channel.parentId,
                user_limit: 3,
                rate_limit_per_user: 3,
            }).then(async (channel) => {
                const gemebd = new EmbedBuilder()
                    .setColor(client.important.MAIN_COLOR)
                    .setTitle(client.emoji.blank + " Guide")
                    .setDescription("In order to use this channel, first you must be inside of a voice channel.\nThen type or paste `song/link` on channel and hit **send/enter**\n" + `<@${client.user.id}> will join your VC after you sent the song you want to listen to.`)
                    .addFields(
                        { name: client.emoji.blank + " Buttons Guide", value: `> ${client.emoji.previous} - Play previous\n> ${client.emoji.next} - Skip\n> ${client.emoji.stop} - Stop`, inline: true },
                        { name: client.emoji.blank, value: `> ${client.emoji.pause} - Pause\n> ${client.emoji.resume} - Resume\n> ${client.emoji.loop} - Loop`, inline: true },
                        { name: client.emoji.blank, value: `> ${client.emoji.voldown} - 10% -\n> ${client.emoji.volup} - 10% +\n> ${client.emoji.shuffle} - Shuffle`, inline: true }
                    )
                const membed = new EmbedBuilder()
                    .setColor(client.important.MAIN_COLOR)
                    .setTitle(client.emoji.blank + " No playing song currently!")
                    .setDescription("Start by joining a voice channel and type any `song/link` here!\n╰ Visit: [Waifu Website](https://waifumusic.ml/) | [Invite WaifuMusic](https://waifumusic.ml/pages/invite.html) | [Join support server!](https://discord.com/invite/pD6VPPhWXC)")


                await channel.send({ embeds: [gemebd] });
                await channel.send({ embeds: [membed], components: [client.disSwitch, client.disSwitch2] }).then(async (message) => {

                    await client.createSetup(interaction, channel.id, message.id);

                    const embed = new EmbedBuilder()
                        .setColor(client.important.MAIN_COLOR)
                        .setTitle(client.emoji.blank + " Music System")
                        .setDescription(client.emoji.check + ` WaifuMusic channel is now done and ready to use!\nGo to the channel here: ${channel}`)

                    return interaction.reply({ embeds: [embed] })
                })
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