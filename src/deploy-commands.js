const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config(); // Lädt die .env-Datei mit Token und anderen Umgebungsvariablen

// Ein Array, um die Slash Commands zu speichern
const commands = [];
// Der Pfad zu deinem Ordner mit den Befehlsdateien
const commandPath = './src/commands'; 
// Alle .js-Dateien in deinem Befehlsordner finden
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

// Alle Befehlsdateien einlesen
for (const file of commandFiles) {
  const command = require(`${commandPath}/${file}`);
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON()); // Die Daten des Slash Command Builders in JSON umwandeln
  } else {
    console.warn(`[WARNUNG] Die Datei "${file}" fehlt "data" oder "execute".`);
  }
}

// Discord REST API Client erstellen
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(`Starte das Registrieren von ${commands.length} Befehlen...`);

    // Globale Registrierung von Befehlen
    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log(`Erfolgreich ${data.length} Befehle registriert.`);
  } catch (error) {
    console.error('Fehler beim Registrieren von Befehlen:', error);
  }
})();