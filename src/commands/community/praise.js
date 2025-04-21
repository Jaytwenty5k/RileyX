const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('praise')
    .setDescription('Lobe ein anderes Mitglied.')
    .addUserOption(option =>
      option.setName('benutzer')
        .setDescription('Das Mitglied, das du loben möchtest.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('grund')
        .setDescription('Der Grund für das Lob.')
        .setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('benutzer');
    const reason = interaction.options.getString('grund') || 'Kein spezifischer Grund angegeben.';

    await interaction.reply(`🌟 ${interaction.user.tag} hat ${user.tag} gelobt! Grund: ${reason}`);
  },
};