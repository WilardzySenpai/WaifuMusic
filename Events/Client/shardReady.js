const { gray } = require("chalk");

module.exports = {
    name: 'shardReady',
    execute: (client, id, unavailableGuilds) => {
        console.log(gray(' [') + gray(`${String(new Date).split(" ", 5).join(" ")}`) + gray('] ') + gray('Shard ') + gray(`#${id}`) + gray(` Ready`));
    }
}