const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('feature-request')
    .setDescription('Reiche eine Funktionsanfrage für den Bot ein.')
    .addStringOption(option =>
      option.setName('feature')
        .setDescription('Beschreibe die Funktion, die du hinzufügen möchtest.')
        .setRequired(true)),
  async execute(interaction) {
    const feature = interaction.options.getString('feature');

    const embed = new EmbedBuilder()
      .setColor(0xFFD700)
      .setTitle('📢 Feature-Anfrage eingereicht')
      .setDescription(`Danke für deine Anfrage! Hier sind die Details:\n\n**Angefragte Funktion:** ${feature}\n\nWir werden dies prüfen und gegebenenfalls implementieren.`)
      .setFooter({ text: 'Ultimate Bot - Feature Request', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });

    // Optional: Log die Anfrage für Admins (falls eine Datenbank existiert, kannst du die Anfrage dort speichern).
    console.log(`Neue Feature-Anfrage: ${feature} von ${interaction.user.tag}`);
  },
};