const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bannt einen Benutzer vom Server.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Der Benutzer, der gebannt werden soll.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Grund für den Bann')),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'Kein Grund angegeben';

    const member = interaction.guild.members.cache.get(user.id);
    if (!member) {
      return interaction.reply({ content: 'Dieser Benutzer ist nicht auf dem Server.', ephemeral: true });
    }

    try {
      await member.ban({ reason });

      const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('🚨 Benutzer gebannt')
        .setDescription(`${user.tag} wurde erfolgreich gebannt.`)
        .addFields({ name: 'Grund', value: reason })
        .setFooter({ text: 'Moderation', iconURL: interaction.client.user.displayAvatarURL() });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Fehler: Benutzer konnte nicht gebannt werden.', ephemeral: true });
    }
  },
};