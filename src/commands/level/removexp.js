const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removexp')
    .setDescription('Entfernt XP von einem Benutzer.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Der Benutzer, von dem XP entfernt werden sollen.')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Die Menge an XP, die entfernt werden sollen.')
        .setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');

    // Temporäre Logik (Integration mit einer Datenbank erforderlich)
    await interaction.reply(`${amount} XP wurden von ${user.tag} entfernt.`);
  },
};