const chalk = require('chalk');

module.exports = {
    name: 'shardResume',
    execute: (client, id, replayedEvents) => {
        console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.yellow('[WAIFU_INFO] ') + chalk.yellow('Shard ') + chalk.yellow(`#${id}`) + chalk.yellow(' Shard Resumed!'));
    }
}