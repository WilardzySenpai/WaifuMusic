const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const FiltersSettings = require("../../Config/filters.json");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
    name: 'waifu-speed', // name of the command
    description: 'Changes the Speed of the Song!', // description of the command
    usage: '/speed [amount]', // usage of the cmd
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
            name: "speed_amount",
            description: "What Speed amount should it have?",
            type: 3,
            required: true,
            choices: [
                {
                    name: '0.25',
                    value: '0.25'
                },
                {
                    name: '0.50',
                    value: '0.5'
                },
                {
                    name: '0.75',
                    value: '0.75'
                },
                {
                    name: '1',
                    value: '1'
                },
                {
                    name: '1.25',
                    value: '1.25'
                },
                {
                    name: '1.50',
                    value: '1.5'
                },
                {
                    name: '1.75',
                    value: '1.75'
                },
                {
                    name: '2',
                    value: '2'
                }
            ]
        },
    ], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **Speed used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        try {
            const { member, guildId, options, guild } = interaction;
            let queue = client.distube.getQueue(guildId);
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
                    let speed_amount = options.getString("speed_amount")

                    FiltersSettings.customspeed = `atempo=${speed_amount}`;
                    client.distube.filters = FiltersSettings;
                    //add old filters so that they get removed 	
                    //if it was enabled before then add it
                    if (Object.keys(queue.filters).includes("customspeed")) {
                        await queue.filters.add(["customspeed"]);
                    }
                    await queue.filters.add(["customspeed"]);
                    interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setColor(client.important.MAIN_COLOR)
                            .setTimestamp()
                            .setDescription(`♨️ | Set the Speed to **${speed_amount}!**`)
                            .setFooter({ text: `💢 Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })]
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
                    let speed_amount = options.getString("speed_amount")

                    FiltersSettings.customspeed = `atempo=${speed_amount}`;
                    client.distube.filters = FiltersSettings;
                    //add old filters so that they get removed 	
                    //if it was enabled before then add it
                    if (Object.keys(queue.filters).includes("customspeed")) {
                        await queue.filters.add(["customspeed"]);
                    }
                    await queue.filters.add(["customspeed"]);
                    interaction.reply({
                        embeds: [new EmbedBuilder()
                            .setColor(client.important.MAIN_COLOR)
                            .setTimestamp()
                            .setDescription(`♨️ | Set the Speed to **${speed_amount}!**`)
                            .setFooter({ text: `💢 Action by: ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })]
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