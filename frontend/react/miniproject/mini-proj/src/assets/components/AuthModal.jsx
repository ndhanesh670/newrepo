import React, { useState, useEffect } from "react";
import { useAuth } from "./Auth";
import { useTheme } from "./Theme";
import { X, Mail, Lock, User, Tv2 } from "lucide-react";

const AuthModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { login, register } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setForm({ username: "", email: "", password: "" });
      setError("");
      setIsLogin(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      const res = login({ email: form.email, password: form.password });
      if (res.ok) onClose();
      else setError(res.error);
    } else {
      const res = register(form);
      if (res.ok) onClose();
      else setError(res.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 fade-in-up">
      {/* Animated gradient background behind modal */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div
        className={`w-full max-w-md p-8 rounded-[24px] relative shadow-2xl border z-10 transition-all duration-300 ${
          isDark ? "bg-zinc-900/90 border-white/10 backdrop-blur-xl" : "bg-white/95 border-gray-200 backdrop-blur-xl"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${
            isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <X size={20} />
        </button>

        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)]">
            <Tv2 size={28} className="text-white" />
          </div>
        </div>

        <h2
          style={{ fontFamily: "'Outfit', sans-serif" }}
          className={`text-3xl font-black mb-2 text-center ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className={`text-sm mb-8 text-center px-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          {isLogin
            ? "Log in to save your favourites and join the discussion."
            : "Sign up to track your favourites and comment on anime."}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl text-sm mb-6 text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative group">
              <User size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-gray-500 group-focus-within:text-cyan-400" : "text-gray-400 group-focus-within:text-cyan-500"}`} />
              <input
                type="text"
                placeholder="Username"
                required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className={`w-full pl-11 pr-4 py-3.5 rounded-xl border outline-none transition-all ${
                  isDark
                    ? "bg-black/50 border-white/10 text-white focus:border-cyan-500 focus:bg-zinc-950"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:border-cyan-400 focus:bg-white"
                }`}
              />
            </div>
          )}

          <div className="relative group">
            <Mail size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-gray-500 group-focus-within:text-cyan-400" : "text-gray-400 group-focus-within:text-cyan-500"}`} />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full pl-11 pr-4 py-3.5 rounded-xl border outline-none transition-all ${
                isDark
                  ? "bg-black/50 border-white/10 text-white focus:border-cyan-500 focus:bg-zinc-950"
                  : "bg-gray-50 border-gray-200 text-gray-900 focus:border-cyan-400 focus:bg-white"
              }`}
            />
          </div>

          <div className="relative group">
            <Lock size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-gray-500 group-focus-within:text-cyan-400" : "text-gray-400 group-focus-within:text-cyan-500"}`} />
            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={`w-full pl-11 pr-4 py-3.5 rounded-xl border outline-none transition-all ${
                isDark
                  ? "bg-black/50 border-white/10 text-white focus:border-cyan-500 focus:bg-zinc-950"
                  : "bg-gray-50 border-gray-200 text-gray-900 focus:border-cyan-400 focus:bg-white"
              }`}
            />
          </div>

          <button type="submit" className="w-full btn-primary justify-center mt-2 !py-3.5 !text-base shadow-[0_4px_14px_0_rgba(34,211,238,0.39)] hover:shadow-[0_6px_20px_rgba(34,211,238,0.23)]">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className={`text-center text-sm mt-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-cyan-400 font-bold hover:underline transition-all"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
