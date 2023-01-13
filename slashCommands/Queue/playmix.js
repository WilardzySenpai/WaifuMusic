const { EmbedBuilder, ApplicationCommandType, WebhookClient } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-playmix', // name of the command
  description: 'Plays a defined Mix', // description of the command
  usage: '/playmix [what_mix]', // usage of the cmd
  category: 'Queue', // cmd category
  developer: false, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  inVoiceChannel: true,
  sameVoice: true,
  options: [
    {
      name: "type",
      description: "What Mix do you want?",
      type: 3,
      required: true,
      choices: [
        {
          name: 'Blues Mix',
          value: 'blues'
        },
        {
          name: 'Charts Mix',
          value: 'charts'
        },
        {
          name: 'Chill Mix',
          value: 'chill'
        },
        {
          name: 'Default Mix',
          value: 'default'
        },
        {
          name: 'Hachiki Mix',
          value: 'hachiki'
        },
        {
          name: 'Heavymetal Mix',
          value: 'heavymetal'
        },
        {
          name: 'Gaming Mix',
          value: 'gaming'
        },
        {
          name: 'Jazz Mix',
          value: 'jazz'
        },
        {
          name: 'Meta Mix',
          value: 'metal'
        },
        {
          name: 'NCS Mix',
          value: 'ncs'
        },
        {
          name: 'No Copyright Mix',
          value: 'nocopyright'
        },
        {
          name: 'Old Gaming Mix',
          value: 'oldgaming'
        },
        {
          name: 'Pop Mix',
          value: 'pop'
        },
        {
          name: 'Remixes Mix',
          value: 'remixes'
        },
        {
          name: 'Rock Mix',
          value: 'rock'
        },
        {
          name: 'Strange-Fuit Mix',
          value: 'strange-fruit-gaming'
        }
      ]
    },
  ], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Playmix used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    const { member, channelId, guildId, options } = interaction;
    const { guild } = member;
    const { channel } = member.voice;
    const args = [interaction.options.getString("type")]
    try {
      if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        let link = "https://open.spotify.com/playlist/37i9dQZF1DXc6IFF23C9jj";
        if (args[0]) {
          //ncs | no copyrighted music
          if (args[0].toLowerCase().startsWith("n")) link = "https://open.spotify.com/playlist/7sZbq8QGyMnhKPcLJvCUFD";
          //pop
          if (args[0].toLowerCase().startsWith("p")) link = "https://open.spotify.com/playlist/37i9dQZF1DXc6IFF23C9jj";
          //default
          if (args[0].toLowerCase().startsWith("d")) link = "https://open.spotify.com/playlist/37i9dQZF1DXc6IFF23C9jj";
          //remixes from Magic Release
          if (args[0].toLowerCase().startsWith("re")) link = "https://www.youtube.com/watch?v=NX7BqdQ1KeU&list=PLYUn4YaogdahwfEkuu5V14gYtTqODx7R2"
          //rock
          if (args[0].toLowerCase().startsWith("ro")) link = "https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U";
          //oldgaming
          if (args[0].toLowerCase().startsWith("old")) link = "https://www.youtube.com/watch?v=iFOAJ12lDDU&list=PLYUn4YaogdahPQPTnBGCrytV97h8ABEav"
          //gaming
          if (args[0].toLowerCase().startsWith("gam")) link = "https://open.spotify.com/playlist/4a54P2VHy30WTi7gix0KW6";
          //Charts
          if (args[0].toLowerCase().startsWith("cha")) link = "https://www.youtube.com/playlist?list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl"
          //Chill
          if (args[0].toLowerCase().startsWith("chi")) link = "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6";
          //Jazz
          if (args[0].toLowerCase().startsWith("jaz")) link = "https://open.spotify.com/playlist/37i9dQZF1DXbITWG1ZJKYt";
          //blues
          if (args[0].toLowerCase().startsWith("blu")) link = "https://open.spotify.com/playlist/37i9dQZF1DXd9rSDyQguIk";
          //strange-fruits
          if (args[0].toLowerCase().startsWith("str")) link = "https://open.spotify.com/playlist/6xGLprv9fmlMgeAMpW0x51";
          //magic-release
          if (args[0].toLowerCase().startsWith("mag")) link = "https://www.youtube.com/watch?v=WvMc5_RbQNc&list=PLYUn4Yaogdagvwe69dczceHTNm0K_ZG3P"
          //metal
          if (args[0].toLowerCase().startsWith("met")) link = "https://open.spotify.com/playlist/37i9dQZF1DX9qNs32fujYe";
          //hachiki
          if (args[0].toLowerCase().startsWith("hac")) link = "https://open.spotify.com/playlist/5NiAewB25WUcVlyX5pbn4R?si=b97b65332c024dd8";
          //heavy metal
          if (args[0].toLowerCase().startsWith("hea")) link = "https://open.spotify.com/playlist/37i9dQZF1DX9qNs32fujYe";
        } //update it without a response!
        await interaction.reply({
          embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.emoji.song + " Loading...").setDescription(`**'${args[0] ? args[0] : "Default"}' Music Mix**`)]
        })
        const message = await interaction.fetchReply().then(() => {
          interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
        })
        await client.createPlay(interaction, message.id);
        try {
          const queue = client.distube.getQueue(guildId);
          const options = {
            member: member,
          }
          if (!queue) options.textChannel = guild.channels.cache.get(channelId)
          await client.distube.play(channel, link, options).catch((err) => interaction.followUp({ content: `${client.emoji.warning} | An error encountered: ${err.toString().slice(0, 1974)}`, ephemeral: true }));
          interaction.followUp({
            content: `${queue?.songs?.length > 0 ? "👍 Loaded" : "🎶 Now Playing"}: the **'${args[0] ? args[0] : "Default"}'**`,
            ephemeral: true
          }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
        } catch (e) {
          console.log(e)
        }
      } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        let link = "https://open.spotify.com/playlist/37i9dQZF1DXc6IFF23C9jj";
        if (args[0]) {
          //ncs | no copyrighted music
          if (args[0].toLowerCase().startsWith("n")) link = "https://open.spotify.com/playlist/7sZbq8QGyMnhKPcLJvCUFD";
          //pop
          if (args[0].toLowerCase().startsWith("p")) link = "https://open.spotify.com/playlist/37i9dQZF1DXc6IFF23C9jj";
          //default
          if (args[0].toLowerCase().startsWith("d")) link = "https://open.spotify.com/playlist/37i9dQZF1DXc6IFF23C9jj";
          //remixes from Magic Release
          if (args[0].toLowerCase().startsWith("re")) link = "https://www.youtube.com/watch?v=NX7BqdQ1KeU&list=PLYUn4YaogdahwfEkuu5V14gYtTqODx7R2"
          //rock
          if (args[0].toLowerCase().startsWith("ro")) link = "https://open.spotify.com/playlist/37i9dQZF1DWXRqgorJj26U";
          //oldgaming
          if (args[0].toLowerCase().startsWith("old")) link = "https://www.youtube.com/watch?v=iFOAJ12lDDU&list=PLYUn4YaogdahPQPTnBGCrytV97h8ABEav"
          //gaming
          if (args[0].toLowerCase().startsWith("gam")) link = "https://open.spotify.com/playlist/4a54P2VHy30WTi7gix0KW6";
          //Charts
          if (args[0].toLowerCase().startsWith("cha")) link = "https://www.youtube.com/playlist?list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl"
          //Chill
          if (args[0].toLowerCase().startsWith("chi")) link = "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6";
          //Jazz
          if (args[0].toLowerCase().startsWith("jaz")) link = "https://open.spotify.com/playlist/37i9dQZF1DXbITWG1ZJKYt";
          //blues
          if (args[0].toLowerCase().startsWith("blu")) link = "https://open.spotify.com/playlist/37i9dQZF1DXd9rSDyQguIk";
          //strange-fruits
          if (args[0].toLowerCase().startsWith("str")) link = "https://open.spotify.com/playlist/6xGLprv9fmlMgeAMpW0x51";
          //magic-release
          if (args[0].toLowerCase().startsWith("mag")) link = "https://www.youtube.com/watch?v=WvMc5_RbQNc&list=PLYUn4Yaogdagvwe69dczceHTNm0K_ZG3P"
          //metal
          if (args[0].toLowerCase().startsWith("met")) link = "https://open.spotify.com/playlist/37i9dQZF1DX9qNs32fujYe";
          //hachiki
          if (args[0].toLowerCase().startsWith("hac")) link = "https://open.spotify.com/playlist/5NiAewB25WUcVlyX5pbn4R?si=b97b65332c024dd8";
          //heavy metal
          if (args[0].toLowerCase().startsWith("hea")) link = "https://open.spotify.com/playlist/37i9dQZF1DX9qNs32fujYe";
        } //update it without a response!
        await interaction.reply({
          embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.emoji.song + " Loading...").setDescription(`**'${args[0] ? args[0] : "Default"}' Music Mix**`)]
        });
        const message = await interaction.fetchReply();
        await client.createPlay(interaction, message.id);
        try {
          const queue = client.distube.getQueue(guildId);
          const options = {
            member: member,
          }
          if (!queue) options.textChannel = guild.channels.cache.get(channelId)
          await client.distube.play(channel, link, options).catch((err) => interaction.followUp({ content: `${client.emoji.warning} | An error encountered: ${err.toString().slice(0, 1974)}`, ephemeral: true }));
          interaction.followUp({
            content: `${queue?.songs?.length > 0 ? "👍 Loaded" : "🎶 Now Playing"}: the **'${args[0] ? args[0] : "Default"}'**`,
            ephemeral: true
          });
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
    } catch (e) {
      console.log(e)
    }
  }
}