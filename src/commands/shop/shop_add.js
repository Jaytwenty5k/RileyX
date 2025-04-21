const { SlashCommandBuilder } = require('discord.js');
const shopData = require('../../shopData');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shop_add')
    .setDescription('Fügt einen Artikel in den Shop hinzu.')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('Der Name des Artikels.')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('price')
        .setDescription('Der Preis des Artikels.')
        .setRequired(true)),
  async execute(interaction) {
    const name = interaction.options.getString('name');
    const price = interaction.options.getInteger('price');

    if (shopData.items[name]) {
      return interaction.reply(`❌ Der Artikel **${name}** existiert bereits!`);
    }

    shopData.items[name] = { price };
    await interaction.reply(`✅ Der Artikel **${name}** wurde für **${price} Chips** in den Shop hinzugefügt.`);
  },
};