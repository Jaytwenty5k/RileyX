const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
require('dotenv').config(); // Lädt die Umgebungsvariablen aus der .env

// Discord-Client initialisieren
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Commands in einer Collection speichern
client.commands = new Collection();

// Funktion: Befehle rekursiv aus src/commands laden
function loadCommands(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      // Falls es ein Ordner ist, rekursiv laden
      loadCommands(`${dir}/${file.name}`);
    } else if (file.isFile() && file.name.endsWith('.js')) {
      // Falls es eine .js-Datei ist, laden
      const command = require(`${dir}/${file.name}`);
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`✅ Befehl "${command.data.name}" erfolgreich geladen.`);
      } else {
        console.warn(`⚠️ Die Datei "${file.name}" hat keine "data" oder "execute"-Eigenschaft.`);
      }
    }
  }
}

// Lade alle Befehle aus dem Verzeichnis src/commands
loadCommands('./src/commands');

// Event: Bot ist bereit
client.once('ready', () => {
  console.log(`🤖 Bot ist online! Eingeloggt als ${client.user.tag}`);
});

// Event: Interaktionen (Slash Commands) verarbeiten
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand() && !interaction.isSelectMenu() && !interaction.isButton()) return;

  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) {
      console.error(`❌ Kein Befehl für "${interaction.commandName}" gefunden.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`❌ Fehler beim Ausführen des Befehls "${interaction.commandName}":`, error);
      await interaction.reply({
        content: 'Es gab einen Fehler beim Ausführen dieses Befehls!',
        ephemeral: true,
      });
    }
  } else if (interaction.isSelectMenu()) {
    console.log(`📋 Auswahlmenü-Interaktion: ${interaction.customId}`);
    // Hier kannst du zusätzliche Logik für Auswahlmenüs hinzufügen
  } else if (interaction.isButton()) {
    console.log(`🔘 Button-Interaktion: ${interaction.customId}`);
    // Hier kannst du zusätzliche Logik für Buttons hinzufügen
  }
});

// Bot starten
client.login(process.env.TOKEN);