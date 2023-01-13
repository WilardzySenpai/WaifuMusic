const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle, WebhookClient } = require("discord.js"); // packages
const genshin = require('genshin-db');
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
    name: 'waifu-constellation', // name of the command
    description: 'Gives you a information about the character', // description of the command
    category: 'Genshin', // cmd category
    developer: false, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
    userPerms: ['SendMessages'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    options: [
        {
            name: 'genshin',
            description: 'Genshin character name',
            type: 2,
            options: [
                {
                    name: 'character',
                    description: 'character name',
                    type: 1,
                    options: [
                        {
                            name: 'input',
                            description: 'Genshin character name',
                            type: 3,
                            required: false
                        }
                    ]
                }
            ]
        }
    ], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **Genshin-constilation used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        const { guild, options } = interaction;
        const input = options.getString('input');
        const char = genshin.constellations(input);
        const char2 = genshin.characters(input);
        if (!input) return interaction.reply({ content: `${client.emoji.warning} | Please a valid charater!` })
        try {
            if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
                const embed = new EmbedBuilder()
                    .setTitle(`${char.name}'s Constellations`)
                    .setThumbnail(char2.images.portrait)
                    .setColor(client.important.MAIN_COLOR)
                    .addFields(
                        {
                            name: `Constellation 1: ${char.c1.name}`,
                            value: char.c1.effect,
                            inline: true
                        },
                        {
                            name: `Constellation 2: ${char.c2.name}`,
                            value: char.c2.effect,
                            inline: false
                        },
                        {
                            name: `Constellation 3: ${char.c3.name}`,
                            value: char.c3.effect,
                            inline: false
                        }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: interaction.user.tag,
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    });
                const embed2 = new EmbedBuilder()
                    .setTitle(`${char.name}'s Constellations(4-6)`)
                    .setThumbnail(char2.images.portrait)
                    .setColor(client.important.MAIN_COLOR)
                    .addFields(
                        {
                            name: `Constellation 4: ${char.c4.name}`,
                            value: char.c4.effect,
                            inline: true
                        },
                        {
                            name: `Constellation 5: ${char.c5.name}`,
                            value: char.c5.effect,
                            inline: false
                        },
                        {
                            name: `Constellation 6: ${char.c6.name}`,
                            value: char.c6.effect,
                            inline: false
                        }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: interaction.user.tag,
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    });

                let btnrow = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('page1')
                        .setStyle(ButtonStyle.Primary)
                        .setLabel('Page 1'),
                    new ButtonBuilder()
                        .setCustomId('page2')
                        .setStyle(ButtonStyle.Primary)
                        .setLabel('Page 2'),
                    new ButtonBuilder()
                        .setCustomId('del')
                        .setStyle(ButtonStyle.Danger)
                        .setLabel('End'),
                )
                let d_btnrow = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('page1')
                        .setStyle(ButtonStyle.Primary)
                        .setLabel('Page 1')
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId('page2')
                        .setStyle(ButtonStyle.Primary)
                        .setLabel('Page 2')
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId('del')
                        .setStyle(ButtonStyle.Danger)
                        .setLabel('End')
                        .setDisabled(true),
                )
                const msg = await interaction.reply({ embeds: [embed], components: [btnrow], fetchReply: true })
                const collector = interaction.channel.createMessageComponentCollector({
                    filter: (b) => {
                        if (b.user.id === interaction.user.id) return true;
                        else {
                            b.reply({ ephemeral: true, content: `Only **${interaction.user.username}** can use this button, run the command again to use the help menu.` }); return false;
                        };
                    },
                    time: 60000,
                    idle: 60000 / 2
                });
                collector.on('collect', async (b) => {
                    if (!b.deferred) await b.deferUpdate()
                    if (b.customId === 'page2') {
                        return await msg.edit({ embeds: [embed2] });
                    }
                    if (b.customId === 'page1') {
                        if (!b.deferred) await b.deferUpdate()
                        return await msg.edit({ embeds: [embed] });
                    }
                    if (b.customId === 'del') {
                        if (!b.deferred) await b.deferUpdate()
                        return await msg.edit({ embeds: [embed], components: [d_btnrow] });
                    }
                });
                collector.on('end', () => {
                    msg.edit({ components: [d_btnrow], content: ' ', fetchReply: true });
                });
                await interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
            } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
                const embed = new EmbedBuilder()
                    .setTitle(`${char.name}'s Constellations`)
                    .setThumbnail(char2.images.portrait)
                    .setColor(client.important.MAIN_COLOR)
                    .addFields(
                        {
                            name: `Constellation 1: ${char.c1.name}`,
                            value: char.c1.effect,
                            inline: true
                        },
                        {
                            name: `Constellation 2: ${char.c2.name}`,
                            value: char.c2.effect,
                            inline: false
                        },
                        {
                            name: `Constellation 3: ${char.c3.name}`,
                            value: char.c3.effect,
                            inline: false
                        }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: interaction.user.tag,
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    });
                const embed2 = new EmbedBuilder()
                    .setTitle(`${char.name}'s Constellations(4-6)`)
                    .setThumbnail(char2.images.portrait)
                    .setColor(client.important.MAIN_COLOR)
                    .addFields(
                        {
                            name: `Constellation 4: ${char.c4.name}`,
                            value: char.c4.effect,
                            inline: true
                        },
                        {
                            name: `Constellation 5: ${char.c5.name}`,
                            value: char.c5.effect,
                            inline: false
                        },
                        {
                            name: `Constellation 6: ${char.c6.name}`,
                            value: char.c6.effect,
                            inline: false
                        }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: interaction.user.tag,
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    });

                let btnrow = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('page1')
                        .setStyle(ButtonStyle.Primary)
                        .setLabel('Page 1'),
                    new ButtonBuilder()
                        .setCustomId('page2')
                        .setStyle(ButtonStyle.Primary)
                        .setLabel('Page 2'),
                    new ButtonBuilder()
                        .setCustomId('del')
                        .setStyle(ButtonStyle.Danger)
                        .setLabel('End'),
                )
                let d_btnrow = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('page1')
                        .setStyle(ButtonStyle.Primary)
                        .setLabel('Page 1')
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId('page2')
                        .setStyle(ButtonStyle.Primary)
                        .setLabel('Page 2')
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId('del')
                        .setStyle(ButtonStyle.Danger)
                        .setLabel('End')
                        .setDisabled(true),
                )
                const msg = await interaction.reply({ embeds: [embed], components: [btnrow], fetchReply: true })
                const collector = interaction.channel.createMessageComponentCollector({
                    filter: (b) => {
                        if (b.user.id === interaction.user.id) return true;
                        else {
                            b.reply({ ephemeral: true, content: `Only **${interaction.user.username}** can use this button, run the command again to use the help menu.` }); return false;
                        };
                    },
                    time: 60000,
                    idle: 60000 / 2
                });
                collector.on('collect', async (b) => {
                    if (!b.deferred) await b.deferUpdate()
                    if (b.customId === 'page2') {
                        return await msg.edit({ embeds: [embed2] });
                    }
                    if (b.customId === 'page1') {
                        if (!b.deferred) await b.deferUpdate()
                        return await msg.edit({ embeds: [embed] });
                    }
                    if (b.customId === 'del') {
                        if (!b.deferred) await b.deferUpdate()
                        return await msg.edit({ embeds: [embed], components: [d_btnrow] });
                    }
                });
                collector.on('end', () => {
                    msg.edit({ components: [d_btnrow], content: ' ', fetchReply: true });
                });
            }
        } catch (e) {
            console.log(e);
            await interaction.reply({
                embeds:
                    [
                        new EmbedBuilder()
                            .setTitle(client.emoji.warning + " Error!")
                            .setDescription("**Character is not valid!**" + `${e}`)
                            .setColor(client.important.ERR_COLOR)
                    ],
                    ephemeral: true
            })
        }
    }
}