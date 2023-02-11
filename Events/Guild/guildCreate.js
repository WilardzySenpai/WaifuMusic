const { EmbedBuilder, Collection, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder, WebhookClient, ChannelType } = require('discord.js');
const config = require('../../Config/config.json');
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.addnrem.id,
  token: weblog.addnrem.token,
});

module.exports = {
  name: 'guildCreate',
  execute: async (guild, client) => {
    try {
      const owner = await guild.fetchOwner()
      // console.log(guild.ownerId)
      let joinembed = new EmbedBuilder()
        .setAuthor({ name: guild.name, iconURL: guild.iconURL() || "https://cdn.discordapp.com/avatars/1013477956905091144/eb31b5a2228f7ea5f79c8a3fdc56cb02.png" })
        .setThumbnail(guild.iconURL() || "https://cdn.discordapp.com/avatars/1013477956905091144/eb31b5a2228f7ea5f79c8a3fdc56cb02.png")
        .setColor(client.important.MAIN_COLOR)
        .addFields(
          {
            name: 'WaifuMusic',
            value: `
    Name: ${guild.name}
    Guild ID: ${guild.id}
    Created at: <t:${parseInt(guild.createdTimestamp / 1000)}:R>
    Owner: \`${owner.user.tag}\`
    Member Count: ${guild.memberCount} member(s)

    Description: ${guild.description || "No Description"} `
          }
        )
        .setFooter({ text: `New Server!` });

      wbc.send({ embeds: [joinembed] });

    //   // a message will be sent to ther owner of the server
    //   guild.members.cache.get(guild.ownerId)?.send({
    //     embeds: [
    //       new MessageEmbed()
    //         .setColor(client.important.MAIN_COLOR)
    //         .setTitle("Hey 👋, Thanks for inviting me to your server!")
    //         .setImage("https://giphy.com/gifs/AdRiVFBcGJ5iZRqUyG")
    //         .setDescription("I'm WaifuMusic, I play Music for everyone in VC!")
    //         .setFooter({ text: "Only the server owner can receive this message.", iconURL: "https://cdn.discordapp.com/avatars/1013477956905091144/eb31b5a2228f7ea5f79c8a3fdc56cb02.png" })
    //     ]
    //   });

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel("Invite")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=1013477956905091144&permissions=2184563009&scope=applications.commands%20bot`)
            .setEmoji("982760548041125898"),
          new ButtonBuilder()
            .setLabel("Support")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.gg/DhszDJGp7g`)
            .setEmoji("982760524863385701"),
          new ButtonBuilder()
            .setLabel("Support")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://top.gg/bot/1013477956905091144/vote`)
            .setEmoji("982120760392949811"),
        );
      const nembed = new EmbedBuilder()
        .setTitle("Thank you!")
        .setDescription("Hi 👋 I'm WaifuMusic a Discord bot that plays music in VC!\nBelow is some of the basics information.")
        .setColor(client.important.MAIN_COLOR)
        .addFields(
          {
            name: "Slash",
            value: "Slash commands, to start type on chat `/waifu-help` make sure the icon of the slash is the same as my icon.\n• Didn't appear? try to invite me again [click this.](https://discord.com/oauth2/authorize?client_id=1013477956905091144&permissions=2184563009&scope=bot%20applications.commands)"
          },
          {
            name: "Features:",
            value: "• DJ Role System\n• Filters\n• Fun\n• Anime and much more in the future update!"
          }
        )
      let channel = guild.channels.cache.find(
        channel =>
          channel.type === ChannelType.GuildText &&
          channel.permissionsFor(guild.members.me).has(PermissionsBitField.Flags.SendMessages)
      );
      channel.send({ embeds: [nembed], components: [row] })
    } catch (e) {
      console.log(e)
    }
  }
}