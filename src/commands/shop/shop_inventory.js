const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const shopData = require('../../shopData');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shop_inventory')
    .setDescription('Zeigt dein Inventar und Chips-Guthaben an.'),
  async execute(interaction) {
    const userId = interaction.user.id;
    const user = shopData.users[userId] || { chips: 100, inventory: [] };

    const embed = new EmbedBuilder()
      .setTitle('📦 Dein Inventar')
      .setColor('Blue')
      .addFields(
        { name: 'Chips', value: `**${user.chips} Chips**`, inline: true },
        { name: 'Artikel', value: user.inventory.length > 0 ? user.inventory.join(', ') : 'Keine Artikel', inline: true },
      );

    await interaction.reply({ embeds: [embed] });
  },
};