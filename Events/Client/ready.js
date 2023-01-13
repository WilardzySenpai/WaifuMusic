const { Client, ActivityType, WebhookClient } = require("discord.js");
const { green, white } = require('chalk');
const mongoose = require('mongoose');
const wbc = new WebhookClient({
  id: "1046246049720827934",
  token: "EZRY8nnxSpxNjsBA-lAZsUv9aV4qNmM8_JAUj913ezgMZDbLrRJmU4te02VksWv1w45b",
});

module.exports = {
  name: 'ready',
  once: true,
  /**
   *
   * @param (Client) client
   */
  execute(client) {
    console.log(white('[') + green('INFO') + white('] ') + green(`${client.user.tag} (${client.user.id})`) + white(` is Ready!`));
    console.log(white('[') + green('INFO') + white('] ') + green(`${client.guilds.cache.size} | ${client.users.cache.size} | ${client.channels.cache.size}`) + white(` Goods`));
    wbc.send({ content: `I'm ready <@939867069070065714> with the ping of **${client.ws.ping}ms!**` })

    let guilds = client.guilds.cache.size;
    let users = client.users.cache.size;
    let channels = client.channels.cache.size;

    const activities = [
      `${users} users`,
      `/help <cmd-name>`,
      `${guilds} servers | ${channels} channels`,
      `/play <search>`,
    ];

    setInterval(() => {
      client.user.setPresence({
        activities: [{ name: `${activities[Math.floor(Math.random() * activities.length)]}`, type: 2 }],
        status: 'online',
      });
    }, 15000)

    mongoose.set('strictQuery', false);
    mongoose.connect(client.important.MONGO_DB, {
    }).then(() => console.log("MongoDB :: Connected to the database"))
  }
}