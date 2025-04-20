const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deposit')
    .setDescription('Zahle Geld auf dein Bankkonto ein.')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Der Betrag, den du einzahlen möchtest.')
        .setRequired(true)),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');

    // Temporäre Logik
    const wallet = 500; // Beispielwert

    if (amount > wallet) {
      return interaction.reply({ content: 'Du hast nicht genug Geld im Wallet.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle('🏦 Einzahlung erfolgreich')
      .setDescription(`Du hast **${amount} Coins** auf dein Bankkonto eingezahlt.`)
      .setFooter({ text: 'Ultimate Bot - Economy', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};