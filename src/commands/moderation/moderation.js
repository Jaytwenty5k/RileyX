const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('moderation')
    .setDescription('Verwalte Moderationsfunktionen mit einem Dropdown-Menü.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0xFF4500)
      .setTitle('🔨 Moderations-Menü')
      .setDescription('Bitte wähle eine Aktion mit dem Dropdown-Menü aus.')
      .setFooter({ text: 'Ultimate Bot - Moderation', iconURL: interaction.client.user.displayAvatarURL() });

    const menu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('moderation_menu')
        .setPlaceholder('Wähle eine Option...')
        .addOptions([
          { label: 'Benutzer kicken', value: 'kick', description: 'Kicke einen Benutzer.' },
          { label: 'Benutzer bannen', value: 'ban', description: 'Banne einen Benutzer.' },
          { label: 'Benutzer warnen', value: 'warn', description: 'Gib einem Benutzer eine Warnung.' },
        ])
    );

    await interaction.reply({ embeds: [embed], components: [menu] });
  },
};