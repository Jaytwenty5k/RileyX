const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Zeigt den aktuell abgespielten Song an.'),
  async execute(interaction) {
    // Temporäre Beispielwerte
    const currentSong = 'Song 1 - Künstler A';
    const duration = '3:45';
    const progress = '1:30';

    const embed = new EmbedBuilder()
      .setColor(0xFFD700)
      .setTitle('🎵 Now Playing')
      .setDescription(`**${currentSong}**\n\nDauer: **${duration}**\nFortschritt: **${progress}**`)
      .setFooter({ text: 'Ultimate Bot - Musik', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};