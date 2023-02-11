const { EmbedBuilder, ApplicationCommandType } = require("discord.js"); // packages

const glob = require('glob');

module.exports = {
    name: 'waifu-reload', // name of the command
    description: 'restart the commands', // description of the command
    usage: '/waifu-reload', // usage of the cmd
    category: 'dev', // cmd category
    developer: true, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'Administrator', // discord perms
    options: [], // options string
    execute: async (client, interaction) => {
        try {
            client.slashCommands.sweep(() => true)
            glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
                if (err) return console.log(err);
                filePaths.forEach((file) => {
                    delete require.cache[require.resolve(file)];

                    const pull = require(file)

                    if (pull.name) {
                        console.log(`Reload slashCommands ${pull.name} (cmd)`);
                        client.slashCommands.set(pull.name, pull);
                    }

                })
            })
            interaction.reply({ content: `slashCommands Reloaded` })
        } catch (e) {
            console.log(e)
        }
    }
}