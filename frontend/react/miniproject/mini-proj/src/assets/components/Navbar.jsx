import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./Theme";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <nav className="bg-zinc-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <Link to="/">
          <h1 className="text-2xl font-bold text-cyan-400">AnimeTracker</h1>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-cyan-400 transition">
            Home
          </Link>

          <Link to="/favorites" className="hover:text-cyan-400 transition">
            Favorites
          </Link>

          <input
            type="text"
            placeholder="Search shows..."
            className="bg-zinc-800 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            onClick={toggleTheme}
            className="bg-cyan-500 px-4 py-2 rounded-lg"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
