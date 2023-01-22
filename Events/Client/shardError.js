const { gray } = require("chalk");

module.exports = {
    name: 'shardError',
    execute: (client, error, shardId) => {
        console.log(gray(' [') + gray(`${String(new Date).split(" ", 5).join(" ")}`) + gray('] ') + gray('Shard ') + gray(`#${shardId}`) + gray(' Shard Errogray!'));
    }
}