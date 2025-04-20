const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Spielt einen Song in deinem Sprachkanal.')
    .addStringOption(option =>
      option.setName('song')
        .setDescription('Der Name oder die URL des Songs, den du abspielen möchtest.')
        .setRequired(true)),
  async execute(interaction) {
    const song = interaction.options.getString('song');
    
    // Temporäre Logik (Integration mit einem Musikplayer erforderlich)
    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle('🎵 Song wird abgespielt')
      .setDescription(`Der Song **${song}** wird jetzt abgespielt.`)
      .setFooter({ text: 'Ultimate Bot - Musik', iconURL: interaction.client.user.displayAvatarURL() });

    await interaction.reply({ embeds: [embed] });
  },
};