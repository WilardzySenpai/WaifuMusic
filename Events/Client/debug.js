const chalk = require('chalk');

module.exports = {
    name: 'debug',
    execute: (client, info) => {
        console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.gray('[') + chalk.gray('DEBUG') + chalk.gray('] ') + chalk.gray('Warned ') + chalk.gray(String(info)));
    }
}