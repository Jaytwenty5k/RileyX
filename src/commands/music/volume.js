const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Passt die Lautstärke der Musik an.')
    .addIntegerOption(option =>
      option.setName('level')
        .setDescription('Die Lautstärke (zwischen 1 und 100).')
        .setRequired(true)),
  async execute(interaction) {
    const level = interaction.options.getInteger('level');

    if (level < 1 || level > 100) {
      return interaction.reply({ content: 'Bitte gib eine Lautstärke zwischen 1 und 100 an.', ephemeral: true });
    }

    // Temporäre Logik (Integration mit einem Musikplayer erforderlich)
    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle('🔊 Lautstärke angepasst')
      .setDescription(`Die Lautstärke wurde auf **${level}%** gesetzt.`)
      .setFooter({ text: 'Ultimate Bot - Musik', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};