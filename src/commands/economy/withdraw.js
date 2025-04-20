const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('withdraw')
    .setDescription('Hebe Geld von deinem Bankkonto ab.')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Der Betrag, den du abheben möchtest.')
        .setRequired(true)),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');

    // Temporäre Logik
    const bank = 1000; // Beispielwert

    if (amount > bank) {
      return interaction.reply({ content: 'Du hast nicht genug Geld auf deinem Bankkonto.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor(0xFFD700)
      .setTitle('🏦 Abhebung erfolgreich')
      .setDescription(`Du hast **${amount} Coins** von deinem Bankkonto abgehoben.`)
      .setFooter({ text: 'Ultimate Bot - Economy', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};