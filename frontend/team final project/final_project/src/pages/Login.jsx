import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (location.state?.registered) {
      setToast('✅ Account created! Please sign in.');
      const t = setTimeout(() => setToast(''), 4000);
      return () => clearTimeout(t);
    }
  }, [location.state]);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.password) e.password = 'Password is required.';
    return e;
  };

  const handleChange = (k) => (ev) => {
    setForm(prev => ({ ...prev, [k]: ev.target.value }));
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: '' }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('sqlapp_users') || '[]');
      const found = users.find(u => u.email === form.email && u.password === form.password);
      if (!found) {
        setErrors({ password: 'Invalid email or password.' });
        setLoading(false);
        return;
      }
      localStorage.setItem('sqlapp_current_user', JSON.stringify(found));
      setLoading(false);
      navigate('/');
    }, 800);
  };

  return (
    <>
      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 100px 20px 40px;
          background: var(--bg-primary);
          position: relative; overflow: hidden;
        }
        .auth-bg-blob { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }
        .blob1 { width: 500px; height: 500px; background: rgba(59,130,246,0.07); top: -100px; left: -100px; }
        .blob2 { width: 400px; height: 400px; background: rgba(108,99,255,0.07); bottom: -80px; right: -80px; }
        .auth-card {
          position: relative; z-index: 1;
          width: 100%; max-width: 420px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 44px 40px;
          box-shadow: var(--shadow-lg);
          animation: pageEnter 0.4s ease forwards;
        }
        .auth-header { text-align: center; margin-bottom: 32px; }
        .auth-icon {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, #3b82f6, #6c63ff);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; margin: 0 auto 16px;
          box-shadow: 0 8px 24px rgba(59,130,246,0.3);
        }
        .auth-title { font-size: 1.6rem; font-weight: 800; margin-bottom: 6px; }
        .auth-sub { font-size: 0.88rem; color: var(--text-secondary); }
        .auth-form { display: flex; flex-direction: column; gap: 18px; }
        .form-group { display: flex; flex-direction: column; }
        .pwd-wrap { position: relative; }
        .pwd-toggle {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: var(--text-muted);
          font-size: 1rem; padding: 4px; cursor: pointer; transition: color 0.2s;
        }
        .pwd-toggle:hover { color: var(--accent-primary); }
        .auth-submit {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #3b82f6, var(--accent-primary));
          color: #fff; border: none; border-radius: var(--radius-md);
          font-size: 1rem; font-weight: 700; letter-spacing: 0.3px;
          transition: var(--transition);
          box-shadow: 0 4px 16px rgba(59,130,246,0.3);
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: 4px;
        }
        .auth-submit:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.1); }
        .auth-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .auth-footer { text-align: center; margin-top: 24px; font-size: 0.88rem; color: var(--text-secondary); }
        .auth-footer a { color: var(--accent-primary); font-weight: 600; text-decoration: none; }
        .auth-footer a:hover { text-decoration: underline; }
        .toast {
          position: fixed; top: 80px; left: 50%; transform: translateX(-50%);
          background: var(--bg-card); border: 1px solid #10b981;
          color: #10b981; padding: 12px 24px; border-radius: 100px;
          font-size: 0.88rem; font-weight: 600;
          box-shadow: 0 4px 20px rgba(16,185,129,0.25);
          z-index: 9999;
          animation: toastIn 0.3s ease forwards;
        }
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(-10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @media (max-width: 520px) {
          .auth-card { padding: 32px 24px; }
          .auth-title { font-size: 1.4rem; }
        }
      `}</style>

      {toast && <div className="toast">{toast}</div>}

      <div className="auth-page">
        <div className="auth-bg-blob blob1" />
        <div className="auth-bg-blob blob2" />

        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">🔐</div>
            <h1 className="auth-title gradient-text">Welcome Back</h1>
            <p className="auth-sub">Sign in to continue learning SQL</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                className="form-input"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange('email')}
                autoComplete="email"
              />
              {errors.email && <p className="form-error">⚠ {errors.email}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-pwd">Password</label>
              <div className="pwd-wrap">
                <input
                  id="login-pwd"
                  className="form-input"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Your password"
                  value={form.password}
                  onChange={handleChange('password')}
                  autoComplete="current-password"
                  style={{ paddingRight: '44px' }}
                />
                <button type="button" className="pwd-toggle" onClick={() => setShowPwd(s => !s)}>
                  {showPwd ? '🙈' : '👁'}
                </button>
              </div>
              {errors.password && <p className="form-error">⚠ {errors.password}</p>}
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? <><div className="spinner" /> Signing in…</> : '🔑 Login'}
            </button>
          </form>

          <p className="auth-footer">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </>
  );
}
