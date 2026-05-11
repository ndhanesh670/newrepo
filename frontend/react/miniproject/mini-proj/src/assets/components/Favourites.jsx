import React from "react";
import { useFavourites } from "./FavouritesContext";
import { useTheme } from "./Theme";
import { useAuth } from "./Auth";
import { Link } from "react-router-dom";
import AnimeCard from "./AnimeCard";

const Favourites = () => {
  const { favs } = useFavourites();
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const isDark = theme === "dark";

  const favList = Object.values(favs);

  if (!currentUser) {
    return (
      <div className={`min-h-screen pt-32 px-6 flex flex-col items-center text-center ${isDark ? "bg-zinc-950 text-white" : "bg-gray-50 text-gray-900"}`}>
        <h2 className="text-3xl font-black mb-4">You must be logged in</h2>
        <p className={`mb-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Log in to view your favourite animes.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-32 px-6 md:px-12 pb-12 transition-colors duration-500 ${isDark ? "bg-zinc-950 text-white" : "bg-gray-50 text-gray-900"}`}>
      <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-3xl font-black mb-8">
        Your <span className="text-cyan-400 neon-text">Favourites</span>
      </h2>

      {favList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 fade-in-up">
          <div className="text-6xl mb-4">💔</div>
          <h3 className="text-xl font-bold mb-2">No favourites yet</h3>
          <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            Start adding some animes to your favourites!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {favList.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
