const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config(); // Um Umgebungsvariablen wie TOKEN und CLIENT_ID zu laden

const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

// Alle Befehle aus den Dateien im Ordner "commands" laden
for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.warn(`[WARNUNG] Die Datei "${file}" fehlt "data" oder "execute".`);
  }
}

// REST-Client erstellen
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Slash-Befehle bereitstellen
(async () => {
  try {
    console.log(`Starte das Registrieren von ${commands.length} Befehlen...`);

    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log(`Erfolgreich ${data.length} Befehle registriert.`);
  } catch (error) {
    console.error(error);
  }
})();