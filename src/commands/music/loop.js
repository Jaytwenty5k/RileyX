const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Aktiviert oder deaktiviert das Wiederholen des aktuellen Songs.'),
  async execute(interaction) {
    // Temporäre Logik (Integration mit einem Musikplayer erforderlich)
    const isLooping = Math.random() < 0.5; // Beispiel: Zufälliges Aktivieren oder Deaktivieren

    const embed = new EmbedBuilder()
      .setColor(isLooping ? 0x00FF00 : 0xFF4500)
      .setTitle(isLooping ? '🔁 Loop aktiviert' : '🔁 Loop deaktiviert')
      .setDescription(isLooping ? 'Der aktuelle Song wird wiederholt.' : 'Das Wiederholen des Songs wurde deaktiviert.')
      .setFooter({ text: 'Ultimate Bot - Musik', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};