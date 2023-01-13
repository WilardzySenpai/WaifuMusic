const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
    name: 'waifu-volume', // name of the command
    description: 'Changes the volume of the current song.', // description of the command
    usage: '/volume [amount]', // usage of the cmd
    category: 'Settings', // cmd category
    developer: false, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
    userPerms: ['SendMessages'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    inVoiceChannel: true,
    sameVoice: true,
    options: [
        {
            name: 'volume',
            description: 'The volume to set the music to.',
            type: 10,
            required: true
        }
    ], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **Volume used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        try {
            const { member, guildId, options, guild } = interaction;
            const queue = client.distube.getQueue(guildId);
            const volume = options.getNumber('volume');
            try {
                if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
                    if (!queue || !queue.songs || queue.songs.length == 0) return interaction.reply({
                        embeds: [
                            new EmbedBuilder().setColor(client.important.ERR_COLOR).setTitle(`${client.emoji.cross} | No songs are playing at the moment!`)
                        ],
                        ephemeral: true
                    }).then(() => {
                        interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
                    })
                    if (check_if_dj(client, member, queue.songs[0])) {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                .setColor(client.important.ERR_COLOR)
                                .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                                .setDescription(`${client.emoji.warning} | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
                            ],
                            ephemeral: true
                        }).then(() => {
                            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
                        });
                    }
                    queue.setVolume(volume);
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setAuthor({ name: 'Change the volume' })
                                .setDescription(`Changed the volume to **${volume}%**`)
                        ]
                    }).then(() => {
                        interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
                    })
                } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
                    if (!queue || !queue.songs || queue.songs.length == 0) return interaction.reply({
                        embeds: [
                            new EmbedBuilder().setColor(client.important.ERR_COLOR).setTitle(`${client.emoji.cross} | No songs are playing at the moment!`)
                        ],
                        ephemeral: true
                    })
                    if (check_if_dj(client, member, queue.songs[0])) {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                .setColor(client.important.ERR_COLOR)
                                .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                                .setDescription(`${client.emoji.warning} | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
                            ],
                            ephemeral: true
                        });
                    }
                    queue.setVolume(volume);
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setAuthor({ name: 'Change the volume' })
                                .setDescription(`Changed the volume to **${volume}%**`)
                        ]
                    })
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
        } catch (e) {
            console.log(e)
        }
    }
}