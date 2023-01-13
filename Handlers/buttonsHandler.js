function loadButtons(client) {
    const fs = require('fs');
    const { green, white } = require('chalk')
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Buttons", "Status");

    fs.readdirSync('./buttons/').filter((file) => file.endsWith('.js')).forEach((file) => {
        const button = require(`../buttons/${file}`)
        client.buttons.set(button.id, button)
    })
    console.log(white('[') + green('INFO') + white('] ') + green('Buttons') + white(' Loaded!'));
}

module.exports = { loadButtons }