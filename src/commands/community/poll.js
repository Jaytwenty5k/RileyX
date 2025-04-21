const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Erstelle eine Umfrage.')
    .addStringOption(option =>
      option.setName('frage')
        .setDescription('Die Frage für die Umfrage.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('optionen')
        .setDescription('Die Optionen, getrennt durch ein Komma (max. 5 Optionen).')
        .setRequired(true)),
  async execute(interaction) {
    const question = interaction.options.getString('frage');
    const options = interaction.options.getString('optionen').split(',').map(opt => opt.trim());

    if (options.length > 5) {
      return interaction.reply({ content: '❌ Du kannst maximal 5 Optionen angeben!', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('📊 Neue Umfrage!')
      .setDescription(`**${question}**\n\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}`)
      .setFooter({ text: `Erstellt von: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

    const pollMessage = await interaction.reply({ embeds: [embed], fetchReply: true });

    // Emoji-Reaktionen für die Optionen hinzufügen
    const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];
    for (let i = 0; i < options.length; i++) {
      await pollMessage.react(emojis[i]);
    }
  },
};