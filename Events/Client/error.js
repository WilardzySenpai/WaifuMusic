const chalk = require('chalk');

module.exports = {
    name: 'error',
    execute: (client, error) => {
        console.log(chalk.gray(` ${String(new Date).split(" ", 5).join(" ")} `) + chalk.white('[') + chalk.red('ERR') + chalk.white('] ') + chalk.red('Errored ') + chalk.white(String(error)));
    }
}