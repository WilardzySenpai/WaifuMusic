const { EmbedBuilder, ApplicationCommandType, ButtonBuilder, ActionRowBuilder, ButtonStyle, WebhookClient } = require("discord.js"); // packages
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
    name: 'waifu-coinflip', // name of the command
    description: 'Play coinflip!', // description of the command
    usage: '/waifu-coinflip', // usage of the cmd
    category: 'Fun', // cmd category
    developer: false, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
    userPerms: ['SendMessages'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    //   inVoiceChannel: true,
    options: [], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **coinflip used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        const { channel, member } = interaction;

        try {
            var num = 0

            const resultTimer = 1000 * 3;

            const side = ["Head", "Tails"];

            const R = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel("Flip the Coin")
                        .setStyle("Success")
                        .setCustomId("isFlip")
                        .setStyle(ButtonStyle.Secondary)
                );

            const Rs = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel("Re-flip the Coin")
                        .setStyle("Success")
                        .setCustomId("isReflip")
                        .setStyle(ButtonStyle.Secondary)
                );

            interaction.deferUpdate;

            let sent = await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.important.MAIN_COLOR)
                        .setTitle(client.emoji.blank + 'CoinFlips')
                        .setDescription('Click the button below to flip the coins!')
                ],
                components: [R],
                fetchReply: true
            });

            let collector = sent.createMessageComponentCollector({
                time: 1000 * 60 * 10,
            });

            collector.on("collect", async interaction => {
                if (interaction.user.id !== member.id) return interaction.reply({
                    content: "You are not the user that run the commands!",
                    ephemeral: true
                });

                if (interaction.customId == "isFlip") {
                    const sides = side[Math.floor(Math.random() * side.length)];

                    interaction.deferUpdate;

                    await interaction.update({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setTitle(client.emoji.blank + 'CoinFlips')
                                .setDescription(`**Flipping the Coins...**`)
                        ],
                        components: []
                    });

                    setTimeout(async () => {
                        await interaction.message.edit({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.important.MAIN_COLOR)
                                    .setTitle(client.emoji.blank + 'CoinFlips')
                                    .setDescription(`You Flipped the Coins and got ***${sides}***`)
                            ],
                            components: [Rs]
                        });
                    }, resultTimer);
                } else if (interaction.customId == "isReflip") {

                    let sides = side[Math.floor(Math.random() * side.length)];

                    await interaction.update({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setTitle(client.emoji.blank + 'CoinFlips')
                                .setDescription(`**Re-Flipping the Coins...**`)
                        ],
                        components: []
                    });

                    num++

                    const messages = interaction.message;
                    messages.embeds.forEach(async (embed) => {
                        sides == "Heads" ? sides = true : sides = false;

                        let text;

                        embed.description.toLowerCase().includes('heads') == true ? text = true : text = false;

                        interaction.deferUpdate;
                        return setTimeout(async () => {
                            await interaction.message.edit({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(client.important.MAIN_COLOR)
                                        .setTitle(client.emoji.blank + 'CoinFlips')
                                        .setDescription(`You Re-Flipped the Coins ${num + " times"} and got ***Heads Again***`)
                                ],
                                components: [Rs]
                            });
                        }, resultTimer);
                    })
                } else if (text == false && sides == false) {
                    interaction.deferUpdate;
                    return setTimeout(async () => {
                        await interaction.message.edit({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(client.important.MAIN_COLOR)
                                    .setTitle(client.emoji.blank + 'CoinFlips')
                                    .setDescription(`You Re-Flipped the Coins ${num + " times"} and got ***Tails Again***`)
                            ],
                            components: [Rs]
                        });
                    }, resultTimer);
                } else {
                    interaction.deferUpdate;
                    await interaction.message.edit({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(client.important.MAIN_COLOR)
                                .setTitle(client.emoji.blank + 'CoinFlips')
                                .setDescription(`You Re-Flipped the Coins ${num + " times"} and got ***${sides == true ? "Heads" : "Tails"}***`)
                        ],
                        components: [Rs]
                    });
                }
            });

            collector.on('end', collected => {
                sent.edit({ components:[] })
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