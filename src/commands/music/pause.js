const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pausiert die aktuelle Wiedergabe.'),
  async execute(interaction) {
    // Temporäre Logik (Integration mit einem Musikplayer erforderlich)
    const embed = new EmbedBuilder()
      .setColor(0xFFA500)
      .setTitle('⏸️ Wiedergabe pausiert')
      .setDescription('Die Musik wurde erfolgreich pausiert.')
      .setFooter({ text: 'Ultimate Bot - Musik', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};