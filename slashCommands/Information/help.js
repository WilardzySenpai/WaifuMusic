const { EmbedBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, ActionRowBuilder, StringSelectMenuBuilder, WebhookClient } = require("discord.js"); // packages
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-help', // name of the command
  description: 'Return all available commands', // description of the command
  usage: '/help <command>', // usage of the cmd
  category: 'Info', // cmd category
  developer: false, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  options: [
    {
      name: 'command',
      description: 'Enter the name of the command',
      type: 3,
      required: false
    }
  ], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Help used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    const { options, member, guild } = interaction;
    const slcmd = options.getString("command");
    const rmgs = client.config.random_messages;
    const rmgss = rmgs[Math.floor(Math.random() * rmgs.length)];
    try {
      if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        if (!slcmd) {
          const menurow = new ActionRowBuilder().addComponents([
            new StringSelectMenuBuilder()
              .setCustomId('menu-1')
              .setPlaceholder('Select Menu')
              .addOptions([
                {
                  label: "Home",
                  description: 'Home section',
                  value: `opt_home`,
                  emoji: `${client.emoji.home}`
                },
                {
                  label: "Infomation",
                  description: 'Information Commands',
                  value: `opt_info`,
                  emoji: `${client.emoji.info}`
                },
                {
                  label: "Music",
                  description: 'Music Commands',
                  value: `opt_music`,
                  emoji: `${client.emoji.music}`
                },
                {
                  label: "Queue",
                  description: 'Queue Commands',
                  value: `opt_queue`,
                  emoji: `${client.emoji.queue}`
                },
                {
                  label: "Settings",
                  description: 'Settings Commands',
                  value: `opt_sett`,
                  emoji: `${client.emoji.setting}`
                },
                {
                  label: "Fun",
                  description: 'Fun Commands',
                  value: `opt_fun`,
                  emoji: `${client.emoji.fun}`
                },
                {
                  label: "Genshin",
                  description: 'Fun Commands',
                  value: `opt_gen`,
                  emoji: `${client.emoji.genshin}`
                }
              ])
          ]);
          const btnrow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId('home')
              .setLabel('Home')
              .setEmoji(`${client.emoji.home}`)
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId('info')
              .setLabel('Info')
              .setEmoji(`${client.emoji.info}`)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('music')
              .setLabel('Music')
              .setEmoji(`${client.emoji.music}`)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('queue')
              .setLabel('Queue')
              .setEmoji(`${client.emoji.queue}`)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('fun')
              .setLabel('Fun')
              .setEmoji(`${client.emoji.fun}`)
              .setStyle(ButtonStyle.Secondary)
          );
          const btnrow2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId('gen')
              .setLabel('Genshin')
              .setEmoji(`${client.emoji.genshin}`)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('gear')
              .setLabel('Settings')
              .setEmoji(`${client.emoji.setting}`)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('del')
              .setLabel('End')
              .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
              .setLabel('Donate')
              .setStyle(ButtonStyle.Link)
              .setURL("https://ko-fi.com/hachiki_hoshino")
              .setEmoji(`${client.emoji.donate}`)
          );
          // disabled button
          const d_btnrow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId('d_home')
              .setLabel('Home')
              .setEmoji(`${client.emoji.home}`)
              .setDisabled(true)
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId('d_info')
              .setLabel('Info')
              .setEmoji(`${client.emoji.info}`)
              .setDisabled(true)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('d_music')
              .setLabel('Music')
              .setEmoji(`${client.emoji.music}`)
              .setDisabled(true)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('d_queue')
              .setLabel('Queue')
              .setEmoji(`${client.emoji.queue}`)
              .setDisabled(true)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('d_fun')
              .setLabel('Fun')
              .setEmoji(`${client.emoji.fun}`)
              .setDisabled(true)
              .setStyle(ButtonStyle.Secondary)
          );
          // disabled button 2
          const d_btnrow2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId('gen')
              .setLabel('Genshin')
              .setEmoji(`${client.emoji.genshin}`)
              .setDisabled(true)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('gear')
              .setLabel('Settings')
              .setEmoji(`${client.emoji.setting}`)
              .setDisabled(true)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('del')
              .setLabel('End')
              .setDisabled(true)
              .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
              .setLabel('Donate')
              .setStyle(ButtonStyle.Link)
              .setURL("https://ko-fi.com/hachiki_hoshino")
              .setEmoji(`${client.emoji.donate}`)
          );

          let edit_embed = new EmbedBuilder()
          const home_embed = new EmbedBuilder()
            .setColor(client.important.MAIN_COLOR)
            .setAuthor({ name: `${interaction.guild.members.me.displayName} Help menu` })
            .setDescription('Click the buttons below to see eac category commands or use the drop down menu.\n\n:grey_question:- **Get started by using </help:1014093652135530527>**\n:notes: - **The one and only music bot you need**\n:headphones: - **Built-in DJ System**\n:joy: - **Fun and Anime commands **\n:link: - **Website: __https://waifumusic.ml/__**')
            .setImage("https://media.giphy.com/media/AdRiVFBcGJ5iZRqUyG/giphy.gif")
            .setThumbnail(client.user.displayAvatarURL())

          const msg = await interaction.reply({ content: `${rmgss}`, embeds: [home_embed], components: [menurow, btnrow, btnrow2], fetchReply: true });

          const collector = interaction.channel.createMessageComponentCollector({
            filter: (b) => {
              if (b.user.id === interaction.user.id) return true;
              else {
                b.reply({ ephemeral: true, content: `Only **${interaction.user.username}** can use this button, run the command again to use the help menu.` }); return false;
              };
            },
            time: 60000,
            idle: 60000 / 2
          });
          collector.on('end', async () => {
            await msg.edit({ components: [d_btnrow, d_btnrow2], fetchReply: true })
          });
          collector.on('collect', async (b) => {
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "home") {
              const btn_home = new EmbedBuilder().setColor(client.important.MAIN_COLOR).setAuthor({ name: `Home section` }).setDescription(`Hello there :wave:, I'm <@${client.user.id}> well since you click this button I might just tell you some informations.`).addFields(
                { name: 'Commands Size', value: `╰Slash - \`${client.slashCommands.size}\`\n╰Prefix - \`${client.commands.size}\``, inline: true },
                { name: 'Ping', value: `╰Websocket - \`${client.ws.ping}ms\`\n╰Shards - \`${client.ws.shards.ping || 'No Shards'}\`\n╰Roundtrip - \`${msg.createdTimestamp - interaction.createdTimestamp}ms\``, inline: true },
                { name: 'Creator', value: `╰Name - \`${client.important.OWNER_TAG}\`\n╰ID - \`${client.important.MONGO_DB}\`\n╰URL - __[\`Hachiki\`](${client.important.OWNER_LINK})__`, inline: true }
              )
              return await msg.edit({ embeds: [btn_home] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "del") {
              return await msg.edit({ components: [d_btnrow, d_btnrow2] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "info") {
              _cmd = client.slashCommands.filter((x) => x.category && x.category === "Info").map((x) =>
                `**/${x.name}**\n╰ ${x.description}`).join("\n")
              return await msg.edit({ embeds: [edit_embed.setColor(client.important.MAIN_COLOR).setDescription(`**Info Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "music") {
              _cmd = client.slashCommands.filter((x) => x.category && x.category === "Music").map((x) =>
                `**/${x.name}**\n╰ ${x.description}`).join("\n")
              return await msg.edit({ embeds: [edit_embed.setColor(client.important.MAIN_COLOR).setDescription(`**Music Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "queue") {
              _cmd = client.slashCommands.filter((x) => x.category && x.category === "Queue").map((x) =>
                `**/${x.name}**\n╰ ${x.description}`).join("\n")
              return await msg.edit({ embeds: [edit_embed.setColor(client.important.MAIN_COLOR).setDescription(`**Queue Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "fun") {
              _cmd = client.slashCommands.filter((x) => x.category && x.category === "Fun").map((x) =>
                `**/${x.name}**\n╰ ${x.description}`).join("\n")
              return await msg.edit({ embeds: [edit_embed.setColor(client.important.MAIN_COLOR).setDescription(`**Fun Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "gen") {
              _cmd = client.slashCommands.filter((x) => x.category && x.category === "Genshin").map((x) =>
                `**/${x.name}**\n╰ ${x.description}`).join("\n")
              return await msg.edit({ embeds: [edit_embed.setColor(client.important.MAIN_COLOR).setDescription(`**Genshin Impact Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "gear") {
              _cmd = client.slashCommands.filter((x) => x.category && x.category === "Settings").map((x) =>
                `**/${x.name}**\n╰ ${x.description}`).join("\n")
              return await msg.edit({ embeds: [edit_embed.setColor(client.important.MAIN_COLOR).setDescription(`**Settings Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "menu-1") {
              const value = b.values[0];
              switch (value) {
                case "opt_home":
                  {
                    await msg.edit({
                      embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setAuthor({ name: `Home section` }).setDescription(`Hello there :wave:, I'm <@${client.user.id}> well since you click this button I might just tell you some informations.`).addFields(
                        { name: 'Commands Size', value: `╰Slash - \`${client.slashCommands.size}\`\n╰Prefix - \`${client.commands.size}\``, inline: true },
                        { name: 'Ping', value: `╰Websocket - \`${client.ws.ping}ms\`\n╰Shards - \`${client.ws.shards.ping || 'No Shards'}\`\n╰Roundtrip - \`${msg.createdTimestamp - interaction.createdTimestamp}ms\``, inline: true },
                        { name: 'Creator', value: `╰Name - \`${client.important.OWNER_TAG}\`\n╰ID - \`${client.important.MONGO_DB}\`\n╰URL - __[\`Hachiki\`](${client.important.OWNER_LINK})__`, inline: true }
                      )],
                      fetchReply: true
                    })
                  }
                  break;
                case "opt_info":
                  {
                    _cmd = client.slashCommands.filter((x) => x.category && x.category === "Info").map((x) =>
                      `**/${x.name}**\n╰ ${x.description}`).join("\n")
                    await msg.edit({ embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setDescription(`**Info Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
                  }
                  break;
                case "opt_music":
                  {
                    _cmd = client.slashCommands.filter((x) => x.category && x.category === "Music").map((x) =>
                      `**/${x.name}**\n╰ ${x.description}`).join("\n")
                    await msg.edit({ embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setDescription(`**Music Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
                  }
                  break;
                case "opt_queue":
                  {
                    _cmd = client.slashCommands.filter((x) => x.category && x.category === "Queue").map((x) =>
                      `**/${x.name}**\n╰ ${x.description}`).join("\n")
                    await msg.edit({ embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setDescription(`**Queue Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
                  }
                  break;
                case "opt_sett":
                  {
                    _cmd = client.slashCommands.filter((x) => x.category && x.category === "Settings").map((x) =>
                      `**/${x.name}**\n╰ ${x.description}`).join("\n")
                    await msg.edit({ embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setDescription(`**Settings Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
                  }
                  break;
                case "opt_gen":
                  {
                    _cmd = client.slashCommands.filter((x) => x.category && x.category === "Genshin").map((x) =>
                      `**/${x.name}**\n╰ ${x.description}`).join("\n")
                    await msg.edit({ embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setDescription(`**Gensin Impact Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
                  }
                default:
                  break;
              }
            }
          })
        } else if (slcmd === 'anime') {
          const aniemebd = new EmbedBuilder()
            .setColor(client.important.MAIN_COLOR)
            .setTitle(client.emoji.blank + " Anime Panel")
            .setDescription(`${client.slashCommands.filter((cmd) => cmd.category === "Anime").map((cmd) =>
              `\`${cmd.name}\``).join(", ")}`)
          await interaction.reply({ embeds: [aniemebd] }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
        } else {
          const _slcmd = client.slashCommands.get(`waifu-${slcmd.toLowerCase()}`)
          if (!_slcmd) return interaction.reply({ content: `${client.emoji.warning} | There is no such __**waifu-${slcmd}**__ exist.\n> Please do not include **waifu-** at the begining if you did.`, ephemeral: true })
          const slcmdembed = new EmbedBuilder()
            .setColor(client.important.MAIN_COLOR)
            .setTitle(`/${_slcmd.name} more Info`)
            .addFields(
              { name: 'Description', value: `${_slcmd.description || "None"}` },
              { name: 'Usage', value: `${_slcmd.usage || "None"}` },
              { name: 'Cooldown', value: `${_slcmd.cooldown || "None"}` },
              { name: 'Required Permission', value: `${_slcmd.default_member_permissions || "None"}` }
            )
            .setFooter({ text: `${interaction.user.tag} | Usage Syntax: <required> [optional]` })

          await interaction.reply({ embeds: [slcmdembed], ephemeral: true })
        }
        interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] });
      } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        if (!slcmd) {
          const menurow = new ActionRowBuilder().addComponents([
            new StringSelectMenuBuilder()
              .setCustomId('menu-1')
              .setPlaceholder('Select Menu')
              .addOptions([
                {
                  label: "Home",
                  description: 'Home section',
                  value: `opt_home`,
                  emoji: `${client.emoji.home}`
                },
                {
                  label: "Infomation",
                  description: 'Information Commands',
                  value: `opt_info`,
                  emoji: `${client.emoji.info}`
                },
                {
                  label: "Music",
                  description: 'Music Commands',
                  value: `opt_music`,
                  emoji: `${client.emoji.music}`
                },
                {
                  label: "Queue",
                  description: 'Queue Commands',
                  value: `opt_queue`,
                  emoji: `${client.emoji.queue}`
                },
                {
                  label: "Settings",
                  description: 'Settings Commands',
                  value: `opt_sett`,
                  emoji: `${client.emoji.setting}`
                },
                {
                  label: "Fun",
                  description: 'Fun Commands',
                  value: `opt_fun`,
                  emoji: `${client.emoji.fun}`
                },
                {
                  label: "Genshin",
                  description: 'Fun Commands',
                  value: `opt_gen`,
                  emoji: `${client.emoji.genshin}`
                }
              ])
          ]);
          const btnrow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId('home')
              .setLabel('Home')
              .setEmoji(`${client.emoji.home}`)
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId('info')
              .setLabel('Info')
              .setEmoji(`${client.emoji.info}`)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('music')
              .setLabel('Music')
              .setEmoji(`${client.emoji.music}`)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('queue')
              .setLabel('Queue')
              .setEmoji(`${client.emoji.queue}`)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('fun')
              .setLabel('Fun')
              .setEmoji(`${client.emoji.fun}`)
              .setStyle(ButtonStyle.Secondary)
          );
          const btnrow2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId('gen')
              .setLabel('Genshin')
              .setEmoji(`${client.emoji.genshin}`)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('gear')
              .setLabel('Settings')
              .setEmoji(`${client.emoji.setting}`)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('del')
              .setLabel('End')
              .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
              .setLabel('Donate')
              .setStyle(ButtonStyle.Link)
              .setURL("https://ko-fi.com/hachiki_hoshino")
              .setEmoji(`${client.emoji.donate}`)
          );
          // disabled button
          const d_btnrow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId('d_home')
              .setLabel('Home')
              .setEmoji(`${client.emoji.home}`)
              .setDisabled(true)
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId('d_info')
              .setLabel('Info')
              .setEmoji(`${client.emoji.info}`)
              .setDisabled(true)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('d_music')
              .setLabel('Music')
              .setEmoji(`${client.emoji.music}`)
              .setDisabled(true)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('d_queue')
              .setLabel('Queue')
              .setEmoji(`${client.emoji.queue}`)
              .setDisabled(true)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('d_fun')
              .setLabel('Fun')
              .setEmoji(`${client.emoji.fun}`)
              .setDisabled(true)
              .setStyle(ButtonStyle.Secondary)
          );
          // disabled button 2
          const d_btnrow2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId('gen')
              .setLabel('Genshin')
              .setEmoji(`${client.emoji.genshin}`)
              .setDisabled(true)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('gear')
              .setLabel('Settings')
              .setEmoji(`${client.emoji.setting}`)
              .setDisabled(true)
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId('del')
              .setLabel('End')
              .setDisabled(true)
              .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
              .setLabel('Donate')
              .setStyle(ButtonStyle.Link)
              .setURL("https://ko-fi.com/hachiki_hoshino")
              .setEmoji(`${client.emoji.donate}`)
          );

          let edit_embed = new EmbedBuilder()
          const home_embed = new EmbedBuilder()
            .setColor(client.important.MAIN_COLOR)
            .setAuthor({ name: `${interaction.guild.members.me.displayName} Help menu` })
            .setDescription('Click the buttons below to see eac category commands or use the drop down menu.\n\n:grey_question:- **Get started by using </help:1014093652135530527>**\n:notes: - **The one and only music bot you need**\n:headphones: - **Built-in DJ System**\n:joy: - **Fun and Anime commands **\n:link: - **Website: __https://waifumusic.ml/__**')
            .setImage("https://media.giphy.com/media/AdRiVFBcGJ5iZRqUyG/giphy.gif")
            .setThumbnail(client.user.displayAvatarURL())

          const msg = await interaction.reply({ content: `${rmgss}`, embeds: [home_embed], components: [menurow, btnrow, btnrow2], fetchReply: true });

          const collector = interaction.channel.createMessageComponentCollector({
            filter: (b) => {
              if (b.user.id === interaction.user.id) return true;
              else {
                b.reply({ ephemeral: true, content: `Only **${interaction.user.username}** can use this button, run the command again to use the help menu.` }); return false;
              };
            },
            time: 60000,
            idle: 60000 / 2
          });
          collector.on('end', async () => {
            await msg.edit({ components: [d_btnrow, d_btnrow2], fetchReply: true })
          });
          collector.on('collect', async (b) => {
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "home") {
              const btn_home = new EmbedBuilder().setColor(client.important.MAIN_COLOR).setAuthor({ name: `Home section` }).setDescription(`Hello there :wave:, I'm <@${client.user.id}> well since you click this button I might just tell you some informations.`).addFields(
                { name: 'Commands Size', value: `╰Slash - \`${client.slashCommands.size}\`\n╰Prefix - \`${client.commands.size}\``, inline: true },
                { name: 'Ping', value: `╰Websocket - \`${client.ws.ping}ms\`\n╰Shards - \`${client.ws.shards.ping || 'No Shards'}\`\n╰Roundtrip - \`${msg.createdTimestamp - interaction.createdTimestamp}ms\``, inline: true },
                { name: 'Creator', value: `╰Name - \`${client.important.OWNER_TAG}\`\n╰ID - \`${client.important.MONGO_DB}\`\n╰URL - __[\`Hachiki\`](${client.important.OWNER_LINK})__`, inline: true }
              )
              return await msg.edit({ embeds: [btn_home] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "del") {
              return await msg.edit({ components: [d_btnrow, d_btnrow2] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "info") {
              _cmd = client.slashCommands.filter((x) => x.category && x.category === "Info").map((x) =>
                `**/${x.name}**\n╰ ${x.description}`).join("\n")
              return await msg.edit({ embeds: [edit_embed.setColor(client.important.MAIN_COLOR).setDescription(`**Info Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "music") {
              _cmd = client.slashCommands.filter((x) => x.category && x.category === "Music").map((x) =>
                `**/${x.name}**\n╰ ${x.description}`).join("\n")
              return await msg.edit({ embeds: [edit_embed.setColor(client.important.MAIN_COLOR).setDescription(`**Music Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "queue") {
              _cmd = client.slashCommands.filter((x) => x.category && x.category === "Queue").map((x) =>
                `**/${x.name}**\n╰ ${x.description}`).join("\n")
              return await msg.edit({ embeds: [edit_embed.setColor(client.important.MAIN_COLOR).setDescription(`**Queue Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "fun") {
              _cmd = client.slashCommands.filter((x) => x.category && x.category === "Fun").map((x) =>
                `**/${x.name}**\n╰ ${x.description}`).join("\n")
              return await msg.edit({ embeds: [edit_embed.setColor(client.important.MAIN_COLOR).setDescription(`**Fun Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "gen") {
              _cmd = client.slashCommands.filter((x) => x.category && x.category === "Genshin").map((x) =>
                `**/${x.name}**\n╰ ${x.description}`).join("\n")
              return await msg.edit({ embeds: [edit_embed.setColor(client.important.MAIN_COLOR).setDescription(`**Genshin Impact Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "gear") {
              _cmd = client.slashCommands.filter((x) => x.category && x.category === "Settings").map((x) =>
                `**/${x.name}**\n╰ ${x.description}`).join("\n")
              return await msg.edit({ embeds: [edit_embed.setColor(client.important.MAIN_COLOR).setDescription(`**Settings Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
            }
            if (!b.deferred) await b.deferUpdate()
            if (b.customId === "menu-1") {
              const value = b.values[0];
              switch (value) {
                case "opt_home":
                  {
                    await msg.edit({
                      embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setAuthor({ name: `Home section` }).setDescription(`Hello there :wave:, I'm <@${client.user.id}> well since you click this button I might just tell you some informations.`).addFields(
                        { name: 'Commands Size', value: `╰Slash - \`${client.slashCommands.size}\`\n╰Prefix - \`${client.commands.size}\``, inline: true },
                        { name: 'Ping', value: `╰Websocket - \`${client.ws.ping}ms\`\n╰Shards - \`${client.ws.shards.ping || 'No Shards'}\`\n╰Roundtrip - \`${msg.createdTimestamp - interaction.createdTimestamp}ms\``, inline: true },
                        { name: 'Creator', value: `╰Name - \`${client.important.OWNER_TAG}\`\n╰ID - \`${client.important.MONGO_DB}\`\n╰URL - __[\`Hachiki\`](${client.important.OWNER_LINK})__`, inline: true }
                      )],
                      fetchReply: true
                    })
                  }
                  break;
                case "opt_info":
                  {
                    _cmd = client.slashCommands.filter((x) => x.category && x.category === "Info").map((x) =>
                      `**/${x.name}**\n╰ ${x.description}`).join("\n")
                    await msg.edit({ embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setDescription(`**Info Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
                  }
                  break;
                case "opt_music":
                  {
                    _cmd = client.slashCommands.filter((x) => x.category && x.category === "Music").map((x) =>
                      `**/${x.name}**\n╰ ${x.description}`).join("\n")
                    await msg.edit({ embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setDescription(`**Music Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
                  }
                  break;
                case "opt_queue":
                  {
                    _cmd = client.slashCommands.filter((x) => x.category && x.category === "Queue").map((x) =>
                      `**/${x.name}**\n╰ ${x.description}`).join("\n")
                    await msg.edit({ embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setDescription(`**Queue Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
                  }
                  break;
                case "opt_sett":
                  {
                    _cmd = client.slashCommands.filter((x) => x.category && x.category === "Settings").map((x) =>
                      `**/${x.name}**\n╰ ${x.description}`).join("\n")
                    await msg.edit({ embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setDescription(`**Settings Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
                  }
                  break;
                case "opt_gen":
                  {
                    _cmd = client.slashCommands.filter((x) => x.category && x.category === "Genshin").map((x) =>
                      `**/${x.name}**\n╰ ${x.description}`).join("\n")
                    await msg.edit({ embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setDescription(`**Gensin Impact Commands!**\n*some of the commands are not be visible yet to public.*\n\n${_cmd}`)] })
                  }
                default:
                  break;
              }
            }
          })
        } else if (slcmd === 'anime') {
          const aniemebd = new EmbedBuilder()
            .setColor(client.important.MAIN_COLOR)
            .setTitle(client.emoji.blank + " Anime Panel")
            .setDescription(`${client.slashCommands.filter((cmd) => cmd.category === "Anime").map((cmd) =>
              `\`${cmd.name}\``).join(", ")}`)
          await interaction.reply({ embeds: [aniemebd] });
        } else if (slcmd === 'dev') {
          const dembed = new EmbedBuilder()
            .setColor(client.important.MAIN_COLOR)
            .setTitle(client.emoji.blank + " Developer Cmds")
            .setDescription(`${client.slashCommands.filter((cmd) => cmd.category === "dev").map((cmd) =>
              `\`${cmd.name}\``).join(", ")}`)
          await interaction.reply({ embeds: [dembed] });
        } else {
          const _slcmd = client.slashCommands.get(`waifu-${slcmd.toLowerCase()}`)
          if (!_slcmd) return interaction.reply({ content: `${client.emoji.warning} | There is no such __**waifu-${slcmd}**__ exist.\n> Please do not include **waifu-** at the begining if you did.`, ephemeral: true })
          const slcmdembed = new EmbedBuilder()
            .setColor(client.important.MAIN_COLOR)
            .setTitle(`/${_slcmd.name} more Info`)
            .addFields(
              { name: 'Description', value: `${_slcmd.description || "None"}` },
              { name: 'Usage', value: `${_slcmd.usage || "None"}` },
              { name: 'Cooldown', value: `${_slcmd.cooldown || "None"}` },
              { name: 'Required Permission', value: `${_slcmd.default_member_permissions || "None"}` }
            )
            .setFooter({ text: `${interaction.user.tag} | Usage Syntax: <required> [optional]` })

          await interaction.reply({ embeds: [slcmdembed], ephemeral: true })
        }
      }
    } catch (e) {
      console.log(e)
      await interaction.reply({
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
}