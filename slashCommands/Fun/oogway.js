const { EmbedBuilder, ApplicationCommandType, AttachmentBuilder, WebhookClient } = require("discord.js"); // packages
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
  name: 'waifu-oogway', // name of the command
  description: 'The legend is here', // description of the command
  category: 'Fun', // cmd category
  developer: true, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
  options: [
    {
      name: 'text',
      description: 'Text you want Master Oogway to say',
      type: 3,
      required: true
    }
  ], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Oogway used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    try {
      const input = interaction.options.getString("text");
      // if (!input) return interaction.reply({ content: "Please provide text to display" });
      // const filepath = `https://luminabot.xyz/api/image/oogway?text=${input}`;
      // fetch(filepath)
      //   .then((res) => res.arrayBuffer())
      //   .then((data) => {
      //     const attachment = new AttachmentBuilder(data, 'oogway.png');
      //     interaction.channel.send({ files: [attachment] })
      //   })
      interaction.reply({ content: `${client.emoji.warning} | This command is disabled.`, ephemeral: true })
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