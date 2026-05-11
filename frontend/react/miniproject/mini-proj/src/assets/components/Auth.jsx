import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

/* ── helpers ── */
const getUsers = () => JSON.parse(localStorage.getItem("bw_users") || "[]");
const saveUsers = (users) => localStorage.setItem("bw_users", JSON.stringify(users));
const getSession = () => JSON.parse(localStorage.getItem("bw_session") || "null");
const saveSession = (user) => localStorage.setItem("bw_session", JSON.stringify(user));
const clearSession = () => localStorage.removeItem("bw_session");

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getSession);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuth = () => setIsAuthModalOpen(true);
  const closeAuth = () => setIsAuthModalOpen(false);

  /* register – returns { ok, error } */
  const register = ({ username, email, password }) => {
    const users = getUsers();
    if (users.find((u) => u.email === email))
      return { ok: false, error: "Email already registered." };
    if (users.find((u) => u.username === username))
      return { ok: false, error: "Username already taken." };
    const user = { id: Date.now().toString(), username, email, password };
    saveUsers([...users, user]);
    const safe = { id: user.id, username: user.username, email: user.email };
    saveSession(safe);
    setCurrentUser(safe);
    return { ok: true };
  };

  /* login – returns { ok, error } */
  const login = ({ email, password }) => {
    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return { ok: false, error: "Invalid email or password." };
    const safe = { id: user.id, username: user.username, email: user.email };
    saveSession(safe);
    setCurrentUser(safe);
    return { ok: true };
  };

  const logout = () => {
    clearSession();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, register, login, logout, 
      isAuthModalOpen, openAuth, closeAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
