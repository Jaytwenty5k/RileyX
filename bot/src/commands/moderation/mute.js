const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Stummt einen Benutzer auf dem Server.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Der Benutzer, der stummgeschaltet werden soll.')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('duration')
        .setDescription('Dauer der Stummschaltung in Minuten.')
        .setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const duration = interaction.options.getInteger('duration');

    const member = interaction.guild.members.cache.get(user.id);
    if (!member) {
      return interaction.reply({ content: 'Dieser Benutzer ist nicht auf dem Server.', ephemeral: true });
    }

    try {
      await member.timeout(duration * 60 * 1000); // Dauer in Millisekunden

      const embed = new EmbedBuilder()
        .setColor(0xFFA500)
        .setTitle('🔇 Benutzer stummgeschaltet')
        .setDescription(`${user.tag} wurde für ${duration} Minuten stummgeschaltet.`)
        .setFooter({ text: 'Moderation', iconURL: interaction.client.user.displayAvatarURL() });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Fehler: Benutzer konnte nicht stummgeschaltet werden.', ephemeral: true });
    }
  },
};