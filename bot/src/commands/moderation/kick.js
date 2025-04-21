const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kickt einen Benutzer vom Server.')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Der Benutzer, der gekickt werden soll.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Grund für den Kick')),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'Kein Grund angegeben';

    const member = interaction.guild.members.cache.get(user.id);
    if (!member) {
      return interaction.reply({ content: 'Dieser Benutzer ist nicht auf dem Server.', ephemeral: true });
    }

    try {
      await member.kick(reason);

      const embed = new EmbedBuilder()
        .setColor(0xFF4500)
        .setTitle('🚨 Benutzer gekickt')
        .setDescription(`${user.tag} wurde erfolgreich gekickt.`)
        .addFields({ name: 'Grund', value: reason })
        .setFooter({ text: 'Moderation', iconURL: interaction.client.user.displayAvatarURL() });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Fehler: Benutzer konnte nicht gekickt werden.', ephemeral: true });
    }
  },
};