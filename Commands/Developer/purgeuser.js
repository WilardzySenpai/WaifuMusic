const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const wait = require('node:timers/promises').setTimeout; // this is built in, no need to npm install


module.exports = {
    name: "userpurge",
    category: "Developer",
    description: "Deletes the last 100 messages in the channel.",
    aliases: ["clear"],
    execute: async (client, message, args) => {
        // Get the user mentioned in the message
        const user = message.mentions.users.first();

        // If no user was mentioned, return an error message
        if (!user) return message.reply('You must mention a user to purge their messages.');

        // Get the number of messages to purge
        const amount = args[1];

        // If no amount was specified, return an error message
        if (!amount) return message.reply('You must specify an amount of messages to purge.');

        // Convert the amount to an integer
        const numAmount = parseInt(amount);

        // If the amount is not a number, return an error message
        if (isNaN(numAmount)) return message.reply('The amount of messages to purge must be a number.');

        // Fetch the messages to be purged
        message.channel.messages.fetch({ limit: numAmount })
            .then(messages => {
                // Filter the messages to only keep those from the specified user
                const userMessages = messages.filter(msg => msg.author.id === user.id);

                // Delete the collected messages
                message.channel.bulkDelete(userMessages)
                    .then(() => {
                        // Send a message to confirm the purge
                        message.channel.send(`${userMessages.size} messages from ${user.tag} purged.`);
                    })
                    .catch(error => {
                        console.log(error);
                        message.channel.send('An error occurred while trying to purge the messages.');
                    });
            })
            .catch(error => {
                console.log(error);
                message.channel.send('An error occurred while trying to fetch the messages.');
            });
    },
};