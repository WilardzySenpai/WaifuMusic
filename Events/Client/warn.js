const { white, red } = require('chalk');

module.exports = {
    name: 'warn',
    execute: (client, info) => {
        console.log(white(' [') + red('WARN') + white('] ') + red('Warned ') + white(String(info)));
    }
}