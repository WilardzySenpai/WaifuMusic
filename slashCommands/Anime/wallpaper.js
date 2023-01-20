const { EmbedBuilder, ApplicationCommandType, PermissionsBitField, WebhookClient } = require("discord.js"); // packages
const { AnimeWallpaper } = require("anime-wallpaper");
const wall = new AnimeWallpaper();
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
    name: 'waifu-wallpaper', // name of the command
    description: 'Give you a anime wallpaper', // description of the command
    usage: '/waifu-wallpaper <character_name>', // usage of the cmd
    category: 'Anime', // cmd category
    developer: false, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
    userPerms: ['SendMessages'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    //   inVoiceChannel: true,
    options: [
        {
            name: 'anime',
            description: 'Provide a anime',
            type: 3,
            required: true
        },
        {
            name: 'page',
            description: 'What page',
            type: 10,
            required: false
        }
    ], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **Wallpaper used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        // if (!interaction.guild.members.me.permissions.has([PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.Speak, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles])) {
        //     return interaction.reply({ content: `${client.emoji.warning} | I need \`ViewChannel\`, \`SendMessages\`, \`Speak\`, \`Connect\`, \`UseExternalEmoji\`, \`AddReactions\`, \`EmbedLinks\`, \`AttachFiles\` & \`ReadMessageHistory\` to permission to proceed.`, ephemeral: true })
        // }
        const { options } = interaction;
        const query = options.getString('anime');
        const pages = options.getNumber('page');
        try {
            if (!query) return interaction.reply({ content: client.emoji.cross + " | Please provide a anime" })
            async function Wallpaper4() {
                const wallpaper = await wall.getAnimeWall4({
                    title: query,
                    type: "sfw",
                    page: pages || 1,
                });
                return wallpaper;
            }
            try {
                var wallpapers = await Wallpaper4();
            } catch (e) {
                console.log(e)
                return interaction.reply({ content: client.emoji.warning + " | No result: " + query.toString() })
            }

            const wallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)].image;
            const embed = new EmbedBuilder()
                .setImage(wallpaper)
                .setColor(client.important.MAIN_COLOR)
                .setTitle("Anime Wallpaper")
                .setDescription(`${client.emoji.download} [Download](${wallpaper})`)
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