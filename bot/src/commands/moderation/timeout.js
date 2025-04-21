const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Setzt einen Benutzer in einen Timeout.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Der Benutzer, der in den Timeout gesetzt werden soll.')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('duration')
        .setDescription('Dauer des Timeouts in Minuten.')
        .setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const duration = interaction.options.getInteger('duration');
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({ content: 'Dieser Benutzer ist nicht auf dem Server.', ephemeral: true });
    }

    try {
      await member.timeout(duration * 60 * 1000); // Setzt Timeout in Millisekunden

      const embed = new EmbedBuilder()
        .setColor(0xFFA500)
        .setTitle('⏲️ Benutzer in Timeout gesetzt')
        .setDescription(`${user.tag} wurde für ${duration} Minuten in einen Timeout gesetzt.`)
        .setFooter({ text: 'Moderation', iconURL: interaction.client.user.displayAvatarURL() });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Fehler: Timeout konnte nicht gesetzt werden.', ephemeral: true });
    }
  },
};