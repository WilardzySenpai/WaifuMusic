const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-filters', // name of the command
  description: 'Add a filter to your song', // description of the command
  usage: '/filter [type]', // usage of the cmd
  category: 'Music', // cmd category
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  inVoiceChannel: true,
  sameVoice: true,
  options: [
    {
      name: 'preset',
      description: 'Filters to add.',
      type: 3,
      required: true,
      choices: [
        {
          name: 'BassBoost',
          value: 'bassboost'
        },
        {
          name: 'Nightcore',
          value: 'nightcore'
        },
        {
          name: 'Vaporwave',
          value: 'vaporwave'
        },
        {
          name: '3D',
          value: '3d'
        },
        {
          name: 'Echo',
          value: 'echo'
        },
        {
          name: 'Karaoke',
          value: 'karaoke'
        },
        {
          name: 'Flanger',
          value: 'flanger'
        },
        {
          name: 'Gate',
          value: 'gate'
        },
        {
          name: 'Hass',
          value: 'hass'
        },
        {
          name: 'Reverse',
          value: 'reverse'
        },
        {
          name: 'Surround',
          value: 'surround'
        },
        {
          name: 'Mcompand',
          value: 'mcompand'
        },
        {
          name: 'Phaser',
          value: 'Phaser'
        },
        {
          name: 'Tremolo',
          value: 'tremolo'
        },
        {
          name: 'Earwax',
          value: 'earwax'
        },
        {
          name: 'Off',
          value: 'off'
        }
      ],
    }
  ], // options string
  execute: async (client, interaction) => {
    try {
      wbc.send(`[slashCommand] :: **Filter used by ${interaction.user.tag} from ${interaction.guild.name}**`);
      const { member, guildId, options, guild } = interaction;
      const queue = client.distube.getQueue(guildId);
      const filterss = options.getString('preset');
      try {
        if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
          const nomusic = new EmbedBuilder()
            .setDescription(`${client.emoji.corss} | There is no music currently playing!`)
            .setColor(client.important.MAIN_COLOR)
          if (!queue || !queue.songs || queue.songs.length == 0) return interaction.reply({ embeds: [nomusic], ephemeral: true }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          }).catch(e => { })
          if (check_if_dj(client, member, queue.songs[0])) {
            return interaction.reply({
              embeds: [new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setFooter({ text: "WaifuMusic", iconURL: client.user.displayAvatarURL() })
                .setDescription(`${client.emoji.corss} | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
              ],
              ephemeral: true
            }).then(() => {
              interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
            })
          }
          // if (!interaction.member.voice.channel) {
          //   const joinEmbed = new EmbedBuilder()
          //     .setColor(client.important.MAIN_COLOR)
          //     .setDescription(`${client.emoji.cross} | You must be in a voice channel to use this command!`);
          //   return interaction.reply({ embeds: [joinEmbed], ephemeral: true });
          // }
          // if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(interaction.member.voice.channel)) return interaction.reply({
          //   embeds: [
          //     new EmbedBuilder()
          //       .setColor(client.important.MAIN_COLOR)
          //       .setDescription(`${client.emoji.cross} | You must be in the same voice channel as the <@${client.user.id}> to use this command!`)
          //   ], ephemeral: true
          // });

          queue.filterss = !queue.filterss;

          let thing = new EmbedBuilder().setColor(client.important.MAIN_COLOR);
          if (filterss == 'nightcore') {
            thing.setDescription(`✅ | Nightcore filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**`);
            queue.filters.add(filterss);
          } else if (filterss == "bassboost") {
            thing.setDescription(`✅ | BassBoost filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**`);
            queue.filters.add(filterss);
          } else if (filterss == "vaporwave") {
            thing.setDescription(`✅ | Vaporwave filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "3d") {
            thing.setDescription(`✅ | 3D filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "echo") {
            thing.setDescription(`✅ | Echo filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "karaoke") {
            thing.setDescription(`✅ | Karaoke filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "flanger") {
            thing.setDescription(`✅ | Flanger filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "gate") {
            thing.setDescription(`✅ | Gate filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "hass") {
            thing.setDescription(`✅ | Hass filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "reverse") {
            thing.setDescription(`✅ | Reverse filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "surround") {
            thing.setDescription(`✅ | Surround filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "mcompand") {
            thing.setDescription(`✅ | Mcompand filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "phaser") {
            thing.setDescription(`✅ | Phaser filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "tremolo") {
            thing.setDescription(`✅ | Tremolo filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "earwax") {
            thing.setDescription(`✅ | Earwax filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "off") {
            thing.setDescription(`✅ | Earwax filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.clear(filterss);
          } else {
            thing.setDescription("❌ | Invalid filter!");
          }
          return interaction.reply({ embeds: [thing], ephemeral: true }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
        } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
          const nomusic = new EmbedBuilder()
            .setDescription(`${client.emoji.corss} | There is no music currently playing!`)
            .setColor(client.important.MAIN_COLOR)
          if (!queue || !queue.songs || queue.songs.length == 0) return interaction.reply({ embeds: [nomusic], ephemeral: true }).catch(e => { })
          if (check_if_dj(client, member, queue.songs[0])) {
            return interaction.reply({
              embeds: [new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setFooter({ text: "WaifuMusic", iconURL: client.user.displayAvatarURL() })
                .setDescription(`${client.emoji.corss} | **You are not a DJ and not the Song Requester!**\n**DJ-Roles:**\n> ${check_if_dj(client, member, queue.songs[0])}`)
              ],
              ephemeral: true
            });
          }
          // if (!interaction.member.voice.channel) {
          //   const joinEmbed = new EmbedBuilder()
          //     .setColor(client.important.MAIN_COLOR)
          //     .setDescription(`${client.emoji.cross} | You must be in a voice channel to use this command!`);
          //   return interaction.reply({ embeds: [joinEmbed], ephemeral: true });
          // }
          // if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(interaction.member.voice.channel)) return interaction.reply({
          //   embeds: [
          //     new EmbedBuilder()
          //       .setColor(client.important.MAIN_COLOR)
          //       .setDescription(`${client.emoji.cross} | You must be in the same voice channel as the <@${client.user.id}> to use this command!`)
          //   ], ephemeral: true
          // });

          queue.filterss = !queue.filterss;

          let thing = new EmbedBuilder().setColor(client.important.MAIN_COLOR);
          if (filterss == 'nightcore') {
            thing.setDescription(`✅ | Nightcore filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**`);
            queue.filters.add(filterss);
          } else if (filterss == "bassboost") {
            thing.setDescription(`✅ | BassBoost filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**`);
            queue.filters.add(filterss);
          } else if (filterss == "vaporwave") {
            thing.setDescription(`✅ | Vaporwave filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "3d") {
            thing.setDescription(`✅ | 3D filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "echo") {
            thing.setDescription(`✅ | Echo filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "karaoke") {
            thing.setDescription(`✅ | Karaoke filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "flanger") {
            thing.setDescription(`✅ | Flanger filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "gate") {
            thing.setDescription(`✅ | Gate filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "hass") {
            thing.setDescription(`✅ | Hass filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "reverse") {
            thing.setDescription(`✅ | Reverse filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "surround") {
            thing.setDescription(`✅ | Surround filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "mcompand") {
            thing.setDescription(`✅ | Mcompand filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "phaser") {
            thing.setDescription(`✅ | Phaser filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "tremolo") {
            thing.setDescription(`✅ | Tremolo filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "earwax") {
            thing.setDescription(`✅ | Earwax filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.add(filterss);
          } else if (filterss == "off") {
            thing.setDescription(`✅ | Earwax filter is now **\`${queue.filterss ? "Enabled" : "Disabled"}\`**!`);
            queue.filters.clear(filterss);
          } else {
            thing.setDescription("❌ | Invalid filter!");
          }
          return interaction.reply({ embeds: [thing], ephemeral: true })
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