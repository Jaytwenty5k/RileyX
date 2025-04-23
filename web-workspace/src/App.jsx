import { useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "StartIT Clone";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-lime-400">StartIT</span>
          <span className="text-xs bg-lime-700 text-white rounded-full px-2 py-0.5">Nightly</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#docs" className="hover:text-lime-400">Documentation</a>
          <a href="#plus" className="hover:text-lime-400">StartIT Plus</a>
          <a href="#discord" className="hover:text-lime-400">Join our Discord</a>
          <button className="bg-lime-400 text-black hover:bg-lime-500 px-4 py-1 rounded-full">Log in</button>
        </nav>
      </header>

      <main className="text-center pt-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-lime-900/20 inline-block px-4 py-1 rounded-full text-lime-300 text-sm mb-4">
            ✨ New: StartIT with AI integration!
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-lime-400 underline decoration-lime-400">All-in-one</span> solution for your server
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            More than 300 thousand servers of all sizes use StartIT to increase users activity and defend spam. Try it too!
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-lime-400 text-black hover:bg-lime-500 px-6 py-2 text-lg rounded-xl shadow-lg">Add to server</button>
            <button className="bg-white/10 hover:bg-white/20 px-6 py-2 text-lg rounded-xl shadow">Learn more</button>
          </div>
        </motion.div>

        <section className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Automations", icon: "🔧" },
            { label: "Economy", icon: "💰" },
            { label: "Moderation", icon: "🛡️" },
            { label: "Leveling system", icon: "🏆" },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 p-6 rounded-2xl shadow-xl"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-white font-semibold">{item.label}</div>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
