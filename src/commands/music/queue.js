const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Zeigt die aktuelle Warteschlange an.'),
  async execute(interaction) {
    // Temporäre Beispielwerte für die Warteschlange
    const queue = ['Song 1 - Künstler A', 'Song 2 - Künstler B', 'Song 3 - Künstler C'];

    const embed = new EmbedBuilder()
      .setColor(0xFFD700)
      .setTitle('🎶 Warteschlange')
      .setDescription(queue.map((song, index) => `${index + 1}. ${song}`).join('\n') || 'Die Warteschlange ist leer.')
      .setFooter({ text: 'Ultimate Bot - Musik', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};