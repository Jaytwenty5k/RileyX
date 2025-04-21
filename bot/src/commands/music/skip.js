const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Überspringt den aktuellen Song.'),
  async execute(interaction) {
    // Temporäre Logik (Integration mit einem Musikplayer erforderlich)
    const embed = new EmbedBuilder()
      .setColor(0xFF4500)
      .setTitle('⏭️ Song übersprungen')
      .setDescription('Der aktuelle Song wurde übersprungen.')
      .setFooter({ text: 'Ultimate Bot - Musik', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};