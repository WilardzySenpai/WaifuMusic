const chalk = require('chalk');

module.exports = {
    name: 'shardError',
    execute: (client, error, shardId) => {
        console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.red('[WAIFU_INFO] ') + chalk.red('Shard ') + chalk.red(`#${shardId}`) + chalk.red(' Shard Errored!'));
    }
}