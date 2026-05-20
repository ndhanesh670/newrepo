export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          padding: 40px 24px 24px;
          margin-top: auto;
        }
        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 32px;
        }
        .footer-brand .logo-wrap {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 12px;
        }
        .footer-brand .logo-icon {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, var(--accent-primary), #8b7cf6);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.78rem; font-weight: 700; color: #fff;
        }
        .footer-brand .brand-name {
          font-weight: 800; font-size: 1rem;
          color: var(--text-primary);
        }
        .footer-brand p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .footer-col h4 {
          font-size: 0.82rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.8px;
          color: var(--text-muted);
          margin-bottom: 14px;
        }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .footer-col ul li a {
          font-size: 0.88rem;
          color: var(--text-secondary);
          transition: color 0.2s;
          text-decoration: none;
        }
        .footer-col ul li a:hover { color: var(--accent-primary); }
        .footer-bottom {
          max-width: 1100px;
          margin: 28px auto 0;
          padding-top: 20px;
          border-top: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .footer-bottom .tag {
          background: var(--accent-glow);
          color: var(--accent-primary);
          padding: 3px 10px;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.78rem;
        }
        @media (max-width: 768px) {
          .footer-inner { grid-template-columns: 1fr; gap: 24px; }
          .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo-wrap">
              <div className="logo-icon">SQL</div>
              <span className="brand-name">SQLConcepts</span>
            </div>
            <p>A comprehensive guide to mastering SQL fundamentals — DDL, DML, and DQL explained with clarity.</p>
          </div>
          <div className="footer-col">
            <h4>Concepts</h4>
            <ul>
              <li><a href="/ddl">DDL — Data Definition</a></li>
              <li><a href="/dml">DML — Data Manipulation</a></li>
              <li><a href="/dql">DQL — Data Query</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SQLConcepts. All rights reserved.</span>
          <span className="tag">Built with React + Vite</span>
        </div>
      </footer>
    </>
  );
}
