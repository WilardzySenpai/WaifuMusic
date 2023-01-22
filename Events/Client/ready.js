const { Client, ActivityType, WebhookClient } = require("discord.js");
const { green, white } = require('chalk');
const mongoose = require('mongoose');

module.exports = {
  name: 'ready',
  once: true,
  /**
   *
   * @param (Client) client
   */
  execute(client) {
    console.log(white('[') + green('WAIFU_INFO') + white(']') + green(` ${client.user.tag} (${client.user.id})`) + white(` is Ready!`));
    console.log(white('[') + green('WAIFU_INFO') + white(']') + green(` ${client.guilds.cache.size} | ${client.users.cache.size} | ${client.channels.cache.size}`) + white(` Goods`));

    let guilds = client.guilds.cache.size;
    let users = client.users.cache.size;
    let channels = client.channels.cache.size;

    // const activities = [
    //   `${users} users`,
    //   `/help <cmd-name>`,
    //   `${guilds} servers | ${channels} channels`,
    //   `/play <search>`,
    // ];


    client.user.setPresence({
      activities: [{ name: `/help <cmd-name> | /play <search>`, type: 2 }],
      status: 'online',
    });

    mongoose.set('strictQuery', false);
    mongoose.connect(client.important.MONGO_DB, {
    }).then(() => console.log(white('[') + green('MONGO_DB') + white(']') + green(` is now connected!`)))
  }
}