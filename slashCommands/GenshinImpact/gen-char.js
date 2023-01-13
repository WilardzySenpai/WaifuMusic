const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const genshin = require('genshin-db');
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
    name: 'waifu-character', // name of the command
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
    ], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **Genshin-character used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        const { guild, options } = interaction;
        const input = options.getString('input');
        const char = genshin.characters(input);
        if (!input) return interaction.reply({ content: `${client.emoji.warning} | Please provide a valid charater!` })
        try {
            if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: `${char.name}`, iconURL: `${char.images.icon}` })
                    .setThumbnail(char.images.portrait)
                    .setColor(client.important.MAIN_COLOR)
                    .setImage(char.images.cover1)
                    .addFields(
                        {
                            name: 'Title(s)',
                            value: `${char.title}`,
                            inline: false
                        },
                        {
                            name: 'Description',
                            value: `${char.description} \n **[More Info.](${char.url.fandom
                                })**`,
                            inline: false
                        },
                        {
                            name: 'Element',
                            value: `${char.element}`,
                            inline: true
                        },
                        {
                            name: 'Weapon Type',
                            value: `${char.weapontype}`,
                            inline: true
                        },
                        {
                            name: 'Gender',
                            value: `${char.gender}`,
                            inline: true
                        },
                        {
                            name: 'Rarity',
                            value: `${char.rarity}`,
                            inline: true
                        },
                        {
                            name: 'Birthday',
                            value: `${char.birthday} | ${char.birthdaymmdd}`,
                            inline: true
                        },
                        {
                            name: 'Constellation',
                            value: `${char.constellation}`,
                            inline: true
                        },
                        {
                            name: 'Affiliation',
                            value: `${char.affiliation}`,
                            inline: true
                        },
                        {
                            name: 'Region',
                            value: `${char.region}`,
                            inline: true
                        },
                        {
                            name: 'Body',
                            value: `${char.body}`,
                            inline: true
                        },
                        {
                            name: 'Full Name',
                            value: `${char.fullname}`,
                            inline: true
                        },
                        {
                            name: 'Substat',
                            value: `${char.substat}`,
                            inline: true
                        },
                        {
                            name: 'CV(s)',
                            value: `English: ${char.cv.english || 'None'}\n Chinese: ${char.cv
                                .chinese || 'None'}\n Japanese: ${char.cv.japanese ||
                                'None'}\n Korean: ${char.cv.korean || 'None'}`,
                            inline: true
                        }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: interaction.user.tag,
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    });
                return await interaction.reply({ embeds: [embed] }).then(() => {
                    interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
                })
            } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
                const embed = new EmbedBuilder()
                    .setAuthor({ name: `${char.name}`, iconURL: `${char.images.icon}` })
                    .setThumbnail(char.images.portrait)
                    .setColor(client.important.MAIN_COLOR)
                    .setImage(char.images.cover1)
                    .addFields(
                        {
                            name: 'Title(s)',
                            value: `${char.title}`,
                            inline: false
                        },
                        {
                            name: 'Description',
                            value: `${char.description} \n **[More Info.](${char.url.fandom
                                })**`,
                            inline: false
                        },
                        {
                            name: 'Element',
                            value: `${char.element}`,
                            inline: true
                        },
                        {
                            name: 'Weapon Type',
                            value: `${char.weapontype}`,
                            inline: true
                        },
                        {
                            name: 'Gender',
                            value: `${char.gender}`,
                            inline: true
                        },
                        {
                            name: 'Rarity',
                            value: `${char.rarity}`,
                            inline: true
                        },
                        {
                            name: 'Birthday',
                            value: `${char.birthday} | ${char.birthdaymmdd}`,
                            inline: true
                        },
                        {
                            name: 'Constellation',
                            value: `${char.constellation}`,
                            inline: true
                        },
                        {
                            name: 'Affiliation',
                            value: `${char.affiliation}`,
                            inline: true
                        },
                        {
                            name: 'Region',
                            value: `${char.region}`,
                            inline: true
                        },
                        {
                            name: 'Body',
                            value: `${char.body}`,
                            inline: true
                        },
                        {
                            name: 'Full Name',
                            value: `${char.fullname}`,
                            inline: true
                        },
                        {
                            name: 'Substat',
                            value: `${char.substat}`,
                            inline: true
                        },
                        {
                            name: 'CV(s)',
                            value: `English: ${char.cv.english || 'None'}\n Chinese: ${char.cv
                                .chinese || 'None'}\n Japanese: ${char.cv.japanese ||
                                'None'}\n Korean: ${char.cv.korean || 'None'}`,
                            inline: true
                        }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: interaction.user.tag,
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    });
                return interaction.reply({ embeds: [embed] });
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