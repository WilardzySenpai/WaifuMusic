const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle, WebhookClient } = require("discord.js"); // packages
const weblog = require('../../Config/webhook.json');
const wbc = new WebhookClient({
  id: weblog.cmdl.id,
  token: weblog.cmdl.token,
});

module.exports = {
    name: 'waifu-rps', // name of the command
    description: 'Play rock paper scissor with me', // description of the command
    usage: 'Fun', // usage of the cmd
    category: '/waifu-rps', // cmd category
    developer: true, // false if the command is for public
    type: ApplicationCommandType.ChatInput, // chatinput
    cooldown: 3000, // cooldown of the commands
    default_member_permissions: 'SendMessages', // discord perms user to see the cmd 
    userPerms: ['SendMessages'], // user perms need to use the command
    botPerms: ['SendMessages', 'ReadMessageHistory', 'Speak', 'Connect', 'UseExternalEmojis', 'AddReactions', 'EmbedLinks', 'AttachFiles'], // bot permissions
    options: [], // options string
    execute: async (client, interaction) => {
        wbc.send(`[slashCommand] :: **Rps used by ${interaction.user.tag} from ${interaction.guild.name}**`);
        try {
            let hand = [
                {
                    txt: 'Rock',
                    emoji: '✊',
                    index: 0
                },
                {
                    txt: 'Paper',
                    emoji: '🖐',
                    index: 1
                },
                {
                    txt: 'Scissors',
                    emoji: '✌',
                    index: 2
                }
            ];

            const embed1 = new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setTitle('Rock Paper Scissors')
                .setImage('https://i.imgur.com/ZVh6AwO.gif')
                .setDescription('Choose a handsign!')

            const btn1 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('rps_rock')
                        .setLabel('✊ Rock')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('rps_paper')
                        .setLabel('🖐 Paper')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('rps_scissors')
                        .setLabel('✌ Scissors')
                        .setStyle(ButtonStyle.Primary)
                );

            let botMove = hand[Math.floor(Math.random() * 3)];

            const rpsMsg = await interaction.reply({ embeds: [embed1], components: [btn1], fetchReply: true })

            let win = 0;
            let userMove;

            const filter = interaction => !interaction.user.bot;
            const collector = interaction.channel.createMessageComponentCollector({
                filter,
                time: 10000
            });

            collector.on('collect', async (i) => {
                if (!i.isButton()) return;

                if (i.customId.startsWith('rps')) {
                    await i.deferUpdate();
                    let move = i.customId.split('_')[1]
                    userMove = hand.find(v => v.txt.toLowerCase() == move);

                    switch (move) {
                        case 'rock':
                            win = botMove.index == 0 ? 1 : (botMove.index == 1 ? 0 : 2);
                            break;
                        case 'paper':
                            win = botMove.index == 0 ? 2 : (botMove.index == 1 ? 1 : 0);
                            break;
                        case 'scissors':
                            win = botMove.index == 0 ? 0 : (botMove.index == 1 ? 2 : 1);
                            break;
                    }

                    let embed = embed1
                    embed.setColor = client.important.MAIN_COLOR
                    embed.setDescription = `I choose ${botMove.txt}! ${win == 0 ? 'You lost!' : (win == 1 ? 'We tied!' : 'You win!')} (${userMove.emoji} ${win == 0 ? '<' : (win == 1 ? '=' : '>')} ${botMove.emoji})`

                    let components = btn1

                    components.components.forEach(comp => {
                        if (comp.customId == i.customId) {
                            comp.setDisabled = true;
                            comp.setStyle = ButtonStyle.Secondary;
                        } else comp.setDisabled = true;
                    });

                    await rpsMsg.edit({ embeds: [embed], components: [components], fetchyReply: true });

                    collector.stop()
                }
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
}