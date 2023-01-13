const { EmbedBuilder } = require('discord.js');
const ee = require("../../Config/embed.json");

module.exports = {
  name: 'serverlist',
  aliases: ['sl'],
  category: '🦉 - Owner',
  usage: 'serverlist',
  description: 'Show bot`s server list',
  execute: async (client, message, args) => {
    if (message.author.id != '939867069070065714') {
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.important.ERR_COLOR)
            .setDescription('🚫 | You are not authorized to perform this action!')
        ]
      })
    } else {
      const guilds = client.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .first(50)

      const description = guilds.map((guild, index) => {
        return `${index + 1}. ${guild.name} - ${guild.id} - ${guild.memberCount} member`
      }).join('\n')

      const embed = new EmbedBuilder()
        .setColor(client.important.MAIN_COLOR)
        .setTitle(`Bot server list(${client.guilds.cache.size} servers)`)
        .setDescription(description)

      message.channel.send({ embeds: [embed] })
    }
  }
}