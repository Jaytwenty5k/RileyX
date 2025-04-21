const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Statisches Verzeichnis für HTML, CSS und JS-Dateien
app.use(express.static('public'));

// Beispiel-API-Endpunkt für Bot-Statistiken
app.get('/api/stats', (req, res) => {
  res.json({
    servers: 10,
    users: 500,
    commandsRun: 1200,
  });
});

// Starte den Server
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});