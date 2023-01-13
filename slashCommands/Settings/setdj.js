const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
    name: 'waifu-dj', // name of the command
    description: 'Set the DJ role to your server', // description of the command
    usage: '/dj [add/remove role]', // usage of the cmd
    category: 'Settings', // cmd category
    developer: false, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'Administrator', // discord perms user to see the cmd 
    userPerms: ['Administrator'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    options: [
        {
            name: 'what_now',
            description: 'What do you want me to do?',
            type: 3,
            required: true,
            choices: [
                {
                    name: 'add dj',
                    value: 'add',
                },
                {
                    name: 'remove dj',
                    value: 'remove',
                }
            ]
        },
        {
            name: 'what_role',
            description: 'What Role do you want to add/remove',
            type: 8,
            required: true
        }
    ], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **SetDJ used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        const { member, options } = interaction;
        const { guild } = member;
        const add_remove = options.getString("what_now");
        let Role = options.getRole("what_role");
        try {
            if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
                if (add_remove == "add") {
                    if (client.settings.get(guild.id, "djroles").includes(Role.id)) {
                        return interaction.reply({
                            ephemeral: true,
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.important.ERR_COLOR)
                                    .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                                    .setDescription(`${client.emoji.warning} | This Role is already a DJ-Role!`)
                            ],
                        }).then(() => {
                            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
                        })
                    }
                    client.settings.push(guild.id, Role.id, "djroles");
                    var djs = client.settings.get(guild.id, `djroles`).map(r => `<@&${r}>`);
                    if (djs.length == 0) djs = "`not setup`";
                    else djs.join(", ");
                    return interaction.reply({
                        ephemeral: true,
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                                .setDescription(`${client.emoji.check} | The Role \`${Role.name}\` got added to the ${client.settings.get(guild.id, "djroles").length - 0} DJ-Roles!`)
                                .addFields(
                                    { name: `${client.emoji.headphone} **DJ-Role${client.settings.get(guild.id, "djroles").length > 0 ? "s" : ""}:**`, value: `>>> ${djs}`, inline: true }
                                )
                        ],
                    }).then(() => {
                        interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
                    })
                } else {
                    if (!client.settings.get(guild.id, "djroles").includes(Role.id)) {
                        return interaction.reply({
                            ephemeral: true,
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.important.ERR_COLOR)
                                    .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                                    .setDescription(`${client.emoji.warning} | This Role is not a DJ-Role yet!`)
                            ],
                        }).then(() => {
                            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
                        })
                    }
                    client.settings.remove(guild.id, Role.id, "djroles");
                    var djs = client.settings.get(guild.id, `djroles`).map(r => `<@&${r}>`);
                    if (djs.length == 0) djs = "`not setup`";
                    else djs.join(", ");
                    return interaction.reply({
                        ephemeral: true,
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                                .setDescription(`${client.emoji.check} | The Role \`${Role.name}\` got removed from the ${client.settings.get(guild.id, "djroles").length} DJ-Roles!`)
                                .addFields(
                                    { name: `${client.emoji.headphone} **DJ-Role${client.settings.get(guild.id, "djroles").length > 0 ? "s" : ""}:**`, value: `>>> ${djs}`, inline: true }
                                )
                        ],
                    }).then(() => {
                        interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
                    })
                }
            } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
                if (add_remove == "add") {
                    if (client.settings.get(guild.id, "djroles").includes(Role.id)) {
                        return interaction.reply({
                            ephemeral: true,
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.important.ERR_COLOR)
                                    .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                                    .setDescription(`${client.emoji.warning} | This Role is already a DJ-Role!`)
                            ],
                        })
                    }
                    client.settings.push(guild.id, Role.id, "djroles");
                    var djs = client.settings.get(guild.id, `djroles`).map(r => `<@&${r}>`);
                    if (djs.length == 0) djs = "`not setup`";
                    else djs.join(", ");
                    return interaction.reply({
                        ephemeral: true,
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                                .setDescription(`${client.emoji.check} | The Role \`${Role.name}\` got added to the ${client.settings.get(guild.id, "djroles").length - 0} DJ-Roles!`)
                                .addFields(
                                    { name: `${client.emoji.headphone} **DJ-Role${client.settings.get(guild.id, "djroles").length > 0 ? "s" : ""}:**`, value: `>>> ${djs}`, inline: true }
                                )
                        ],
                    })
                } else {
                    if (!client.settings.get(guild.id, "djroles").includes(Role.id)) {
                        return interaction.reply({
                            ephemeral: true,
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.important.ERR_COLOR)
                                    .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                                    .setDescription(`${client.emoji.warning} | This Role is not a DJ-Role yet!`)
                            ],
                        })
                    }
                    client.settings.remove(guild.id, Role.id, "djroles");
                    var djs = client.settings.get(guild.id, `djroles`).map(r => `<@&${r}>`);
                    if (djs.length == 0) djs = "`not setup`";
                    else djs.join(", ");
                    return interaction.reply({
                        ephemeral: true,
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                                .setDescription(`${client.emoji.check} | The Role \`${Role.name}\` got removed from the ${client.settings.get(guild.id, "djroles").length} DJ-Roles!`)
                                .addFields(
                                    { name: `${client.emoji.headphone} **DJ-Role${client.settings.get(guild.id, "djroles").length > 0 ? "s" : ""}:**`, value: `>>> ${djs}`, inline: true }
                                )
                        ],
                    })
                }
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