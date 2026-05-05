import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "./Theme";

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchdata = async () => {
      const get = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const datas = await get.json();

      setData(datas.data);
    };

    fetchdata();
  }, [id]);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className=" flex gap-8 p-6">
      <img
        src={data.images.jpg.image_url}
        alt={data.title}
        className=" h-auto object-cover w-150 rounded-xl"
      />

      <div
        className={`p-4 rounded-xl ${
          theme === "dark"
            ? "text-white"
            : "text-black"
        }`}
      >
        <h1 className="text-4xl font-bold my-4">{data.title}</h1>

        <p className="mb-2">⭐ Score: {data.score}</p>
        <p className="mb-2">Rating: {data.rating}</p>
        <p className="mb-2">Episodes: {data.episodes}</p>
        <p className="mb-4">Status: {data.status}</p>

        <p className="max-w-3xl">{data.synopsis}</p>
      </div>
    </div>
  );
};

export default Details;