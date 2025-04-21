const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Zeigt deinen Kontostand an.'),
  
  async execute(interaction) {
    // Erstelle das Auswahlmenü
    const balanceMenu = new StringSelectMenuBuilder()
      .setCustomId('balance_select')
      .setPlaceholder('Wähle deine Balance aus')
      .addOptions([
        { label: 'Bank', value: 'bank' },
        { label: 'Wallet', value: 'wallet' },
        { label: 'Chips', value: 'chips' },
      ]);

    const row = new ActionRowBuilder().addComponents(balanceMenu);

    // Sende Nachricht mit Auswahlmenü
    await interaction.reply({
      content: 'Wähle aus, welche Balance du sehen möchtest:',
      components: [row],
    });

    // Collector für die Menüinteraktion
    const filter = (i) => i.customId === 'balance_select' && i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async (i) => {
      if (i.values[0] === 'bank') {
        await i.reply('Dein Kontostand in der Bank beträgt: 1000 Dollar.');
      } else if (i.values[0] === 'wallet') {
        await i.reply('Dein Kontostand in dem Wallet beträgt: 500 Dollar.');
      } else if (i.values[0] === 'chips') {
        await i.reply('Dein Kontostand in Chips beträgt: 500 Chips.');
      }
    });

    collector.on('end', () => {
      console.log('Balance-Interaktion beendet.');
    });
  },
};