const { EmbedBuilder, ApplicationCommandType, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js"); // packages
const ms = require('ms');

module.exports = {
    name: 'waifu-stats', // name of the command
    description: 'Check waifu status', // description of the command
    usage: '/waifu-stats', // usage of the cmd
    category: 'Info', // cmd category
    developer: false, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
    userPerms: ['SendMessages'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    default_member_permissions: 'SendMessages', // discord perms
    //   inVoiceChannel: true,
    options: [], // options string
    execute: async (client, interaction) => {
        try {
            const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Add WaifuMusic')
                )
            const embed = new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setThumbnail(client.user.displayAvatarURL())
                .setAuthor({ name: `Stats and Infos` })
                .setDescription(`Bot name: **${client.user.username}** and I play Music`)
                .addFields(
                    { name: "Servers:", value: `\`${client.guilds.cache.size}\``, inline: true },
                    { name: "Presense:", value: `\`${client.user.presence.activities[0].name}\``, inline: true },
                    { name: "My ID:", value: `\`${client.user.id}\``, inline: true },
                    { name: "Uptime:", value: `\`${ms(client.uptime)}\``, inline: true },
                    { name: "Status:", value: `\`${client.user.presence.status}\``, inline: true },
                    { name: "Total Members:", value: `\`${client.users.cache.size}\``, inline: true }
                )
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