const fetch = require('isomorphic-unfetch');
const { EmbedBuilder } = require('discord.js');
const ee = require('../Config/embed.json');

module.exports.getQuote = async (endpoint) => {
    const data = await fetch(`https://animechan.vercel.app/api${endpoint}`);
    const response = await data.json();

    if (data.status === 404) return null;

    return response;
}

module.exports.formatResponse = ({ quote, character, anime }) => {
    quote = quote.replace(/\\|\//g, '');
    // inside a command, event listener, etc.
    const quoteEmbed = new EmbedBuilder()
        .setColor(client.important.MAIN_COLOR)
        .setDescription(`***${quote}***`)
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'character', value: character, inline: true },
            { name: 'Anime', value: anime, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: 'Animechan API', iconURL: 'https://i.imgur.com/JHDHn3N.png' });

    return quoteEmbed;
};

module.exports.errorResponse = string => {
	const errorEmbed = new EmbedBuilder()
		.setColor(client.important.ERR_COLOR)
        .setTitle(client.emoji.warning + ' | Animechan Error')
		.setDescription(string);
	return errorEmbed;
};