const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('work')
    .setDescription('Arbeite, um Geld zu verdienen!'),
  async execute(interaction) {
    const jobs = [
      { name: 'Programmierer', pay: Math.floor(Math.random() * 500) + 100 },
      { name: 'Kassierer', pay: Math.floor(Math.random() * 250) + 50 },
      { name: 'Lieferant', pay: Math.floor(Math.random() * 200) + 30 },
    ];

    const job = jobs[Math.floor(Math.random() * jobs.length)];

    const embed = new EmbedBuilder()
      .setColor(0x00FF00)
      .setTitle('💼 Arbeit abgeschlossen')
      .setDescription(`Du hast als **${job.name}** gearbeitet und **${job.pay} Coins** verdient!`)
      .setFooter({ text: 'Ultimate Bot - Economy', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};