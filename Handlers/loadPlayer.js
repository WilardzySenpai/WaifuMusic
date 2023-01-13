function loadPlayer(client) {
    const { white, green } = require("chalk");

    // require("./Player/loadDistube.js")(client);
    // require("./Player/loadContent.js")(client);
    require("./Player/loadSetup.js")(client);
    // require("./Player/loadUpdate.js")(client);

    console.log(white('[') + green('INFO') + white('] ') + green('Player ') + white('Events') + green(' Loaded!'));
}

module.exports = { loadPlayer }