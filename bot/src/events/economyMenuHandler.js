module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'economy_menu') {
      const selected = interaction.values[0];

      if (selected === 'balance') {
        const balanceEmbed = new EmbedBuilder()
          .setColor(0x00FF00)
          .setTitle('💰 Dein Kontostand')
          .setDescription('Du hast aktuell **500 Coins** in deinem Wallet.')
          .setFooter({ text: 'Ultimate Bot - Economy', iconURL: interaction.client.user.displayAvatarURL() });
        await interaction.update({ embeds: [balanceEmbed], components: [] });
      } else if (selected === 'deposit') {
        const depositEmbed = new EmbedBuilder()
          .setColor(0x00FF00)
          .setTitle('🏦 Geld einzahlen')
          .setDescription('Bitte gib den Betrag ein, den du einzahlen möchtest.')
          .setFooter({ text: 'Ultimate Bot - Economy', iconURL: interaction.client.user.displayAvatarURL() });
        await interaction.update({ embeds: [depositEmbed], components: [] });
      } else if (selected === 'withdraw') {
        const withdrawEmbed = new EmbedBuilder()
          .setColor(0x00FF00)
          .setTitle('🏦 Geld abheben')
          .setDescription('Bitte gib den Betrag ein, den du abheben möchtest.')
          .setFooter({ text: 'Ultimate Bot - Economy', iconURL: interaction.client.user.displayAvatarURL() });
        await interaction.update({ embeds: [withdrawEmbed], components: [] });
      }
    }
  },
};