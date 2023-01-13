const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async (client) => {
    client.enSwitch = new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder()
                .setCustomId("sprevious")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji(client.emoji.previous),
            new ButtonBuilder()
                .setCustomId("spause")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji(client.emoji.pause),
            new ButtonBuilder()
                .setCustomId("sresume")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji(client.emoji.resume),
            new ButtonBuilder()
                .setCustomId("sstop")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji(client.emoji.stop),
            new ButtonBuilder()
                .setCustomId("sskip")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji(client.emoji.next),
        ]);
        
    client.enSwitch2 = new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder()
                .setCustomId("svoldown")
                .setStyle(ButtonStyle.Secondary)
                .setLabel('10% -')
                .setEmoji(client.emoji.voldown),
            new ButtonBuilder()
                .setCustomId("svolup")
                .setStyle(ButtonStyle.Secondary)
                .setLabel('10% +')
                .setEmoji(client.emoji.volup),
            new ButtonBuilder()
                .setCustomId("sloop")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji(client.emoji.loop),
            new ButtonBuilder()
                .setCustomId("sautoplay")
                .setStyle(ButtonStyle.Success)
                .setLabel('Autoplay'),
        ]);

        
    client.disSwitch = new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder()
                .setCustomId("sprevious")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
                .setEmoji(client.emoji.previous),
            new ButtonBuilder()
                .setCustomId("spause")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
                .setEmoji(client.emoji.pause),
            new ButtonBuilder()
                .setCustomId("sresume")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
                .setEmoji(client.emoji.resume),
            new ButtonBuilder()
                .setCustomId("sstop")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
                .setEmoji(client.emoji.stop),
            new ButtonBuilder()
                .setCustomId("sskip")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
                .setEmoji(client.emoji.next),
        ]);
        
    client.disSwitch2 = new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder()
                .setCustomId("svoldown")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
                .setLabel('10% -')
                .setEmoji(client.emoji.voldown),
            new ButtonBuilder()
                .setCustomId("svolup")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
                .setLabel('10% +')
                .setEmoji(client.emoji.volup),
            new ButtonBuilder()
                .setCustomId("sloop")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
                .setEmoji(client.emoji.loop),
            new ButtonBuilder()
                .setCustomId("sautoplay")
                .setStyle(ButtonStyle.Success)
                .setDisabled(true)
                .setLabel('Autoplay'),
        ])
}