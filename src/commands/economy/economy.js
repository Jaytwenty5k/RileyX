const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('economy')
    .setDescription('Verwalte deine Economy-Funktionen mit einem Dropdown-Menü.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle('💰 Economy-Menü')
      .setDescription('Bitte wähle eine Aktion mit dem Dropdown-Menü aus.')
      .setFooter({ text: 'Ultimate Bot - Economy', iconURL: interaction.client.user.displayAvatarURL() });

    const menu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('economy_menu')
        .setPlaceholder('Wähle eine Option...')
        .addOptions([
          { label: 'Balance anzeigen', value: 'balance', description: 'Zeigt deinen aktuellen Kontostand.' },
          { label: 'Geld einzahlen', value: 'deposit', description: 'Zahle Geld auf dein Konto ein.' },
          { label: 'Geld abheben', value: 'withdraw', description: 'Hebe Geld von deinem Konto ab.' },
        ])
    );

    await interaction.reply({ embeds: [embed], components: [menu] });
  },
};