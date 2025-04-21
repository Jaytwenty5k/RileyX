const { SlashCommandBuilder } = require('discord.js');
const workData = require('../workData');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('job')
    .setDescription('Wähle deinen Job aus.')
    .addStringOption(option =>
      option.setName('job')
        .setDescription('Der Job, den du ausführen möchtest.')
        .setRequired(true)
        .addChoices(
          { name: 'Farmer', value: 'farmer' },
          { name: 'Teacher', value: 'teacher' },
          { name: 'Engineer', value: 'engineer' }
        )),
  async execute(interaction) {
    const userId = interaction.user.id;
    const selectedJob = interaction.options.getString('job');
    const jobData = workData.jobs[selectedJob];

    if (!jobData) {
      return interaction.reply({ content: '❌ Dieser Job existiert nicht.', ephemeral: true });
    }

    // Benutzerdaten aktualisieren
    const user = workData.users[userId] || { balance: 0, job: null, level: 1, lastWork: null };
    user.job = selectedJob;
    user.level = 1; // Zurücksetzen der Beförderung
    workData.users[userId] = user;

    await interaction.reply(`✅ Du hast jetzt den Job **${jobData.name}**! Starte mit /work, um Geld zu verdienen.`);
  },
};