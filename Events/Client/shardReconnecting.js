const { white, yellow } = require('chalk');

module.exports = {
    name: 'shardReconnecting',
    execute: (client, id) => {
        console.log(white(' [') + yellow(`${String(new Date).split(" ", 5).join(" ")}`) + white('] ') + yellow('Shard ') + white(`#${id}`) + yellow(' Shard Reconnected!'));
    }
}