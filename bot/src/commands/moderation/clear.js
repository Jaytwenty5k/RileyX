const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Löscht eine bestimmte Anzahl von Nachrichten in einem Kanal.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Anzahl der zu löschenden Nachrichten (max. 100).')
        .setRequired(true)),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');

    if (amount < 1 || amount > 100) {
      return interaction.reply({ content: 'Bitte gib eine Zahl zwischen 1 und 100 ein.', ephemeral: true });
    }

    try {
      const deletedMessages = await interaction.channel.bulkDelete(amount, true);
      await interaction.reply({ content: `✅ ${deletedMessages.size} Nachrichten wurden gelöscht.`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Fehler: Nachrichten konnten nicht gelöscht werden.', ephemeral: true });
    }
  },
};