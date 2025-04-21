const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rob')
    .setDescription('Raube einen anderen Benutzer aus!')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Der Benutzer, den du ausrauben möchtest.')
        .setRequired(true)),
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const userId = interaction.user.id;

    if (target.id === userId) {
      return interaction.reply({ content: 'Du kannst dich nicht selbst ausrauben!', ephemeral: true });
    }

    // Temporäre Logik
    const success = Math.random() < 0.5; // 50% Erfolg
    const stolenAmount = Math.floor(Math.random() * 100) + 50; // Zufälliger Betrag

    if (success) {
      const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('🚨 Raub erfolgreich')
        .setDescription(`Du hast **${stolenAmount} Coins** von ${target.tag} gestohlen!`)
        .setFooter({ text: 'Ultimate Bot - Economy', iconURL: interaction.client.user.displayAvatarURL() });

      await interaction.reply({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setColor(0xFF4500)
        .setTitle('❌ Raub fehlgeschlagen')
        .setDescription(`Du wurdest beim Versuch, ${target.tag} auszurauben, erwischt!`)
        .setFooter({ text: 'Ultimate Bot - Economy', iconURL: interaction.client.user.displayAvatarURL() });

      await interaction.reply({ embeds: [embed] });
    }
  },
};