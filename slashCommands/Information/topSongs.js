const { Database } = require("st.db");
const ytsr = require("@distube/ytsr");
const { EmbedBuilder, ApplicationCommandType, WebhookClient, PermissionBitField } = require("discord.js"); // packages
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

const SStats = new Database("./databases/models/chart.json", { databaseInObject: true });

module.exports = {
  name: 'waifu-topsongs', // name of the command
  description: 'Display the top songs played', // description of the command
  usage: '/waifu-topsongs', // usage of the cmd
  category: 'Info', // cmd category
  developer: true, // false if the command is for public
  type: ApplicationCommandType.ChatInput, // chatinput
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
  userPerms: ['SendMessages'], // user perms need to use the command
  botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
//   inVoiceChannel: true,
//   sameVoice: true,
  options: [], // options string
  execute: async (client, interaction) => {
    wbc.send(`[slashCommand] :: **Name used by ${interaction.user.tag} from ${interaction.guild.name}**`);
    try {
        const all = SStats.all().slice(0, 10);
        
        all.sort((a, b) => {
            return b.data - a.data;
        });
        
        var index = 0;
        
        for (let i = 0; i < all.length; i++) {
            const total = all[i].data;
            index = (index + total)
        }
        
        const TopChart = [];
        for (let i = 0; i < all.length; i++) {
            const format = `https://youtu.be/${all[i].ID}`;
            const search = await ytsr(format, { limit: 1 });
            const track = search.items[0]; 

            TopChart.push(
                `**${i + 1}.** [${track.name}](${track.url}) | **Played:** \`${all[i].data}\`
                `)
        }
        
        const str = TopChart.join('');

        const embed = new EmbedBuilder()
            .setColor(client.important.MAIN_COLOR)
            .setTitle(client.emoji.blank + " Top Charts")
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`${str == '' ? '  No Playable' : '\n' + str}`)
            .setFooter({ text: `Total Song • ${SStats.all().length} | Total Played • ${index}` })


        return interaction.reply({ embeds: [embed] })
    } catch (e) {
      console.log(e)
    }
  }
}