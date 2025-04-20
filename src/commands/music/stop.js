const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stoppt die Wiedergabe und leert die Warteschlange.'),
  async execute(interaction) {
    // Temporäre Logik (Integration mit einem Musikplayer erforderlich)
    const embed = new EmbedBuilder()
      .setColor(0xFF0000)
      .setTitle('🛑 Wiedergabe gestoppt')
      .setDescription('Die Musik wurde gestoppt und die Warteschlange geleert.')
      .setFooter({ text: 'Ultimate Bot - Musik', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};