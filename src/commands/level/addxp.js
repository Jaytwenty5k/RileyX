const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addxp')
    .setDescription('Fügt einem Benutzer zusätzliche XP hinzu.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Der Benutzer, dem XP hinzugefügt werden soll.')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Die Menge an XP, die hinzugefügt werden soll.')
        .setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');

    // Temporäre Logik (Integration mit einer Datenbank erforderlich)
    await interaction.reply(`${amount} XP wurden ${user.tag} hinzugefügt.`);
  },
};