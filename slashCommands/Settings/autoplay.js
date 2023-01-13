const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
// const Topgg = require('@top-gg/sdk');
// const topgg = new Topgg.Api(process.env.TOPGG);
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
    name: 'waifu-autoplay', // name of the command
    description: 'Toggles autoplay from your guild', // description of the command
    usage: '/autoplay', // usage of the cmd
    category: 'Settings', // cmd category
    developer: false, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
    userPerms: ['SendMessages'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    inVoiceChannel: true,
    sameVoice: true,
    options: [], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **Autoplay used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        try {
            const { member, guildId, guild } = interactionl;
            try {
                if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
                    const queue = client.distube.getQueue(guildId);
                    // let voted = await topgg.hasVoted(interaction.user.id)
                    // if (!voted) {
                    //   return interaction.reply({ content: `${client.emoji.warning} | You haven't vote to me yet! Vote here: https://top.gg/bot/${client.user.id}/vote` })
                    // }
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
                    const autoplay = queue.toggleAutoplay();
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setAuthor({ name: 'Auto play song', iconURL: `${client.user.displayAvatarURL()}` })
                                .setDescription(`Auto play song: ${autoplay ? '**On**' : '**Off**'}`)
                                .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                        ]
                    }).then(() => {
                        interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
                    })
                } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
                    const queue = client.distube.getQueue(guildId);
                    // let voted = await topgg.hasVoted(interaction.user.id)
                    // if (!voted) {
                    //   return interaction.reply({ content: `${client.emoji.warning} | You haven't vote to me yet! Vote here: https://top.gg/bot/${client.user.id}/vote` })
                    // }
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
                    const autoplay = queue.toggleAutoplay();
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setAuthor({ name: 'Auto play song', iconURL: `${client.user.displayAvatarURL()}` })
                                .setDescription(`Auto play song: ${autoplay ? '**On**' : '**Off**'}`)
                                .setFooter({ text: `⚠ - Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
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