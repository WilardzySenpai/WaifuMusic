const chalk = require('chalk');

module.exports = {
  name: 'rateLimit',
  execute(client, rateLimitData) {
    console.log(chalk.gray( `${String(new Date).split(" ", 5).join(" ")}` ) + chalk.white('[') + chalk.red('NOTICE') + chalk.white('] ') + chalk.red('Rate Limited') + chalk.white(JSON.stringify(rateLimitData)));
  }
}