const chalk = require('chalk');

module.exports = {
    name: 'shardReconnecting',
    execute: (client, id) => {
        console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.blue('[WAIFU_INFO] ') + chalk.blue('Shard ') + chalk.blue(`#${id}`) + chalk.blue(' Shard Reconnected!'));
    }
}