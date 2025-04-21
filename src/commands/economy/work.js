const { SlashCommandBuilder } = require('discord.js');
const workData = require('../workData');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('work')
    .setDescription('Arbeite und verdiene Geld.'),
  async execute(interaction) {
    const userId = interaction.user.id;
    const user = workData.users[userId];

    if (!user || !user.job) {
      return interaction.reply({ content: '❌ Du hast keinen Job. Wähle einen Job mit /job.', ephemeral: true });
    }

    const jobData = workData.jobs[user.job];
    const currentTime = Date.now();

    // Überprüfen, ob der Benutzer innerhalb der letzten 3 Stunden gearbeitet hat
    if (user.lastWork && currentTime - user.lastWork < 3 * 60 * 60 * 1000) {
      const timeRemaining = Math.ceil((3 * 60 * 60 * 1000 - (currentTime - user.lastWork)) / (60 * 1000));
      return interaction.reply({ content: `❌ Du kannst erst in **${timeRemaining} Minuten** wieder arbeiten.`, ephemeral: true });
    }

    // Gehalt berechnen
    const baseSalary = jobData.baseSalary;
    const promotionMultiplier = Math.pow(jobData.promotionMultiplier, user.level - 1);
    const earnings = Math.floor(baseSalary * promotionMultiplier);

    // Benutzerinformationen aktualisieren
    user.balance = (user.balance || 0) + earnings;
    user.lastWork = currentTime;

    // Beförderung prüfen (alle 5 Mal arbeiten -> Levelaufstieg)
    user.workCount = (user.workCount || 0) + 1;
    if (user.workCount >= 5) {
      user.level += 1;
      user.workCount = 0; // Zurücksetzen der Zähler
      await interaction.reply(`🎉 Beförderung! Du bist jetzt Level **${user.level}** in deinem Job als **${jobData.name}**!`);
    } else {
      await interaction.reply(`✅ Du hast **${earnings} Chips** verdient! Dein aktueller Kontostand: **${user.balance} Chips**.`);
    }

    workData.users[userId] = user;
  },
};