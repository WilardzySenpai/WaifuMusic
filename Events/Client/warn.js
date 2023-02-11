const chalk = require('chalk');

module.exports = {
    name: 'warn',
    execute: (client, info) => {
        console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.white('[') + chalk.red('WARN') + chalk.white('] ') + chalk.red('Warned ') + chalk.white(String(info)));
    }
}