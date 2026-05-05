import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./Theme";

const ApiData = () => {
  const [data, setData] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const getData = await fetch("https://api.jikan.moe/v4/top/anime");
      const parseData = await getData.json();

      setData(parseData.data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6 min-h-screen">
      {data.map((e) => (
        <Link key={e.mal_id} to={`/anime/${e.mal_id}`}>
          <div
            className={`w-72 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 ${
              theme === "dark"
                ? "bg-zinc-900 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <img
              src={e.images.jpg.image_url}
              alt={e.title}
              className="w-full h-80 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 line-clamp-2">
                {e.title}
              </h2>

              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <p>⭐ {e.score}</p>
                <p>{e.rating}</p>
              </div>

              <p className="text-sm line-clamp-4">
                {e.synopsis}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ApiData;