function loadPlayer(client) {
    const chalk = require("chalk");

    // require("./Player/loadDistube.js")(client);
    // require("./Player/loadContent.js")(client);
    require("./Player/loadSetup.js")(client);
    // require("./Player/loadUpdate.js")(client);

    console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.white('[') + chalk.green('WAIFU_INFO') + chalk.white('] ') + chalk.green('Player ') + chalk.white('Events') + chalk.green(' Loaded!'));
}

module.exports = { loadPlayer }