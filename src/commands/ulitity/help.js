const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Zeigt eine Liste aller verfügbaren Befehle an.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle('❓ Hilfe - Befehlsübersicht')
      .setDescription('Hier ist eine Liste aller verfügbaren Befehle:')
      .addFields(
        { name: '🎮 Economy', value: '`/balance`, `/deposit`, `/withdraw`, `/work`, `/rob`' },
        { name: '🎲 Casino', value: '`/slots`, `/blackjack`, `/roulette`' },
        { name: '🏆 Level-System', value: '`/rank`, `/leaderboard`' },
        { name: '📖 Roleplay', value: '`/create-character`, `/attack`' },
        { name: '🎵 Musik', value: '`/play`, `/queue`, `/pause`, `/resume`, `/skip`, `/stop`, `/volume`, `/nowplaying`, `/loop`' },
        { name: '⚙️ Utility', value: '`/help`, `/feature-request`' }
      )
      .setFooter({ text: 'Ultimate Bot - Hilfe', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};