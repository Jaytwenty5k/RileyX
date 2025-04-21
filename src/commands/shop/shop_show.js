const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const shopData = require('../../shopData');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shop_show')
    .setDescription('Zeigt alle verfügbaren Artikel im Shop an.'),
  async execute(interaction) {
    const items = Object.entries(shopData.items);

    if (items.length === 0) {
      return interaction.reply('❌ Der Shop ist derzeit leer.');
    }

    const embed = new EmbedBuilder()
      .setTitle('🛒 Shop')
      .setColor('Green');

    items.forEach(([name, data]) => {
      embed.addFields({ name, value: `Preis: **${data.price} Chips**`, inline: true });
    });

    await interaction.reply({ embeds: [embed] });
  },
};