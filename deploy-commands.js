const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config(); // Lädt die Umgebungsvariablen aus der .env-Datei

// Funktion, um Dateien rekursiv aus einem Verzeichnis einschließlich Unterordnern zu laden
function getCommandFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      // Falls es ein Ordner ist, rekursiv durchsuchen
      files = files.concat(getCommandFiles(`${dir}/${item.name}`));
    } else if (item.isFile() && item.name.endsWith('.js')) {
      // Falls es eine .js-Datei ist, hinzufügen
      files.push(`${dir}/${item.name}`);
    }
  }

  return files;
}

// Array, um die Slash Commands zu sammeln
const commands = [];
// Verzeichnis, in dem die Befehlsdateien gespeichert sind
const commandPath = './src/commands';
// Alle Befehlsdateien rekursiv sammeln
const commandFiles = getCommandFiles(commandPath);

// Befehlsdateien laden und validieren
for (const file of commandFiles) {
  const command = require(file);
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON()); // SlashCommandBuilder in JSON konvertieren
    console.log(`Befehl "${command.data.name}" aus Datei "${file}" hinzugefügt.`);
  } else {
    console.warn(`[WARNUNG] Die Datei "${file}" hat keine "data" oder "execute"-Eigenschaft.`);
  }
}

// REST-Client initialisieren
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Befehle registrieren
(async () => {
  try {
    console.log(`Starte Registrierung von ${commands.length} Befehlen...`);

    if (process.env.GUILD_ID) {
      // Guild-spezifische Registrierung (für Tests auf einem Server)
      const data = await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
      );
      console.log(`Erfolgreich ${data.length} Befehle für Guild ${process.env.GUILD_ID} registriert.`);
    } else {
      // Globale Registrierung (für alle Server, auf denen der Bot hinzugefügt wurde)
      const data = await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands }
      );
      console.log(`Erfolgreich ${data.length} globale Befehle registriert.`);
    }
  } catch (error) {
    console.error('Fehler beim Registrieren der Befehle:', error);
  }
})();