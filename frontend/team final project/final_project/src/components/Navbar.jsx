import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem('sqlapp_current_user') || 'null');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sqlapp_current_user');
    navigate('/login');
  };

  const navItems = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'DDL',  path: '/ddl', icon: '🏗️' },
    { label: 'DML',  path: '/dml', icon: '✏️' },
    { label: 'DQL',  path: '/dql', icon: '🔍' },
    { label: 'Normalization', path: '/normalization', icon: '📈' },
    { label: 'Joins', path: '/joins', icon: '🔗' },
    { label: 'Subqueries', path: '/subqueries', icon: '💾' },
    { label: 'DCL & TCL', path: '/dcltcl', icon: '🛡️' },
    { label: 'Indexes & Views', path: '/indexes-views', icon: '⚡' },
    { label: 'Aggregates', path: '/aggregate', icon: '📊' },
  ];

  const activeStyle = {
    color: 'var(--accent-primary)',
    borderBottom: '2px solid var(--accent-primary)',
    paddingBottom: '2px',
  };

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: ${scrolled ? 'var(--bg-secondary)' : 'transparent'};
          border-bottom: ${scrolled ? '1px solid var(--border)' : '1px solid transparent'};
          backdrop-filter: ${scrolled ? 'blur(20px)' : 'none'};
          -webkit-backdrop-filter: ${scrolled ? 'blur(20px)' : 'none'};
          transition: all 0.3s ease;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          font-weight: 800; font-size: 1.15rem;
          letter-spacing: -0.3px;
          color: var(--text-primary);
        }
        .nav-logo span { color: var(--accent-primary); }
        .logo-icon {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, var(--accent-primary), #8b7cf6);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; color: #fff; font-weight: 700;
        }
        .nav-links {
          display: flex; align-items: center; gap: 4px;
        }
        .nav-link {
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 0.9rem; font-weight: 500;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          border-bottom: 2px solid transparent;
          text-decoration: none;
        }
        .nav-link:hover { color: var(--text-primary); background: var(--bg-card); }
        .nav-link.active { color: var(--accent-primary); background: var(--accent-glow); }
        .nav-actions { display: flex; align-items: center; gap: 10px; }
        .theme-btn {
          width: 38px; height: 38px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          transition: all 0.2s ease;
          color: var(--text-primary);
        }
        .theme-btn:hover { border-color: var(--accent-primary); background: var(--accent-glow); }
        .user-chip {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 12px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 0.82rem; font-weight: 600;
          color: var(--text-secondary);
        }
        .avatar {
          width: 26px; height: 26px;
          background: linear-gradient(135deg, var(--accent-primary), #8b7cf6);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.72rem; font-weight: 700; color: #fff;
        }
        .logout-btn {
          padding: 7px 16px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 8px;
          color: #ef4444;
          font-size: 0.85rem; font-weight: 600;
          transition: all 0.2s ease;
        }
        .logout-btn:hover { background: rgba(239,68,68,0.2); border-color: #ef4444; }
        .hamburger {
          display: none;
          flex-direction: column; gap: 5px;
          padding: 8px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
        }
        .hamburger span {
          display: block; width: 20px; height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: translateX(-10px); }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
        .mobile-menu {
          position: fixed;
          top: 64px; left: 0; right: 0;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          padding: 16px 24px 24px;
          display: flex; flex-direction: column; gap: 6px;
          z-index: 999;
          animation: slideDown 0.25s ease forwards;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-nav-link {
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 0.95rem; font-weight: 500;
          color: var(--text-secondary);
          display: flex; align-items: center; gap: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link.active { background: var(--bg-card); color: var(--accent-primary); }
        .mobile-divider { height: 1px; background: var(--border); margin: 8px 0; }
        @media (max-width: 1280px) {
          .nav-links { display: none; }
          .user-chip  { display: none; }
          .logout-btn { display: none; }
          .hamburger  { display: flex; }
        }
      `}</style>

      <nav className="navbar">
        <NavLink to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-icon">SQL</div>
          SQL<span>Concepts</span>
        </NavLink>

        <div className="nav-links">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className="nav-link"
              style={({ isActive }) => isActive ? activeStyle : {}}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <button className="theme-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {user && (
            <>
              <div className="user-chip">
                <div className="avatar">{user.fullName?.[0]?.toUpperCase() || 'U'}</div>
                {user.fullName?.split(' ')[0]}
              </div>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          )}

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className="mobile-nav-link"
              style={({ isActive }) => isActive ? { color: 'var(--accent-primary)', background: 'var(--bg-card)' } : {}}
              onClick={() => setMenuOpen(false)}
            >
              <span>{item.icon}</span> {item.label}
            </NavLink>
          ))}
          <div className="mobile-divider" />
          {user && (
            <button
              className="mobile-nav-link"
              style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }}
              onClick={() => { handleLogout(); setMenuOpen(false); }}
            >
              🚪 Logout ({user.fullName?.split(' ')[0]})
            </button>
          )}
        </div>
      )}
    </>
  );
}
