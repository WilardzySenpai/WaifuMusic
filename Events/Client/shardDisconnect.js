const { gray } = require("chalk");

module.exports = {
    name: 'shardDisconnect',
    execute: (client, event, id) => {
        console.log(gray(' [') + gray(`${String(new Date).split(" ", 5).join(" ")}`) + gray('] ') + gray('Shard ') + gray(`#${id}`) + gray(' Shard Disconnected!'));
    }
}