const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config(); // Lädt die Umgebungsvariablen aus der .env-Datei

// Funktion: Befehlsdateien rekursiv laden
function loadCommands(dir) {
  const commands = [];
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      // Wenn es ein Unterordner ist, rekursiv aufrufen
      commands.push(...loadCommands(`${dir}/${file.name}`));
    } else if (file.isFile() && file.name.endsWith('.js')) {
      const command = require(`${dir}/${file.name}`);
      if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
        console.log(`✅ Befehl "${command.data.name}" erfolgreich geladen.`);
      } else {
        console.warn(`⚠️ Die Datei "${file.name}" hat keine "data" oder "execute"-Eigenschaft und wurde übersprungen.`);
      }
    }
  }

  return commands;
}

// Befehle aus dem Verzeichnis src/commands laden (inklusive Unterordner)
const commands = loadCommands('./src/commands');

// REST-Client mit dem Bot-Token initialisieren
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Befehle bei Discord registrieren
(async () => {
  try {
    console.log('🔃 Starte die Registrierung der Slash Commands...');

    if (process.env.GUILD_ID) {
      // Guild-spezifische Registrierung (für Tests auf einem bestimmten Server)
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
      );
      console.log(`✅ Erfolgreich ${commands.length} Befehle für Guild ID ${process.env.GUILD_ID} registriert.`);
    } else {
      // Globale Registrierung (für alle Server, auf denen der Bot hinzugefügt wurde)
      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands }
      );
      console.log(`✅ Erfolgreich ${commands.length} globale Befehle registriert.`);
    }
  } catch (error) {
    console.error(`❌ Fehler bei der Registrierung der Befehle:`, error);
  }
})();