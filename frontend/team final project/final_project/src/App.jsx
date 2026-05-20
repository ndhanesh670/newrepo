import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import DDL from './pages/DDL';
import DML from './pages/DML';
import DQL from './pages/DQL';
import Normalization from './pages/Normalization';
import Joins from './pages/Joins';
import Subqueries from './pages/Subqueries';
import DCLTCL from './pages/DCLTCL';
import IndexesViews from './pages/IndexesViews';
import Aggregate from './pages/Aggregate';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sqlapp_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sqlapp_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Core App Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Landing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ddl"
              element={
                <ProtectedRoute>
                  <DDL />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dml"
              element={
                <ProtectedRoute>
                  <DML />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dql"
              element={
                <ProtectedRoute>
                  <DQL />
                </ProtectedRoute>
              }
            />
            <Route
              path="/normalization"
              element={
                <ProtectedRoute>
                  <Normalization />
                </ProtectedRoute>
              }
            />
            <Route
              path="/joins"
              element={
                <ProtectedRoute>
                  <Joins />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subqueries"
              element={
                <ProtectedRoute>
                  <Subqueries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dcltcl"
              element={
                <ProtectedRoute>
                  <DCLTCL />
                </ProtectedRoute>
              }
            />
            <Route
              path="/indexes-views"
              element={
                <ProtectedRoute>
                  <IndexesViews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/aggregate"
              element={
                <ProtectedRoute>
                  <Aggregate />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
