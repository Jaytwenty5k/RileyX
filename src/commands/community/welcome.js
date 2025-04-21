const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('welcome')
    .setDescription('Setze die Begrüßungsnachricht für neue Mitglieder.')
    .addStringOption(option =>
      option.setName('nachricht')
        .setDescription('Die Begrüßungsnachricht.')
        .setRequired(true)),
  async execute(interaction) {
    const message = interaction.options.getString('nachricht');

    // Speichere die Nachricht in der Datenbank oder in einer temporären Speicherstruktur
    // Hier nur ein Beispiel (Speicherung lokal):
    const welcomeData = require('../welcomeData'); // Datei oder Datenbankstruktur
    welcomeData.message = message;

    await interaction.reply(`✅ Die Begrüßungsnachricht wurde erfolgreich gesetzt:\n"${message}"`);
  },
};