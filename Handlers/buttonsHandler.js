function loadButtons(client) {
    const fs = require('fs');
    const chalk = require('chalk')
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Buttons", "Status");

    fs.readdirSync('./buttons/').filter((file) => file.endsWith('.js')).forEach((file) => {
        const button = require(`../buttons/${file}`)
        client.buttons.set(button.id, button)
    })
    console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.white('[') + chalk.green('WAIFU_INFO') + chalk.white('] ') + chalk.green('Buttons') + chalk.white(' Loaded!'));
}

module.exports = { loadButtons }