const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Zeigt deinen aktuellen Kontostand an.'),
  async execute(interaction) {
    const userId = interaction.user.id;

    // Temporäres Beispiel: Kontostand aus einer hypothetischen Datenbank
    const balance = 500; // Ersetze dies durch echten Datenbankaufruf

    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle('💰 Dein Kontostand')
      .setDescription(`Wallet: **${balance} Coins**\nBank: **1000 Coins**`) // Beispiel
      .setFooter({ text: 'Ultimate Bot - Economy', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};