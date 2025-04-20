const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slots')
    .setDescription('Spiele am Spielautomaten und teste dein Glück!')
    .addIntegerOption(option =>
      option.setName('wager')
        .setDescription('Der Betrag, den du setzen möchtest.')
        .setRequired(true)),
  async execute(interaction) {
    const wager = interaction.options.getInteger('wager');
    const symbols = ['🍒', '🍋', '🍇', '🍉', '⭐', '🔔']; // Symbole für den Spielautomaten
    const slots = Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const isWin = slots[0] === slots[1] && slots[1] === slots[2]; // Gewinnbedingung

    const embed = new EmbedBuilder()
      .setColor(isWin ? 0x00FF00 : 0xFF0000)
      .setTitle('🎰 Spielautomaten')
      .setDescription(`**Ergebnis:**\n${slots.join(' | ')}\n\n${isWin ? `🎉 Du hast gewonnen! Dein Gewinn: ${wager * 2} Coins.` : '😢 Leider verloren! Versuch es nochmal.'}`)
      .setFooter({ text: 'Ultimate Bot - Casino', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};