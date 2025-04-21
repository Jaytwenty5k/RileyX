const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('connect-roblox')
    .setDescription('Verbindet deinen Discord-Account mit deinem Roblox-Benutzer.')
    .addStringOption(option =>
      option.setName('username')
        .setDescription('Dein Roblox-Benutzername.')
        .setRequired(true)),
  async execute(interaction) {
    const username = interaction.options.getString('username');

    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle('🤝 Roblox-Integration')
      .setDescription(`Dein Discord-Account wurde erfolgreich mit dem Roblox-Benutzer **${username}** verbunden.`)
      .setFooter({ text: 'Ultimate Bot - Integration', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};