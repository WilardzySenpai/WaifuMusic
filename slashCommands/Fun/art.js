const { EmbedBuilder, ApplicationCommandType, AttachmentBuilder, WebhookClient } = require("discord.js"); // packages
const WomboDream = require('dream-api');
const fetch = require('node-fetch');
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-art', // name of the command
  description: 'AI Generated art', // description of the command
  category: 'Fun', // cmd category
  developer: false, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  options: [
    {
      name: 'query',
      description: 'Image Query',
      type: 3,
      required: true
    },
    {
      name: 'style',
      description: 'Style of Art',
      type: 10,
      required: false
    }
  ], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Autoplay used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    interaction.channel.sendTyping();
    const { guild, options } = interaction;
    const query = options.getString('query');
    const sty = options.getNumber('style');
    const GetStyle = await fetch('https://paint.api.wombo.ai/api/styles/').then(res => res.json());
    const style = GetStyle.map(style => {
      return {
        id: style.id,
        name: style.name,
      }
    });
    try {
      if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        if (!sty) {
          return interaction.reply({ ephemeral: true, content: `${client.emoji.cross} | Please specify a style, and re-run the command with the style number!` + "\n" + style.map(style => `\`${style.id}\` = \`${style.name}\``).join('\n') })
        }
        const msg = await interaction.reply({ content: `Generating your image...`, fetchReply: true });
        styName = " "
        for (let i = 0; i < GetStyle.length; i++) {
          if (sty == GetStyle[i].id) {
            styName = GetStyle[i].name
          }
        }
        let image = await WomboDream.generateImage(sty, query);
        console.log(query)
        console.log(sty)
        console.log(image)

        // sending your art to support server!
        client.channels.cache.get("1036843244195155998").send({
          embeds: [
            new EmbedBuilder()
              .setColor('Gold')
              .setImage(image.result.final)
              .setDescription(`This art is done by ${interaction.user.tag} using:`)
              .addFields(
                { name: `Image Query`, value: `${client.emoji.bup}${query}`, inline: true },
                { name: `Art Style`, value: `${client.emoji.bup}${styName}\n${client.emoji.bup}${sty}`, inline: true },
                { name: `Created At`, value: `${client.emoji.bup}${image.created_at}`, inline: true },
                { name: `Updated At`, value: `${client.emoji.bup}${image.updated_at}`, inline: true }
              )
              .setFooter({ text: client.user.username + "| waifumusic.ml" })
              .setTimestamp()
          ]
        })

        let embed = new EmbedBuilder()
          .setColor(client.important.MAIN_COLOR)
          .setTitle(`${query.toUpperCase()} Art with style ${styName.toUpperCase()}`)
          .setImage(image.result.final)
          .setTimestamp()
        interaction.channel.send({ embeds: [embed] })
        msg.edit({ content: `${query}, ${sty}`, fetchReply: true }).then(() => {
          interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
        })
      } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        if (!sty) {
          return interaction.reply({ ephemeral: true, content: `${client.emoji.cross} | Please specify a style, and re-run the command with the style number!` + "\n" + style.map(style => `\`${style.id}\` = \`${style.name}\``).join('\n') })
        }
        const msg = await interaction.reply({ content: `Generating your image...`, fetchReply: true });
        styName = " "
        for (let i = 0; i < GetStyle.length; i++) {
          if (sty == GetStyle[i].id) {
            styName = GetStyle[i].name
          }
        }
        let image = await WomboDream.generateImage(sty, query);
        console.log(query)
        console.log(sty)
        console.log(image)

        // sending your art to support server!
        client.channels.cache.get("1036843244195155998").send({
          embeds: [
            new EmbedBuilder()
              .setColor('Gold')
              .setImage(image.result.final)
              .setDescription(`This art is done by ${interaction.user.tag} using:`)
              .addFields(
                { name: `Image Query`, value: `${client.emoji.bup}${query}`, inline: true },
                { name: `Art Style`, value: `${client.emoji.bup}${styName}\n${client.emoji.bup}${sty}`, inline: true },
                { name: `Created At`, value: `${client.emoji.bup}${image.created_at}`, inline: true },
                { name: `Updated At`, value: `${client.emoji.bup}${image.updated_at}`, inline: true }
              )
              .setFooter({ text: client.user.username + "| waifumusic.ml" })
              .setTimestamp()
          ]
        })

        let embed = new EmbedBuilder()
          .setColor(client.important.MAIN_COLOR)
          .setTitle(`${query.toUpperCase()} Art with style ${styName.toUpperCase()}`)
          .setImage(image.result.final)
          .setTimestamp()
        interaction.channel.send({ embeds: [embed] })
        msg.edit({ content: `${query}, ${sty}`, fetchReply: true }).then(() => {
          interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
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