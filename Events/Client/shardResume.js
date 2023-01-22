const { gray } = require("chalk");

module.exports = {
    name: 'shardResume',
    execute: (client, id, replayedEvents) => {
        console.log(gray(' [') + gray(`${String(new Date).split(" ", 5).join(" ")}`) + gray('] ') + gray('Shard ') + gray(`#${id}`) + gray(' Shard Resumed!'));
    }
}