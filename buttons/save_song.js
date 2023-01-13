const { EmbedBuilder } = require('discord.js')

module.exports = {
	id: 'save_song',
	permissions: ['SendMessages'],
	execute: async (client, interaction) => {
        const queue = client.distube.getQueue(interaction.guildId);
        if (!queue || !queue.playing) {
            return interaction.reply({ content: `${client.emoji.cross} | No music currently playing.`, ephemeral: true });
        } else {
            const song = queue.songs[0];
            const but_save = new EmbedBuilder()
                .setColor(client.important.MAIN_COLOR)
                .setTitle(client.user.username + " - Save Track")
                .setThumbnail(client.user.displayAvatarURL())
                .addFields(
                    { name: `${client.emoji.song} Track`, value: `\`${song.name}\`` },
                    { name: `${client.emoji.timer} Duration`, value:`\`${song.formattedDuration}\``, inline: true },
                    { name: `${client.emoji.link} URL`, value: `${song.url}` },
                    { name: `${client.emoji.guild} Saved Server`, value: `\`${interaction.guild.name}\`` },
                    { name: `${client.emoji.posted} Requested By`, value: `${song.user}`, inline: true }
                )
                .setTimestamp()
                .setFooter({ text: 'Waifu Save Music!', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });
            interaction.user.send({ embeds: [but_save] }).then(async () => {
                await interaction.reply({ content: `${client.emoji.check} | I sent the name of the music via private message.`, ephemeral: true }).catch((err) => console.log(err));
            }).catch(error => {
                interaction.reply({ content: `${client.emoji.warning} | Unable to send you private message.`, embeds: [but_save], ephemeral: true }).catch((err) => console.log(err));
            })
        }
	}
};