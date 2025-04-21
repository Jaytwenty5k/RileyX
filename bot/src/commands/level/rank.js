const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Zeigt deinen aktuellen Rang und XP an.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Der Benutzer, dessen Rang angezeigt werden soll.')
        .setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;

    // Beispielwerte (Integration mit einer Datenbank erforderlich)
    const level = 5; // Beispiel-Level
    const xp = 1500; // Beispiel-XP
    const xpToNextLevel = 2000; // Nötige XP für das nächste Level

    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle(`🏆 Rang von ${user.tag}`)
      .setDescription(`**Level:** ${level}\n**XP:** ${xp} / ${xpToNextLevel}`)
      .setFooter({ text: 'Ultimate Bot - Level-System', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};