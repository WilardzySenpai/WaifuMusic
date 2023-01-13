const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle  } = require("discord.js");
const wait = require('node:timers/promises').setTimeout; // this is built in, no need to npm install


module.exports = {
    name: "purge",
    category: "Developer",
    description: "Deletes the last 100 messages in the channel.",
    aliases: ["clear"],
    execute: async (client, message, args) => {
        message.delete()
        const amount = parseInt(args[0]);
        if (!amount) return message.reply({ embeds: [new EmbedBuilder().setColor(client.important.ERR_COLOR).setDescription('Provide a valid number!').setTitle(client.emoji.warning + " Error!")] })
        if (message.author.id !== "939867069070065714") return message.reply({ content: 'no' });
        const embed = new EmbedBuilder()
            .setTitle("Purge")
            .setDescription(`Are you sure you want to purge the last ${amount} messages in this channel?`)
            .setColor("#ffffff");

        const but = new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId("purge").setLabel("Confirm");
        const but2 = new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId("cancel").setLabel("Cancel");
        
        // dsiabled button
        const d_but = new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Confirm").setDisabled(true);
        
        const row = new ActionRowBuilder().addComponents(but, but2);
        
        const d_row = new ActionRowBuilder().addComponents(d_but);

        const msg = await message.channel.send({ embeds: [embed], components: [row], fetchReply: true });
        
        const collector = msg.createMessageComponentCollector({
            filter: (f) => {
                if (f.user.id === message.author.id) return true;
            },
            // useless on bulk delete
            // time: 60000,
            // idle: 60000 / 2
        });
        // doesnt work on bulk delete
        // collector.on("end", async () => {
            // await msg.edit({ embeds: [new EmbedBuilder().setDescription(`Command timed out! Run w!purge again.`).setColor("#ffffff")], components: [d_row], fetchReply: true });
        // });
        
        collector.on("collect", async (b) => {
            if (b.customId === "purge") {
                await message.channel.bulkDelete(amount + 1);
                // wait for 1 seconds before send the embed
                await wait(1000)
                const msg = await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Successfully purged the last ${amount} messages in this channel.`).setColor("#ffffff")] });
                // then delete after 1 seconds 
                setTimeout(() => msg.delete(), 10000)
            } else if (b.customId === "cancel") {
                await msg.edit({ embeds: [new EmbedBuilder().setDescription("Cancelled purge.").setColor("#ffffff")], components: [d_row], fetchReply: true });
            }
        });

    },
};