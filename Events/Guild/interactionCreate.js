const { EmbedBuilder, Collection, PermissionsBitField, InteractionType } = require('discord.js');
const ms = require('ms');
const cooldown = new Collection();
const config = require('../../Config/config.json');
const blockedUsers = ['', '436365881119866890'];
const ytsr = require("@distube/ytsr");
const { SEARCH_DEFAULT } = require("../../Config/searches.json")

module.exports = {
  name: 'interactionCreate',
  execute: async (interaction, client) => {
    await client.createExVoice(interaction);
    await client.createExSetup(interaction);
    await client.createAniExSetup(interaction);

    client.settings.ensure(interaction.guildId, {
      prefix: client.important.WAIFU_PREFIX,
      defaultvolume: 50,
      defaultautoplay: false,
      defaultfilters: [],
      djroles: [],
    });

    client.usernews.ensure(interaction.guildId, {
      news: [],
    });
    
    const slashCommand = client.slashCommands.get(interaction.commandName);
    if (!slashCommand) return;

    if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
      const Random = SEARCH_DEFAULT[Math.floor(Math.random() * SEARCH_DEFAULT.length)];
      if (interaction.commandName == "aplay") {
        let choice = [];
        await ytsr(interaction.options.getString("input") || Random, { safeSearch: true, limit: 10 }).then(result => {
          result.items.forEach(x => { choice.push({ name: x.name, value: x.url }) })
        })
        return await interaction.respond(choice).catch(() => { });
      } else if (interaction.commandName == "waifu-play") {
        let choice = [];
        await ytsr(interaction.options.getString("input") || Random, { safeSearch: true, limit: 10 }).then(result => {
          result.items.forEach(x => { choice.push({ name: x.name, value: x.url }) })
        })
        return await interaction.respond(choice).catch(() => { });
      } else if (interaction.commandName == "waifu-playtop") {
        let choice = [];
        await ytsr(interaction.options.getString("song") || Random, { safeSearch: true, limit: 10 }).then(result => {
          result.items.forEach(x => { choice.push({ name: x.name, value: x.url }) })
        })
        return await interaction.respond(choice).catch(() => { });
      } else if (interaction.commandName == "waifu-playskip") {
        let choice = [];
        await ytsr(interaction.options.getString("song") || Random, { safeSearch: true, limit: 10 }).then(result => {
          result.items.forEach(x => { choice.push({ name: x.name, value: x.url }) })
        })
        return await interaction.respond(choice).catch(() => { });
      }
    }

    if (slashCommand.inVoiceChannel && !interaction.member.voice.channel) {
      return await interaction.reply(`${client.emoji.cross} | You must be in a voice channel!`)
    }
    if (slashCommand.sameVoice) {
      if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(interaction.member.voice.channel)) return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.important.ERR_COLOR)
            .setDescription(`${client.emoji.cross} | You must be in the same voice channel as the <@${client.user.id}> to use this command!`)
        ], ephemeral: true
      });
    }

    // if (interaction.type == 4) {
    //   if (slashCommand.autocomplete) {
    //     const choices = [];
    //     await slashCommand.autocomplete(interaction, choices)
    //   } else if (interaction.isContextMenuCommand()) {
    //     const { command } = client;
    //     const { commandName } = interaction;
    //     const contextCommand = command.get(commandName);
    //     if (!contextCommand) return;

    //     try {
    //       await contextCommand.execute(client, interaction)
    //     } catch (e) {
    //       console.log(e)
    //     }
    //   }
    // }

    if (blockedUsers.includes(interaction.user.id)) return interaction.reply({ content: 'You cant use me!', ephemeral: true });
    if (!interaction.type == 2) return;

    if (!slashCommand) return client.slashCommands.delete(interaction.commandName);
    try {
      if (slashCommand.cooldown) {
        if (cooldown.has(`slash-${slashCommand.name}${interaction.user.id}`)) return interaction.reply({ ephemeral: true, content: config.messages["COOLDOWN_MESSAGE"].replace('<duration>', ms(cooldown.get(`slash-${slashCommand.name}${interaction.user.id}`) - Date.now(), { long: true })) })
        if (slashCommand.userPerms || slashCommand.botPerms) {
          if (!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
            const userPerms = new EmbedBuilder()
              .setDescription(`🚫 ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
              .setColor('Red')
            return interaction.reply({ embeds: [userPerms], ephemeral: true })
          }
          if (!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
            const botPerms = new EmbedBuilder()
              .setDescription(`🚫 ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
              .setColor('Red')
            return interaction.reply({ embeds: [botPerms], ephemeral: true })
          }
        }
        await slashCommand.execute(client, interaction);
        cooldown.set(`slash-${slashCommand.name}${interaction.user.id}`, Date.now() + slashCommand.cooldown)
        setTimeout(() => {
          cooldown.delete(`slash-${slashCommand.name}${interaction.user.id}`)
        }, slashCommand.cooldown)
      } else {
        if (slashCommand.userPerms || slashCommand.botPerms) {
          if (!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
            const userPerms = new EmbedBuilder()
              .setDescription(`🚫 ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this command!`)
              .setColor('Red')
            return interaction.reply({ embeds: [userPerms], ephemeral: true })
          }
          if (!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
            const botPerms = new EmbedBuilder()
              .setDescription(`🚫 ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
              .setColor('Red')
            return interaction.reply({ embeds: [botPerms], ephemeral: true })
          }
        }
        await slashCommand.execute(client, interaction);
      }

    } catch (error) {
      console.log(error);
      await interaction.followUp({
        embeds:
          [
            new EmbedBuilder()
              .setTitle(client.emoji.warning + " Error!")
              .setDescription("*n error occured!" + `${error}`)
              .setColor(client.important.ERR_COLOR)
          ],
        ephemeral: true
      })
    }
  }
}