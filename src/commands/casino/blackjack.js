const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blackjack')
    .setDescription('Spiele eine Runde Blackjack gegen den Dealer.')
    .addIntegerOption(option =>
      option.setName('wager')
        .setDescription('Der Betrag, den du setzen möchtest.')
        .setRequired(true)),
  async execute(interaction) {
    const wager = interaction.options.getInteger('wager');
    const drawCard = () => Math.floor(Math.random() * 11) + 1; // Karte mit Wert 1-11 ziehen
    const playerHand = [drawCard(), drawCard()];
    const dealerHand = [drawCard(), drawCard()];

    const playerTotal = playerHand.reduce((a, b) => a + b, 0);
    const dealerTotal = dealerHand.reduce((a, b) => a + b, 0);

    let result;
    if (playerTotal > 21) result = '😢 Du hast verloren! Dein Total ist über 21.';
    else if (dealerTotal > 21 || playerTotal > dealerTotal) result = `🎉 Du hast gewonnen! Dein Gewinn: ${wager * 2} Coins.`;
    else if (playerTotal === dealerTotal) result = '🤝 Unentschieden! Dein Einsatz wird zurückerstattet.';
    else result = '😢 Der Dealer hat gewonnen! Versuch es nochmal.';

    const embed = new EmbedBuilder()
      .setColor(result.includes('gewonnen') ? 0x00FF00 : 0xFF0000)
      .setTitle('🃏 Blackjack')
      .setDescription(`**Deine Karten:** ${playerHand.join(', ')} (Total: ${playerTotal})\n**Dealer Karten:** ${dealerHand.join(', ')} (Total: ${dealerTotal})\n\n${result}`)
      .setFooter({ text: 'Ultimate Bot - Casino', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};