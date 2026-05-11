import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./Auth";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [favs, setFavs] = useState({});

  useEffect(() => {
    if (currentUser) {
      const stored = localStorage.getItem(`bw_favs_${currentUser.id}`);
      setFavs(stored ? JSON.parse(stored) : {});
    } else {
      setFavs({});
    }
  }, [currentUser]);

  const toggleFav = (anime) => {
    if (!currentUser) return false;
    
    setFavs((prev) => {
      const newFavs = { ...prev };
      if (newFavs[anime.mal_id]) {
        delete newFavs[anime.mal_id];
      } else {
        newFavs[anime.mal_id] = anime;
      }
      localStorage.setItem(`bw_favs_${currentUser.id}`, JSON.stringify(newFavs));
      return newFavs;
    });
    return true;
  };

  const isFav = (id) => !!favs[id];

  return (
    <FavouritesContext.Provider value={{ favs, toggleFav, isFav }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
