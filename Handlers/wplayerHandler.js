function loadwplayer(client) {
    const ascii = require("ascii-table");
    const fs = require("fs");
    const table = new ascii().setHeading("Player", "Status");
    const { green, white } = require('chalk');

    fs.readdirSync('./wplayer/').filter((file) => file.endsWith('.js')).forEach((file) => {
        const event = require(`../wplayer/${file}`);
        let eventName = file.split(".")[0];
        client.distube.on(eventName, event.bind(null, client));
    })

    console.log(white('[') + green('INFO') + white('] ') + green('Waifu ') + white('Player') + green(' Loaded!'));
}

module.exports = { loadwplayer }