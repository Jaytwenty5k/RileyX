const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Überprüft die Latenz des Bots.'),
  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    await interaction.editReply(`🏓 Pong! Latenz ist **${sent.createdTimestamp - interaction.createdTimestamp}ms**.`);
  },
};