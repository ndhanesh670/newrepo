import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "./Theme";
import {
  Star, Tv, Clock, Calendar, ArrowLeft, Play, Award, Users,
} from "lucide-react";

/* ─── Loading Skeleton ───────────────────────────────── */
const DetailsSkeleton = ({ isDark }) => (
  <div
    className={`min-h-screen pt-20 ${isDark ? "bg-zinc-950" : "bg-gray-50"}`}
  >
    {/* blurred hero placeholder */}
    <div className="relative h-64 w-full shimmer bg-zinc-900" />

    <div className="max-w-6xl mx-auto px-6 md:px-12 -mt-20 relative z-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="shimmer w-56 h-80 rounded-2xl bg-zinc-800 shrink-0" />
        <div className="flex-1 pt-24 space-y-4">
          <div className="shimmer h-8 w-2/3 rounded bg-zinc-800" />
          <div className="shimmer h-4 w-1/3 rounded bg-zinc-800" />
          <div className="shimmer h-4 w-full rounded bg-zinc-800" />
          <div className="shimmer h-4 w-5/6 rounded bg-zinc-800" />
        </div>
      </div>
    </div>
  </div>
);

/* ─── Stat Badge ─────────────────────────────────────── */
const StatBadge = ({ icon: Icon, label, value, isDark }) => {
  if (!value) return null;
  return (
    <div
      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-colors ${
        isDark
          ? "bg-white/5 border-white/8 text-white"
          : "bg-white border-gray-200 text-gray-800 shadow-sm"
      }`}
    >
      <Icon size={16} className="text-cyan-400 shrink-0" />
      <div>
        <p className={`text-[10px] font-semibold uppercase tracking-wider mb-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          {label}
        </p>
        <p className="text-sm font-bold leading-none">{value}</p>
      </div>
    </div>
  );
};

/* ─── Details Page ───────────────────────────────────── */
const Details = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [data, setData]           = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const modalRef = useRef(null);

  /* Fetch */
  useEffect(() => {
    window.scrollTo(0, 0);
    setData(null);
    const fetchData = async () => {
      try {
        const res  = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        console.error("Details fetch failed", err);
      }
    };
    fetchData();
  }, [id]);

  /* ESC closes trailer */
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setShowTrailer(false); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!data) return <DetailsSkeleton isDark={isDark} />;

  const genres = data.genres?.map((g) => g.name) || [];
  const studios = data.studios?.map((s) => s.name).join(", ") || "—";

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-zinc-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* ── Cinematic Blurred Banner ── */}
      <div className="relative h-56 md:h-80 overflow-hidden">
        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 hero-bg-enter"
          style={{
            backgroundImage: `url(${data.images.jpg.large_image_url})`,
            filter: "blur(3px) saturate(1.2)",
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div
          className={`absolute inset-0 ${isDark ? "bg-black/40" : "bg-white/30"}`}
        />
      </div>

      {/* ── Main content: overlaps the banner ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 -mt-32 md:-mt-44 relative z-10 pb-20">

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="btn-secondary mb-6 !py-2 !px-4 !text-sm inline-flex"
        >
          <ArrowLeft size={15} />
          Back
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* ── Left: Sticky Poster ── */}
          <div className="shrink-0 md:sticky md:top-24 self-start">
            <div className="relative w-48 md:w-60 group">
              <img
                src={data.images.jpg.large_image_url}
                alt={data.title}
                className={`w-full rounded-2xl object-cover shadow-2xl ring-1 transition-all duration-300 ${
                  isDark ? "ring-white/10 group-hover:ring-cyan-500/50" : "ring-black/10 group-hover:ring-cyan-400/50"
                }`}
                style={{ aspectRatio: "2/3" }}
              />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: "0 0 40px rgba(34,211,238,0.2)" }} />
            </div>

            {/* Score below poster */}
            {data.score && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-1.5 score-badge text-base px-4 py-2">
                  <Star size={16} fill="#fbbf24" />
                  <span className="text-lg font-black">{data.score}</span>
                  <span className={`text-xs font-normal ${isDark ? "text-gray-500" : "text-gray-400"}`}>/10</span>
                </div>
                {data.scored_by && (
                  <p className={`text-xs mt-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
                    {data.scored_by.toLocaleString()} votes
                  </p>
                )}
              </div>
            )}
          </div>

          {/* ── Right: Info Panel ── */}
          <div className="flex-1 min-w-0 fade-in-up pt-2 md:pt-24">

            {/* Genres */}
            {genres.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-3">
                {genres.map((g) => (
                  <span key={g} className="genre-pill">{g}</span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-3xl md:text-5xl font-black leading-tight mb-2"
            >
              {data.title}
            </h1>
            {data.title_english && data.title_english !== data.title && (
              <p className={`text-base mb-4 font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {data.title_english}
              </p>
            )}

            {/* Stat grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 mt-5">
              <StatBadge icon={Tv}       label="Episodes" value={data.episodes ? `${data.episodes} eps` : "Ongoing"}  isDark={isDark} />
              <StatBadge icon={Clock}    label="Duration"  value={data.duration}  isDark={isDark} />
              <StatBadge icon={Calendar} label="Year"      value={data.year}      isDark={isDark} />
              <StatBadge icon={Award}    label="Rank"      value={data.rank ? `#${data.rank}` : null} isDark={isDark} />
              <StatBadge icon={Users}    label="Studio"    value={studios}        isDark={isDark} />
              <StatBadge icon={Star}     label="Status"    value={data.status}    isDark={isDark} />
            </div>

            {/* Synopsis */}
            <div className={`rounded-2xl p-5 mb-6 border ${
              isDark ? "bg-white/4 border-white/8" : "bg-white border-gray-200 shadow-sm"
            }`}>
              <h2 className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}>
                Synopsis
              </h2>
              <p className={`leading-relaxed text-sm md:text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {data.synopsis || "No synopsis available."}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 flex-wrap">
              {data.trailer?.embed_url && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="btn-primary !bg-gradient-to-r !from-red-500 !to-rose-600 hover:!shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                >
                  <Play size={15} fill="currentColor" />
                  Watch Trailer
                </button>
              )}
              <button
                onClick={() => window.history.back()}
                className="btn-secondary"
              >
                <ArrowLeft size={15} />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Trailer Modal ── */}
      {showTrailer && data.trailer?.embed_url && (
        <div
          ref={modalRef}
          onClick={(e) => e.target === modalRef.current && setShowTrailer(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4 fade-in-up"
        >
          <div className="w-full max-w-4xl">
            {/* Close bar */}
            <div className="flex justify-between items-center mb-3 px-1">
              <span className="text-sm text-gray-400 font-medium">
                {data.title} — Trailer
              </span>
              <button
                onClick={() => setShowTrailer(false)}
                className="text-gray-400 hover:text-white text-xs border border-white/15 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-all"
              >
                ESC to close
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <iframe
                src={`${data.trailer.embed_url}?autoplay=1`}
                className="w-full aspect-video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`${data.title} Trailer`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;