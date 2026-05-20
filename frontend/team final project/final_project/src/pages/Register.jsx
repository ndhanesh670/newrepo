import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    else if (form.fullName.trim().length < 3) e.fullName = 'Name must be at least 3 characters.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    if (!form.confirm) e.confirm = 'Please confirm your password.';
    else if (form.password !== form.confirm) e.confirm = 'Passwords do not match.';
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
      if (users.find(u => u.email === form.email)) {
        setErrors({ email: 'An account with this email already exists.' });
        setLoading(false);
        return;
      }
      const newUser = { fullName: form.fullName.trim(), email: form.email.trim(), password: form.password };
      localStorage.setItem('sqlapp_users', JSON.stringify([...users, newUser]));
      setLoading(false);
      navigate('/login', { state: { registered: true } });
    }, 800);
  };

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#eab308', '#10b981', '#6c63ff'][strength];

  return (
    <>
      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 20px 40px;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
        }
        .auth-bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .blob1 { width: 500px; height: 500px; background: rgba(108,99,255,0.08); top: -100px; right: -100px; }
        .blob2 { width: 400px; height: 400px; background: rgba(139,124,246,0.06); bottom: -80px; left: -80px; }
        .auth-card {
          position: relative; z-index: 1;
          width: 100%; max-width: 460px;
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
          background: linear-gradient(135deg, var(--accent-primary), #8b7cf6);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          margin: 0 auto 16px;
          box-shadow: 0 8px 24px var(--accent-glow);
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
        .strength-bar { display: flex; gap: 4px; margin-top: 8px; }
        .strength-seg {
          height: 4px; flex: 1; border-radius: 2px;
          background: var(--border); transition: background 0.3s;
        }
        .strength-label { font-size: 0.75rem; margin-top: 4px; font-weight: 600; }
        .auth-submit {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: #fff; border: none; border-radius: var(--radius-md);
          font-size: 1rem; font-weight: 700; letter-spacing: 0.3px;
          transition: var(--transition);
          box-shadow: 0 4px 16px var(--accent-glow);
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: 4px;
        }
        .auth-submit:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 8px 24px var(--accent-glow); }
        .auth-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .spinner {
          width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .auth-footer { text-align: center; margin-top: 24px; font-size: 0.88rem; color: var(--text-secondary); }
        .auth-footer a { color: var(--accent-primary); font-weight: 600; text-decoration: none; }
        .auth-footer a:hover { text-decoration: underline; }
        @media (max-width: 520px) {
          .auth-card { padding: 32px 24px; }
          .auth-title { font-size: 1.4rem; }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-bg-blob blob1" />
        <div className="auth-bg-blob blob2" />

        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">📝</div>
            <h1 className="auth-title gradient-text">Create Account</h1>
            <p className="auth-sub">Join and start learning SQL today</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">Full Name</label>
              <input
                id="reg-name"
                className="form-input"
                type="text"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange('fullName')}
                autoComplete="name"
              />
              {errors.fullName && <p className="form-error">⚠ {errors.fullName}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Email Address</label>
              <input
                id="reg-email"
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
              <label className="form-label" htmlFor="reg-pwd">Password</label>
              <div className="pwd-wrap">
                <input
                  id="reg-pwd"
                  className="form-input"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange('password')}
                  autoComplete="new-password"
                  style={{ paddingRight: '44px' }}
                />
                <button type="button" className="pwd-toggle" onClick={() => setShowPwd(s => !s)}>
                  {showPwd ? '🙈' : '👁'}
                </button>
              </div>
              {form.password && (
                <>
                  <div className="strength-bar">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="strength-seg"
                        style={{ background: i <= strength ? strengthColor : undefined }} />
                    ))}
                  </div>
                  <p className="strength-label" style={{ color: strengthColor }}>{strengthLabel}</p>
                </>
              )}
              {errors.password && <p className="form-error">⚠ {errors.password}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
              <input
                id="reg-confirm"
                className="form-input"
                type={showPwd ? 'text' : 'password'}
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={handleChange('confirm')}
                autoComplete="new-password"
              />
              {errors.confirm && <p className="form-error">⚠ {errors.confirm}</p>}
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? <><div className="spinner" /> Creating account…</> : '🚀 Register'}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
