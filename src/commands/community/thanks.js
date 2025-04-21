const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('thanks')
    .setDescription('Bedanke dich bei einem anderen Mitglied.')
    .addUserOption(option =>
      option.setName('benutzer')
        .setDescription('Das Mitglied, bei dem du dich bedanken möchtest.')
        .setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('benutzer');
    await interaction.reply(`🙏 ${interaction.user.tag} bedankt sich bei ${user.tag}!`);
  },
};