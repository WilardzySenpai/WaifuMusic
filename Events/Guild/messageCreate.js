const { EmbedBuilder, Collection, PermissionsBitField, Client } = require('discord.js')
const ms = require('ms');
const cooldown = new Collection();
const config = require('../../Config/config.json');

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param (Client) client
   */
  execute: async (message, client) => {
    client.settings.ensure(message.guildId, {
      defaultvolume: 50,
      defaultautoplay: false,
      defaultfilters: [],
      djroles: [],
    });
    if (message.author.bot) return;
    if (message.channel.type !== 0) return;
    const prefix = client.important.WAIFU_PREFIX;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (!command) return;
    if (command.inVoiceChannel && !message.member.voice.channel) {
      return await message.reply(`${client.emoji.cross} | You must be in a voice channel!`)
    }
    if (command.sameVoice) {
      if (message.guild.members.me.voice.channel && !message.guild.members.me.voice.channel.equals(message.member.voice.channel)) return await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.important.ERR_COLOR)
            .setDescription(`${client.emoji.cross} | You must be in the same voice channel as the <@${client.user.id}> to use this command!`)
        ], ephemeral: true
      });
    }

    if (command) {
      if (command.cooldown) {
        if (cooldown.has(`${command.name}${message.author.id}`)) return message.channel.send({ content: config.messages["COOLDOWN_MESSAGE"].replace('<duration>', ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })) });
        if (command.userPerms || command.botPerms) {
          if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
            const userPerms = new EmbedBuilder()
              .setDescription(`🚫 ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
              .setColor('Red')
            return message.reply({ embeds: [userPerms] })
          }
          if (!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
            const botPerms = new EmbedBuilder()
              .setDescription(`🚫 ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
              .setColor('Red')
            return message.reply({ embeds: [botPerms] })
          }
        }

        command.execute(client, message, args)
        cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
        setTimeout(() => {
          cooldown.delete(`${command.name}${message.author.id}`)
        }, command.cooldown);
      } else {
        if (command.userPerms || command.botPerms) {
          if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
            const userPerms = new EmbedBuilder()
              .setDescription(`🚫 ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
              .setColor('Red')
            return message.reply({ embeds: [userPerms] })
          }

          if (!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
            const botPerms = new EmbedBuilder()
              .setDescription(`🚫 ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
              .setColor('Red')
            return message.reply({ embeds: [botPerms] })
          }
        }

        command.execute(client, message, args)
      }
    }
  }
}