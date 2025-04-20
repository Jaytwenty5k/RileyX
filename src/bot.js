require('dotenv').config(); // Lädt Umgebungsvariablen aus .env
const { Client, GatewayIntentBits } = require('discord.js');

// Client-Instanz erstellen
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Event: Bot ist bereit
client.once('ready', () => {
  console.log(`${client.user.tag} ist online und bereit!`);
});

// Event: Nachrichten-Handler
client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignoriere Bots
  if (message.content === '!ping') {
    message.reply('Pong! 🏓');
  }
});

// Bot-Login
client.login(process.env.DISCORD_TOKEN);