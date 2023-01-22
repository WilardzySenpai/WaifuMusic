const { white, red } = require('chalk');

module.exports = {
    name: 'error',
    execute: (client, error) => {
        console.log(white(' [') + red('ERR') + white('] ') + red('Errored ') + white(String(error)));
    }
}