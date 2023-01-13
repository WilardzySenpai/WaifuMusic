const { EmbedBuilder, ApplicationCommandType, version, WebhookClient } = require("discord.js"); // packages
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-ping', // name of the command
  description: 'returns websocket ping', // description of the command
  usage: '/ping', // usage of the cmd
  category: 'Info', // cmd category
  developer: false, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  options: [], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Ping used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    try {
      const { guild } = interaction;
      if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        return await interaction.reply({
          embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR)
            .addFields(
              {
                name: ":robot: Client",
                value: `┕🟢 Online! <t:${parseInt(client.readyTimestamp / 1000)}:R>`,
                inline: true,
              },
              {
                name: "⌛ Ping",
                value: `┕${client.ws.ping}ms!`,
                inline: true,
              },
              {
                name: ":file_cabinet: Memory",
                value: `┕${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
                  2
                )}mb`,
                inline: true,
              },
              {
                name: ":robot: Version",
                value: `┕v${require("../../package.json").version}`,
                inline: true,
              },
              {
                name: ":blue_book: Discord.js",
                value: `┕v${version}`,
                inline: true,
              },
              {
                name: ":green_book: Node",
                value: `┕${process.version}`,
                inline: true,
              },
            )]
        }).then(() => {
          interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
        })
      } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        return interaction.reply({
          embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR)
            .addFields(
              {
                name: ":robot: Client",
                value: `┕🟢 Online! <t:${parseInt(client.readyTimestamp / 1000)}:R>`,
                inline: true,
              },
              {
                name: "⌛ Ping",
                value: `┕${client.ws.ping}ms!`,
                inline: true,
              },
              {
                name: ":file_cabinet: Memory",
                value: `┕${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
                  2
                )}mb`,
                inline: true,
              },
              {
                name: ":robot: Version",
                value: `┕v${require("../../package.json").version}`,
                inline: true,
              },
              {
                name: ":blue_book: Discord.js",
                value: `┕v${version}`,
                inline: true,
              },
              {
                name: ":green_book: Node",
                value: `┕${process.version}`,
                inline: true,
              },
            )]
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