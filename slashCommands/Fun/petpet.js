const { EmbedBuilder, ApplicationCommandType, AttachmentBuilder, WebhookClient } = require("discord.js"); // packages
// const petPetGif = require('pet-pet-gif')
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-petpet', // name of the command
  description: 'Pet someone', // description of the command
  category: 'Fun', // cmd category
  developer: true, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  options: [
    {
      name: 'target',
      description: 'Select whose profile pic you want to see',
      type: 6,
      required: true
    }
  ], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Petpet used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    const { guild } = interaction;
    const Target = interaction.options.getUser('target');
    try {
      if (!client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        let animatedGif = await petPetGif(Target.displayAvatarURL({ format: 'png' }))
        const image = new AttachmentBuilder(animatedGif, 'petpet.gif')
        interaction.reply({ files: [image] }).then(() => {
          interaction.followUp({ content: `<@${interaction.user.id}>`, embeds: [new EmbedBuilder().setColor(client.important.MAIN_COLOR).setTitle(client.config.alert.title).setDescription(client.config.alert.desc).setThumbnail(client.config.alert.thumb)] })
        })
      } else if (client.usernews.get(guild.id, "news").includes(interaction.user.id)) {
        let animatedGif = await petPetGif(Target.displayAvatarURL({ format: 'png' }))
        const image = new AttachmentBuilder(animatedGif, 'petpet.gif')
        await interaction.reply({ files: [image] })
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