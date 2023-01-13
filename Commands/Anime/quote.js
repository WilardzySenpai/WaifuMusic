const { getQuote, formatResponse, errorResponse } = require('../../Util/getQuote');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
    name: 'quote',
    description: "Get a quote from anime or character or just random",
    cooldown: 3600000,
    aliases: [], // aliases of the cmd
    usage: 'w!quote <anime / char>', // usage of the cmd
    category: 'Information', // cmd category
    userPerms: ["SendMessages"],
    botPerms: ["EmbedLinks", "ReadMessageHistory"],
    execute: async (client, message, args) => {
        wbc.send(`[prefixCommand] :: **quote used by ${message.author.tag} from ${message.guild.name}**`);
        try {
            if (args[0] === 'anime') {
                const response = await getQuote('/random');
                return message.channel.send(formatResponse(response));
            } else if (args[0] === 'anime') {
                const animeName = args.slice(1).join(' ');
                if (!animeName) {
                    return message.channel.send({ embeds: [errorResponse('No anime name is provided. Please provide a valid anime name')] });
                }

                const response = await getQuote(`/random/anime?title=${animeName}`);

                if (!response) {
                    return message.channel.send({ embeds: [errorResponse(`No quotes from "${animeName}" is available now !`)] });
                }

                return message.channel.send({ embeds: [formatResponse(response)] });
            } else if (args[0] === 'char') {
                const characterName = args.slice(1).join(' ');
                if (!characterName) {
                    return message.channel.send({ embeds: [errorResponse('No anime name is provided. Please provide a valid anime name')] });
                }

                const response = await getQuote(`/random/character?name=${characterName}`, message);

                if (!response) return message.channel.send({ embeds: [errorResponse(`No quotes from "${characterName}" is available now !`)] });

                return message.channel.send({ embeds: [formatResponse(response)] });
            } else if (!args[0]) {
                return message.reply({
                    embeds:
                        [
                            new EmbedBuilder()
                                .setColor(client.important.ERR_COLOR)
                                .setTitle(client.emoji.cross + ' Error!')
                                .setDescription('You did not provide a valid types')
                                .setFields(
                                    { name: 'Random', value: 'w!quote [anime naruto]; return a quote random from naruto' },
                                    { name: 'Character', value: 'w!quote [char saitama]; return random Saitama quote' }
                                )
                        ]
                })
            }
        } catch (e) {
            console.log(e)
            await message.reply({
                embeds:
                    [
                        new EmbedBuilder()
                            .setTitle(client.emoji.warning + " Error!")
                            .setDescription("*n error occured!" + `${e}`)
                            .setColor(client.important.ERR_COLOR)
                    ],
                ephemeral: true
            })
        }
    }
};