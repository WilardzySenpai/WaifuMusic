const chalk = require('chalk');

module.exports = {
    name: 'shardReady',
    execute: (client, id, unavailableGuilds) => {
        console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.green('[WAIFU_INFO] ') + chalk.green('Shard ') + chalk.green(`#${id}`) + chalk.green(` Ready`));
    }
}