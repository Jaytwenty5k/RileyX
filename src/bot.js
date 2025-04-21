// Importiere benötigte Module
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config(); // Lädt Umgebungsvariablen aus der .env-Datei

// Initialisiere den Discord-Client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Erstelle eine Collection für die Commands
client.commands = new Collection();

// Funktion, um alle Befehle aus dem Verzeichnis src/commands zu laden (inkl. Unterordner)
function loadCommands(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      // Wenn es ein Ordner ist, rufe die Funktion rekursiv auf
      loadCommands(`${dir}/${file.name}`);
    } else if (file.isFile() && file.name.endsWith('.js')) {
      // Wenn es eine .js-Datei ist, lade den Command
      const command = require(`${dir}/${file.name}`);
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`Befehl "${command.data.name}" wurde geladen.`);
      } else {
        console.warn(`[WARNUNG] Die Datei "${file.name}" fehlt "data" oder "execute".`);
      }
    }
  }
}

// Lade alle Commands aus src/commands
loadCommands('./src/commands');

// Event: Der Bot ist bereit
client.once('ready', () => {
  console.log(`✅ Der Bot ist eingeloggt als ${client.user.tag}`);
});

// Event: Interaktionen (Slash Commands) verarbeiten
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return; // Nur Slash Commands behandeln

  const command = client.commands.get(interaction.commandName); // Hole den entsprechenden Command
  if (!command) {
    console.error(`❌ Kein Befehl mit dem Namen "${interaction.commandName}" gefunden.`);
    return;
  }

  try {
    // Führe den Command aus
    await command.execute(interaction);
  } catch (error) {
    console.error(`❌ Fehler beim Ausführen des Befehls "${interaction.commandName}":`, error);
    try {
      await interaction.reply({
        content: 'Es gab einen Fehler beim Ausführen dieses Befehls.',
        ephemeral: true,
      });
    } catch (replyError) {
      console.error('❌ Fehler beim Senden der Fehlermeldung:', replyError);
    }
  }
});

// Starte den Bot
client.login(process.env.TOKEN);