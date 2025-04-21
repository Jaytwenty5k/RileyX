const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roulette')
    .setDescription('Setze auf eine Zahl oder Farbe im Roulette!')
    .addStringOption(option =>
      option.setName('bet')
        .setDescription('Setze auf eine Zahl (0-36) oder eine Farbe (rot/schwarz).')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('wager')
        .setDescription('Der Betrag, den du setzen möchtest.')
        .setRequired(true)),
  async execute(interaction) {
    const bet = interaction.options.getString('bet').toLowerCase();
    const wager = interaction.options.getInteger('wager');
    const rouletteResult = Math.floor(Math.random() * 37); // Zahl 0-36
    const color = rouletteResult === 0 ? 'grün' : rouletteResult % 2 === 0 ? 'schwarz' : 'rot'; // Farbe bestimmen
    const isWin = bet === color || bet === `${rouletteResult}`;

    const embed = new EmbedBuilder()
      .setColor(isWin ? 0x00FF00 : 0xFF0000)
      .setTitle('🎡 Roulette')
      .setDescription(`**Ergebnis:**\nZahl: ${rouletteResult}\nFarbe: ${color}\n\n${isWin ? `🎉 Du hast gewonnen! Dein Gewinn: ${wager * 2} Coins.` : '😢 Leider verloren! Versuch es nochmal.'}`)
      .setFooter({ text: 'Ultimate Bot - Casino', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};