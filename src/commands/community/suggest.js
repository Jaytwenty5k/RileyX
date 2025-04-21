const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('Sende einen Vorschlag.')
    .addStringOption(option =>
      option.setName('vorschlag')
        .setDescription('Der Vorschlag, den du senden möchtest.')
        .setRequired(true)),
  async execute(interaction) {
    const suggestion = interaction.options.getString('vorschlag');
    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setTitle('📢 Neuer Vorschlag!')
      .setDescription(suggestion)
      .setFooter({ text: `Eingereicht von: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

    const suggestionChannel = interaction.guild.channels.cache.find(channel => channel.name === 'vorschläge');
    if (!suggestionChannel) {
      return interaction.reply({ content: '❌ Kein Kanal namens `vorschläge` gefunden!', ephemeral: true });
    }

    const message = await suggestionChannel.send({ embeds: [embed] });

    // Reaktionen für Abstimmung hinzufügen
    await message.react('👍'); // Zustimmung
    await message.react('👎'); // Ablehnung

    await interaction.reply({ content: '✅ Dein Vorschlag wurde erfolgreich gesendet!', ephemeral: true });
  },
};