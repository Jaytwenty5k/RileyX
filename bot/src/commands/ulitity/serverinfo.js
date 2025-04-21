const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Zeigt Informationen über den aktuellen Server an.'),
  async execute(interaction) {
    const { guild } = interaction;

    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle(`📋 Serverinformationen - ${guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: '👑 Server-Besitzer', value: `<@${guild.ownerId}>`, inline: true },
        { name: '🆔 Server-ID', value: guild.id, inline: true },
        { name: '📅 Erstellungsdatum', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: false },
        { name: '👥 Mitgliederanzahl', value: `${guild.memberCount}`, inline: true }
      )
      .setFooter({ text: 'Ultimate Bot - Server Info', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};