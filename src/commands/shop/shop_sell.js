const { SlashCommandBuilder } = require('discord.js');
const shopData = require('../../shopData');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shop_sell')
    .setDescription('Verkaufe einen Artikel aus deinem Inventar.')
    .addStringOption(option =>
      option.setName('item')
        .setDescription('Der Name des Artikels.')
        .setRequired(true)),
  async execute(interaction) {
    const userId = interaction.user.id;
    const itemName = interaction.options.getString('item');

    const user = shopData.users[userId] || { chips: 100, inventory: [] };

    if (!user.inventory.includes(itemName)) {
      return interaction.reply(`❌ Du besitzt keinen Artikel namens **${itemName}**.`);
    }

    const item = shopData.items[itemName];
    if (!item) {
      return interaction.reply(`❌ Der Artikel **${itemName}** kann nicht verkauft werden, da er nicht mehr im Shop existiert.`);
    }

    const sellPrice = Math.floor(item.price / 2); // Verkaufswert: 50% des Kaufpreises
    user.chips += sellPrice;
    user.inventory = user.inventory.filter(i => i !== itemName);

    await interaction.reply(`✅ Du hast **${itemName}** für **${sellPrice} Chips** verkauft! Dein aktuelles Guthaben: **${user.chips} Chips**.`);
  },
};