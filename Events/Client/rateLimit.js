const { white, red } = require('chalk');

module.exports = {
  name: 'rateLimit',
  execute(client, rateLimitData) {
    console.log(white(' [') + red('NOTICE') + white('] ') + red('Rate Limited') + white(JSON.stringify(rateLimitData)));
  }
}