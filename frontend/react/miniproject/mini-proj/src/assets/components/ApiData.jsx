import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./Theme";
import { useSearch } from "./Search";
import { ChevronLeft, ChevronRight, Play, Info, Star } from "lucide-react";

/* ─── Skeleton Card ─────────────────────────────────── */
const SkeletonCard = () => (
  <div className="w-full rounded-[14px] overflow-hidden bg-zinc-900 animate-pulse">
    <div className="shimmer h-80 w-full bg-zinc-800" />
    <div className="p-4 space-y-2">
      <div className="shimmer h-4 w-3/4 rounded bg-zinc-700" />
      <div className="shimmer h-3 w-1/2 rounded bg-zinc-800" />
    </div>
  </div>
);

/* ─── Anime Card ─────────────────────────────────────── */
const AnimeCard = ({ anime, isDark }) => (
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
        {/* Score badge */}
        {anime.score && (
          <div className="absolute top-2.5 right-2.5 score-badge text-xs">
            <Star size={10} fill="#fbbf24" />
            {anime.score}
          </div>
        )}
        {/* Rank badge */}
        {anime.rank && (
          <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-md text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
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

/* ─── Hero Carousel ──────────────────────────────────── */
const HeroCarousel = ({ hero }) => {
  const [current, setCurrent] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [animating, setAnimating] = useState(false);
  const autoRef = useRef(null);

  const goTo = useCallback(
    (idx) => {
      if (animating || idx === current) return;
      setAnimating(true);
      setPrevIdx(current);
      setCurrent(idx);
      setTimeout(() => {
        setPrevIdx(null);
        setAnimating(false);
      }, 700);
    },
    [animating, current]
  );

  const next = useCallback(() => goTo((current + 1) % hero.length), [goTo, current, hero.length]);
  const prev = useCallback(() => goTo((current - 1 + hero.length) % hero.length), [goTo, current, hero.length]);

  /* Auto-play */
  const startAuto = useCallback(() => {
    autoRef.current = setInterval(next, 5500);
  }, [next]);

  const stopAuto = useCallback(() => {
    clearInterval(autoRef.current);
  }, []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto]);

  if (!hero.length) return null;

  const featured = hero[current];
  const genres   = featured.genres?.slice(0, 3).map((g) => g.name) || [];

  return (
    <div
      className="relative h-[82vh] min-h-[520px] overflow-hidden group/hero"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      {/* ── Background layers ── */}
      {hero.map((item, idx) => (
        <div
          key={item.mal_id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === current ? "opacity-100 hero-bg-enter" : "opacity-0"
          }`}
          aria-hidden={idx !== current}
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url(${item.images.jpg.large_image_url})` }}
          />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20 z-10" />

      {/* ── Hero Content ── */}
      <div
        key={current}
        className="hero-content-enter relative z-20 flex items-center h-full px-8 md:px-16"
      >
        <div className="max-w-xl space-y-5">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/15 text-cyan-400 border border-cyan-400/25 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              #{featured.rank} on Top Anime
            </span>
          </div>

          {/* Title */}
          <h1
            style={{ fontFamily: "'Outfit', sans-serif" }}
            className="text-4xl md:text-6xl font-black leading-tight text-white drop-shadow-xl"
          >
            {featured.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 flex-wrap">
            {featured.score && (
              <div className="score-badge">
                <Star size={12} fill="#fbbf24" />
                {featured.score}
              </div>
            )}
            {featured.episodes && (
              <span className="text-gray-400 text-sm">{featured.episodes} Episodes</span>
            )}
            {featured.year && (
              <span className="text-gray-400 text-sm">{featured.year}</span>
            )}
          </div>

          {/* Genres */}
          {genres.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {genres.map((g) => (
                <span key={g} className="genre-pill">{g}</span>
              ))}
            </div>
          )}

          {/* Synopsis */}
          <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3 max-w-lg">
            {featured.synopsis?.slice(0, 200)}
            {featured.synopsis?.length > 200 ? "…" : ""}
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-3 pt-1">
            <Link to={`/anime/${featured.mal_id}`} className="btn-primary">
              <Play size={15} fill="currentColor" />
              View Details
            </Link>
            <Link to={`/anime/${featured.mal_id}`} className="btn-secondary">
              <Info size={15} />
              More Info
            </Link>
          </div>
        </div>
      </div>

      {/* ── Arrows (show only on group hover) ── */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full glass text-white
                   opacity-0 group-hover/hero:opacity-100 hover:bg-white/20 hover:scale-110
                   transition-all duration-300 shadow-xl"
      >
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>

      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full glass text-white
                   opacity-0 group-hover/hero:opacity-100 hover:bg-white/20 hover:scale-110
                   transition-all duration-300 shadow-xl"
      >
        <ChevronRight size={22} strokeWidth={2.5} />
      </button>

      {/* ── Dot Indicators ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {hero.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`dot ${idx === current ? "active" : ""} transition-all duration-300`}
          />
        ))}
      </div>

      {/* ── Slide counter ── */}
      <div className="absolute bottom-8 right-8 z-30 text-xs text-gray-500 font-mono">
        {String(current + 1).padStart(2, "0")} / {String(hero.length).padStart(2, "0")}
      </div>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────── */
const ApiData = () => {
  const { theme } = useTheme();
  const { search } = useSearch();
  const isDark = theme === "dark";

  const isSearching = search.trim() !== "";

  /* Hero state */
  const [hero, setHero] = useState([]);

  /* Feed state */
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  /* Intersection Observer sentinel */
  const sentinelRef = useRef(null);
  const loadingRef  = useRef(false); // prevent double calls

  /* ── Fetch Hero ── */
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res  = await fetch("https://api.jikan.moe/v4/top/anime?page=1");
        const json = await res.json();
        setHero((json?.data || []).slice(0, 5));
      } catch (err) {
        console.error("Hero fetch failed", err);
      }
    };
    fetchHero();
  }, []);

  /* ── Fetch Feed Page ── */
  const fetchFeed = useCallback(async (pageNum) => {
    if (loadingRef.current || !hasMore || isSearching) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const res  = await fetch(`https://api.jikan.moe/v4/top/anime?page=${pageNum}`);
      const json = await res.json();
      const newData = json?.data || [];

      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setFeed((prev) => [...prev, ...newData]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Feed fetch failed", err);
    }

    setLoading(false);
    setInitialLoading(false);
    loadingRef.current = false;
  }, [hasMore, isSearching]);

  /* Initial load */
  useEffect(() => {
    fetchFeed(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Intersection Observer for infinite scroll */
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingRef.current && hasMore && !isSearching) {
          fetchFeed(page);
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchFeed, hasMore, isSearching, page]);

  /* ── Filtered list ── */
  const filtered = useMemo(() => {
    if (!search.trim()) return feed;
    return feed.filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [feed, search]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-zinc-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* ── Hero Carousel (hidden while searching) ── */}
      {!isSearching && <HeroCarousel hero={hero} />}

      {/* ── Section Heading ── */}
      <div className={`px-6 md:px-12 pb-4 flex items-center justify-between ${
        isSearching ? "pt-24" : "pt-8"
      }`}>
        <div>
          {isSearching ? (
            <div className="fade-in-up">
              <h2
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="text-2xl font-bold mb-1"
              >
                Search results for{" "}
                <span className="text-cyan-400 neon-text">"{search}"</span>
              </h2>
              <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
              </p>
            </div>
          ) : (
            <h2
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-2xl font-bold"
            >
              Top Anime
              <span className="text-cyan-400 neon-text"> Picks</span>
            </h2>
          )}
        </div>

        {!isSearching && (
          <span className={`text-sm font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            {feed.length} loaded
          </span>
        )}
      </div>

      {/* ── Card Grid ── */}
      <div className="px-6 md:px-12 pb-10">

        {/* Initial skeleton */}
        {initialLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {Array.from({ length: 15 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!initialLoading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28 fade-in-up">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">No results found</h3>
            <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              Try a different search term
            </p>
          </div>
        )}

        {/* Anime grid */}
        {!initialLoading && filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filtered.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} isDark={isDark} />
            ))}
          </div>
        )}

        {/* Sentinel for Intersection Observer */}
        <div ref={sentinelRef} className="h-4" />

        {/* Shimmer loading indicator */}
        {loading && !initialLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={`sk-${i}`} />
            ))}
          </div>
        )}

        {/* End of list */}
        {!hasMore && !isSearching && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-gray-500">
              <span>✦</span> You've seen it all
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiData;