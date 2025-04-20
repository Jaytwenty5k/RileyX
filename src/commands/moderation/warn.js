const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Gibt einem Benutzer eine Verwarnung.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Der Benutzer, der verwarnt werden soll.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Grund für die Verwarnung.')
        .setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    const embed = new EmbedBuilder()
      .setColor(0xFFFF00)
      .setTitle('⚠️ Benutzer verwarnt')
      .setDescription(`${user.tag} wurde verwarnt.`)
      .addFields({ name: 'Grund', value: reason })
      .setFooter({ text: 'Moderation', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });

    // Optional: Log die Verwarnung in einem Kanal oder einer Datenbank
    console.log(`Warnung: ${user.tag} - Grund: ${reason}`);
  },
};