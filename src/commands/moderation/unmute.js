const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Hebt die Stummschaltung eines Benutzers auf.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Der Benutzer, dessen Stummschaltung aufgehoben werden soll.')
        .setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const member = interaction.guild.members.cache.get(user.id);

    if (!member || !member.isCommunicationDisabled()) {
      return interaction.reply({ content: `${user.tag} ist nicht stummgeschaltet.`, ephemeral: true });
    }

    try {
      await member.timeout(null); // Stummschaltung aufheben

      const embed = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle('🔊 Benutzer entstummt')
        .setDescription(`${user.tag} wurde erfolgreich entstummt.`)
        .setFooter({ text: 'Moderation', iconURL: interaction.client.user.displayAvatarURL() });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Fehler: Benutzer konnte nicht entstummt werden.', ephemeral: true });
    }
  },
};