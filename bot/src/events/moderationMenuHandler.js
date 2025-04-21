module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'moderation_menu') {
      const selected = interaction.values[0];

      if (selected === 'kick') {
        await interaction.update({ content: 'Bitte nutze `/kick`, um einen Benutzer zu kicken.', components: [] });
      } else if (selected === 'ban') {
        await interaction.update({ content: 'Bitte nutze `/ban`, um einen Benutzer zu bannen.', components: [] });
      } else if (selected === 'warn') {
        await interaction.update({ content: 'Bitte nutze `/warn`, um einen Benutzer zu warnen.', components: [] });
      }
    }
  },
};