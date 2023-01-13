const { EmbedBuilder, ApplicationCommandType, WebhookClient, PermissionBitField } = require("discord.js"); // packages
const { check_if_dj } = require("../../Util/functions");
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-setvolume', // name of the command
  description: 'Set the default volume of the server', // description of the command
  usage: '/waifu-setvolume', // usage of the cmd
  category: 'Settings', // cmd category
  developer: false, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'Administrator', // discord perms user to see the cmd 
  userPerms: ['Administrator'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  default_member_permissions: 'ManageGuild', // discord perms
  options: [
    {
      name: 'volume',
      description: 'Set the volume between 1-100',
      type: 10,
      required: true
    }
  ], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Setvolume used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    const { options, member } = interaction;
    const { guild } = member;
    client.settings.ensure(guild.id, {
      defaultvolume: 50
    });
    const dvol = options.getNumber('volume');
    try {
      if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        if (!dvol || (dvol > 100 || dvol < 1)) {
          await interaction.reply({
            embeds:
              [new EmbedBuilder().setColor(client.important.ERR_COLOR).setTitle(client.emoji.blank + " Error").setDescription(client.emoji.cross + " Number can't be larger than 100")]
          }).then(() => {
            interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
          })
        }
        client.settings.set(guild.id, dvol, "defaultvolume");
        await interaction.reply({
          embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.emoji.blank + " Volume Set").setDescription(client.emoji.check + " | Default volume is now set to: " + `**${dvol}**%`)]
        }).then(() => {
          interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
        })
      } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        if (!dvol || (dvol > 100 || dvol < 1)) {
          await interaction.reply({
            embeds:
              [new EmbedBuilder().setColor(client.important.ERR_COLOR).setTitle(client.emoji.blank + " Error").setDescription(client.emoji.cross + " Number can't be larger than 100")]
          })
        }
        client.settings.set(guild.id, dvol, "defaultvolume");
        await interaction.reply({
          embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.emoji.blank + " Volume Set").setDescription(client.emoji.check + " | Default volume is now set to: " + `**${dvol}**%`)]
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