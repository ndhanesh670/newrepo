import React from "react";
import { Link } from "react-router-dom";
import { Play, Star, Heart } from "lucide-react";
import { useFavourites } from "./FavouritesContext";
import { useAuth } from "./Auth";
import { useTheme } from "./Theme";

const AnimeCard = ({ anime }) => {
  const { isFav, toggleFav } = useFavourites();
  const { currentUser, openAuth } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const favorite = isFav(anime.mal_id);

  const handleFav = (e) => {
    e.preventDefault(); // prevent navigation
    if (!currentUser) {
      openAuth();
      return;
    }
    toggleFav(anime);
  };

  return (
    <Link to={`/anime/${anime.mal_id}`} className="block group">
      <div
        className={`card-hover rounded-[14px] overflow-hidden transition-all duration-400 cursor-pointer ${
          isDark ? "bg-zinc-900" : "bg-white shadow-md"
        }`}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-72">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Play size={11} fill="currentColor" />
              View Details
            </span>
          </div>
          
          {/* Heart button */}
          <button 
            onClick={handleFav} 
            className="absolute top-2.5 left-2.5 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md transition-all shadow-lg border border-white/10 group/heart"
          >
            <Heart 
              size={14} 
              className={`transition-all duration-300 ${
                favorite 
                  ? "text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" 
                  : "text-white group-hover/heart:scale-110"
              }`} 
            />
          </button>

          {/* Score badge */}
          {anime.score && (
            <div className="absolute top-2.5 right-2.5 score-badge text-xs z-20">
              <Star size={10} fill="#fbbf24" />
              {anime.score}
            </div>
          )}
          {/* Rank badge */}
          {anime.rank && (
            <div className="absolute top-2.5 left-12 px-2 py-1 rounded-md text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm z-20">
              #{anime.rank}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3.5">
          <h3
            className={`font-bold text-sm leading-snug line-clamp-2 mb-1.5 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            title={anime.title}
          >
            {anime.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {anime.type && (
              <span className="genre-pill">{anime.type}</span>
            )}
            {anime.episodes && (
              <span
                className={`text-[11px] font-medium ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {anime.episodes} eps
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
