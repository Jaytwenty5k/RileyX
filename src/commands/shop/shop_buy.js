const { SlashCommandBuilder } = require('discord.js');
const shopData = require('../../shopData');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shop_buy')
    .setDescription('Kaufe einen Artikel aus dem Shop.')
    .addStringOption(option =>
      option.setName('item')
        .setDescription('Der Name des Artikels.')
        .setRequired(true)),
  async execute(interaction) {
    const userId = interaction.user.id;
    const itemName = interaction.options.getString('item');

    if (!shopData.items[itemName]) {
      return interaction.reply(`❌ Der Artikel **${itemName}** existiert nicht im Shop.`);
    }

    const item = shopData.items[itemName];
    const user = shopData.users[userId] || { chips: 100, inventory: [] };

    if (user.chips < item.price) {
      return interaction.reply(`❌ Du hast nicht genug Chips, um **${itemName}** zu kaufen. Es kostet **${item.price} Chips**.`);
    }

    user.chips -= item.price;
    user.inventory.push(itemName);
    shopData.users[userId] = user;

    await interaction.reply(`✅ Du hast **${itemName}** für **${item.price} Chips** gekauft! Dein aktuelles Guthaben: **${user.chips} Chips**.`);
  },
};