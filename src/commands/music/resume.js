const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Setzt die pausierte Wiedergabe fort.'),
  async execute(interaction) {
    // Temporäre Logik (Integration mit einem Musikplayer erforderlich)
    const embed = new EmbedBuilder()
      .setColor(0x00FF00)
      .setTitle('▶️ Wiedergabe fortgesetzt')
      .setDescription('Die Musik wird fortgesetzt.')
      .setFooter({ text: 'Ultimate Bot - Musik', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};