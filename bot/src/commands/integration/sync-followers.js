const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sync-followers')
    .setDescription('Synchronisiert deine Social-Media-Follower für Belohnungen.')
    .addStringOption(option =>
      option.setName('platform')
        .setDescription('Die Plattform, die du synchronisieren möchtest (z. B. Twitter, Instagram).')
        .setRequired(true)),
  async execute(interaction) {
    const platform = interaction.options.getString('platform');

    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle('🔗 Social-Media-Integration')
      .setDescription(`Deine Follower auf **${platform}** wurden erfolgreich synchronisiert.`)
      .setFooter({ text: 'Ultimate Bot - Integration', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};