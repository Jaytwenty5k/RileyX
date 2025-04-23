import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">RileyX Bot</h1>
        <nav>
          <a href="#features" className="mx-4 hover:text-blue-400">Features</a>
          <a href="#contact" className="mx-4 hover:text-blue-400">Kontakt</a>
          <a
            href="/auth/discord"
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
          >
            Login mit Discord
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20">
        <h2 className="text-4xl font-bold">Willkommen zu RileyX!</h2>
        <p className="mt-4 text-lg">
          Der ultimative Discord-Bot für Automatisierung, Roblox-Integration und mehr.
        </p>
        <a
          href="/auth/discord"
          className="mt-6 inline-block bg-blue-500 px-6 py-3 rounded hover:bg-blue-700"
        >
          Jetzt starten
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <h3 className="text-3xl font-bold text-center">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 px-6">
          <div className="bg-gray-700 p-6 rounded">
            <h4 className="text-xl font-semibold">Automoderation</h4>
            <p className="mt-2">
              Automatische Warnungen, Mutes und mehr, um deinen Server sicher zu halten.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded">
            <h4 className="text-xl font-semibold">Roblox-Integration</h4>
            <p className="mt-2">
              Verifiziere Benutzer und verwalte Roblox-Gruppen direkt über Discord.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded">
            <h4 className="text-xl font-semibold">Economy-System</h4>
            <p className="mt-2">
              Virtuelles Geld, Leaderboards und tägliche Belohnungen.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-900 text-center">
        <p>© 2025 RileyX. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
};

export default Home;