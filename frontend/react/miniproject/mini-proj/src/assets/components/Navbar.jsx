import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./Theme";
import { Sun, Moon, Search, X, Tv2, User, LogOut } from "lucide-react";
import { useSearch } from "./Search";
import { useAuth } from "./Auth";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { search, setSearch } = useSearch();
  const { currentUser, logout, openAuth } = useAuth();
  const isDark = theme === "dark";

  const [scrolled, setScrolled] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-3 flex justify-between items-center transition-all duration-500 ${
        scrolled
          ? isDark
            ? "bg-zinc-950/90 backdrop-blur-xl shadow-lg shadow-black/40 border-b border-white/5"
            : "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      {/* ── Logo ── */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="relative">
          <Tv2
            size={26}
            className="text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.9)] transition-all duration-300"
          />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        </div>
        <span
          style={{ fontFamily: "'Outfit', sans-serif" }}
          className="text-2xl font-black tracking-tight neon-text text-cyan-400"
        >
          BingeWatch
        </span>
      </Link>

      {/* ── Nav Links + Controls ── */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className={`text-sm font-semibold transition-colors duration-200 hidden md:block ${
            isDark ? "text-gray-300 hover:text-cyan-400" : "text-gray-600 hover:text-cyan-500"
          }`}
        >
          Home
        </Link>

        {currentUser && (
          <Link
            to="/favourites"
            className={`text-sm font-semibold transition-colors duration-200 hidden md:block ${
              isDark ? "text-gray-300 hover:text-red-400" : "text-gray-600 hover:text-red-500"
            }`}
          >
            Favourites
          </Link>
        )}

        {/* Search Input */}
        <div
          className={`relative flex items-center rounded-xl transition-all duration-300 ${
            focused ? "ring-1 ring-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.3)]" : ""
          } ${
            isDark ? "bg-white/8" : "bg-gray-100"
          }`}
        >
          <Search
            size={15}
            className={`absolute left-3 transition-colors duration-200 ${
              focused ? "text-cyan-400" : isDark ? "text-gray-500" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search anime..."
            className={`pl-9 pr-8 py-2 text-sm rounded-xl outline-none w-44 md:w-60 bg-transparent font-medium placeholder:font-normal transition-all duration-300 ${
              isDark ? "text-white placeholder:text-gray-500" : "text-gray-800 placeholder:text-gray-400"
            }`}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 text-gray-400 hover:text-red-400 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Auth / Profile */}
        {currentUser ? (
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium hidden md:block ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {currentUser.username}
            </span>
            <button
              onClick={logout}
              title="Logout"
              className={`p-2 rounded-xl transition-all duration-300 hover:bg-red-500/10 text-red-500`}
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={openAuth}
            className="btn-primary !py-1.5 !px-4 !text-sm !gap-1.5"
          >
            <User size={15} />
            Login
          </button>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle theme"
          className={`relative p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
            isDark
              ? "bg-white/8 hover:bg-white/14 text-yellow-300"
              : "bg-gray-100 hover:bg-gray-200 text-slate-700"
          }`}
        >
          <div className="transition-all duration-500">
            {isDark ? (
              <Sun size={17} className="drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]" />
            ) : (
              <Moon size={17} />
            )}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
