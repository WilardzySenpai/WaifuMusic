const { Client, ActivityType, WebhookClient, EmbedBuilder } = require("discord.js");
const chalk = require('chalk');
const mongoose = require('mongoose');

module.exports = {
  name: 'ready',
  once: true,
  /**
   *
   * @param (Client) client
   */
  execute (client) {
    console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.white('[') + chalk.green('WAIFU_INFO') + chalk.white(']') + chalk.green(` ${client.user.tag} (${client.user.id})`) + chalk.white(` is Ready!`));
    console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.white('[') + chalk.green('WAIFU_INFO') + chalk.white(']') + chalk.green(` ${client.guilds.cache.size} | ${client.users.cache.size} | ${client.channels.cache.size}`) + chalk.white(` Goods`));

    const embed = new EmbedBuilder()
      .setDescription("**Account has been**: `Online and Ready!`")
      .setColor(client.important.MAIN_COLOR);

    client.channels.cache.get(client.important.CHANNEL).send({ embeds: [embed] })

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
    }).then(() => console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.white('[') + chalk.green('MONGO_DB') + chalk.white(']') + chalk.green(` is now connected!`)))
  }
}