const chalk = require('chalk');

module.exports = {
    name: 'shardDisconnect',
    execute: (client, event, id) => {
        console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.red('[WAIFU_INFO] ') + chalk.red('Shard ') + chalk.red(`#${id}`) + chalk.red(' Shard Disconnected!'));
    }
}