function loadwplayer(client) {
    const ascii = require("ascii-table");
    const fs = require("fs");
    const table = new ascii().setHeading("Player", "Status");
    const chalk = require('chalk');

    fs.readdirSync('./wplayer/').filter((file) => file.endsWith('.js')).forEach((file) => {
        const event = require(`../wplayer/${file}`);
        let eventName = file.split(".")[0];
        client.distube.on(eventName, event.bind(null, client));
    })

    console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.white('[') + chalk.green('WAIFU_INFO') + chalk.white('] ') + chalk.green('Player ') + chalk.white('Handler') + chalk.green(' Loaded!'));
}

module.exports = { loadwplayer }