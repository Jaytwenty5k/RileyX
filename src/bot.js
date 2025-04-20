const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config(); // Lädt die Umgebungsvariablen aus der .env-Datei

// Discord-Client initialisieren
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Commands in eine Collection laden
client.commands = new Collection();
const commandPath = './src/commands'; // Ordner, in dem sich die Commands befinden

// Funktion zum rekursiven Laden von Befehlen aus Unterordnern
function loadCommands(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      loadCommands(`${dir}/${file.name}`);
    } else if (file.isFile() && file.name.endsWith('.js')) {
      const command = require(`${dir}/${file.name}`);
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`Befehl "${command.data.name}" geladen.`);
      } else {
        console.warn(`[WARNUNG] Die Datei "${file.name}" fehlt "data" oder "execute".`);
      }
    }
  }
}

// Slash Commands aus dem Ordner `src/commands` laden
loadCommands(commandPath);

// Event: Bot ist bereit
client.once('ready', () => {
  console.log(`Eingeloggt als ${client.user.tag}`);
});

// Event: Interaktionen (Slash Commands) verarbeiten
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return; // Nur Slash Commands behandeln

  const command = client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`Kein Command mit dem Namen "${interaction.commandName}" gefunden.`);
    return;
  }

  try {
    // Befehl ausführen
    await command.execute(interaction);
  } catch (error) {
    console.error(`Fehler beim Ausführen des Befehls "${interaction.commandName}":`, error);
    try {
      await interaction.reply({ content: 'Es gab einen Fehler beim Ausführen dieses Befehls!', ephemeral: true });
    } catch (replyError) {
      console.error('Fehler beim Antworten auf die Interaktion:', replyError);
    }
  }
});

// Bot einloggen
client.login(process.env.TOKEN);