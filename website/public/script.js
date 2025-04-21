fetch('/api/stats')
  .then(response => response.json())
  .then(data => {
    const statsSection = document.createElement('section');
    statsSection.innerHTML = `
      <h2>📊 Bot-Statistiken</h2>
      <p>Server: ${data.servers}</p>
      <p>Benutzer: ${data.users}</p>
      <p>Gesamte Befehle: ${data.commandsRun}</p>
    `;
    document.body.appendChild(statsSection);
  })
  .catch(err => console.error('Fehler beim Abrufen der Statistiken:', err));