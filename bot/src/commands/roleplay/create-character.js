const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-character')
    .setDescription('Erstellt einen Charakter für das Rollenspiel.')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('Der Name deines Charakters.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('class')
        .setDescription('Die Klasse deines Charakters (z. B. Krieger, Magier, Schurke).')
        .setRequired(true)),
  async execute(interaction) {
    const name = interaction.options.getString('name');
    const charClass = interaction.options.getString('class');

    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle('🌀 Charakter erstellt')
      .setDescription(`Du hast erfolgreich einen Charakter erstellt!\n\n**Name:** ${name}\n**Klasse:** ${charClass}`)
      .setFooter({ text: 'Ultimate Bot - Roleplay', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};