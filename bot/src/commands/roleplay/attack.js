const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('attack')
    .setDescription('Greift einen anderen Charakter an.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Das Ziel, das du angreifen möchtest.')
        .setRequired(true)),
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const damage = Math.floor(Math.random() * 50) + 1; // Zufälliger Schaden zwischen 1 und 50

    const embed = new EmbedBuilder()
      .setColor(0xFF4500)
      .setTitle('⚔️ Angriff ausgeführt')
      .setDescription(`${interaction.user.tag} hat ${target.tag} angegriffen und **${damage} Schaden** verursacht!`)
      .setFooter({ text: 'Ultimate Bot - Roleplay', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};