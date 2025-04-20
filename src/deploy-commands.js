const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

// Lade alle Befehle
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// REST-API-Client initialisieren
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// Befehle registrieren
(async () => {
  try {
    console.log('Starte die Registrierung der Slash-Befehle...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log('Slash-Befehle erfolgreich registriert!');
  } catch (error) {
    console.error(error);
  }
})();