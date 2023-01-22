const { gray } = require('chalk');

module.exports = {
    name: 'debug',
    execute: (client, info) => {
        console.log(gray(' [') + gray('DEBUG') + gray('] ') + gray('Warned ') + gray(String(info)));
    }
}