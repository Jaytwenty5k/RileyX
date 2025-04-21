const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Zeigt die Bestenliste basierend auf Leveln und XP an.'),
  async execute(interaction) {
    // Beispielwerte (Integration mit einer Datenbank erforderlich)
    const leaderboard = [
      { tag: 'User1#1234', level: 10, xp: 5000 },
      { tag: 'User2#5678', level: 8, xp: 3400 },
      { tag: 'User3#9012', level: 7, xp: 2900 },
    ];

    const description = leaderboard
      .map((user, index) => `**${index + 1}. ${user.tag}** - Level ${user.level} (${user.xp} XP)`)
      .join('\n');

    const embed = new EmbedBuilder()
      .setColor(0xFFD700)
      .setTitle('🏅 Bestenliste')
      .setDescription(description || 'Keine Daten verfügbar.')
      .setFooter({ text: 'Ultimate Bot - Level-System', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};