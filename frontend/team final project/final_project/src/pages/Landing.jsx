import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('sqlapp_current_user') || 'null');
  const firstName = user?.fullName?.split(' ')[0] || 'Learner';

  const cards = [
    {
      id: 'ddl',
      label: 'DDL',
      title: 'Data Definition Language',
      icon: '🏗️',
      color: 'var(--ddl-color)',
      glow: 'var(--ddl-glow)',
      desc: 'Commands that define and modify the structure of database objects like tables, schemas, and indexes.',
      commands: ['CREATE', 'ALTER', 'DROP', 'TRUNCATE', 'RENAME'],
      path: '/ddl',
    },
    {
      id: 'dml',
      label: 'DML',
      title: 'Data Manipulation Language',
      icon: '✏️',
      color: 'var(--dml-color)',
      glow: 'var(--dml-glow)',
      desc: 'Commands used to insert, update, and delete data stored within database tables.',
      commands: ['INSERT', 'UPDATE', 'DELETE'],
      path: '/dml',
    },
    {
      id: 'dql',
      label: 'DQL',
      title: 'Data Query Language',
      icon: '🔍',
      color: 'var(--dql-color)',
      glow: 'var(--dql-glow)',
      desc: 'Commands dedicated to querying and retrieving data from a database using powerful filters.',
      commands: ['SELECT', 'WHERE', 'ORDER BY', 'GROUP BY', 'HAVING'],
      path: '/dql',
    },
    {
      id: 'normalization',
      label: 'Normalization',
      title: 'Database Normalization',
      icon: '📈',
      color: '#ec4899',
      glow: 'rgba(236, 72, 153, 0.15)',
      desc: 'The process of structuring a database schema to reduce data redundancy and eliminate anomalies.',
      commands: ['1NF', '2NF', '3NF', 'BCNF'],
      path: '/normalization',
    },
    {
      id: 'joins',
      label: 'Joins',
      title: 'Multi-Table Joins',
      icon: '🔗',
      color: '#10b981',
      glow: 'rgba(16, 185, 129, 0.15)',
      desc: 'Combine rows from two or more tables based on a related column, creating unified viewpoints.',
      commands: ['INNER', 'LEFT', 'RIGHT', 'FULL OUTER'],
      path: '/joins',
    },
    {
      id: 'subqueries',
      label: 'Subqueries & CTEs',
      title: 'Advanced Query Structures',
      icon: '💾',
      color: '#3b82f6',
      glow: 'rgba(59, 130, 246, 0.15)',
      desc: 'Master nested select queries and readable, reusable Common Table Expressions (WITH clause).',
      commands: ['SUBQUERY', 'CTE', 'WITH'],
      path: '/subqueries',
    },
    {
      id: 'dcltcl',
      label: 'DCL & TCL',
      title: 'Database Control & Transactions',
      icon: '🛡️',
      color: '#8b5cf6',
      glow: 'rgba(139, 92, 246, 0.15)',
      desc: 'Control database access permissions (GRANT, REVOKE) and safeguard updates using transactions.',
      commands: ['GRANT', 'REVOKE', 'COMMIT', 'ROLLBACK'],
      path: '/dcltcl',
    },
    {
      id: 'indexes-views',
      label: 'Indexes & Views',
      title: 'Virtual Tables & Speed Tuning',
      icon: '⚡',
      color: '#14b8a6',
      glow: 'rgba(20, 184, 166, 0.15)',
      desc: 'Optimize data retrieval times using Indexes, and build simplified database perspectives using Views.',
      commands: ['CREATE INDEX', 'CREATE VIEW', 'DROP INDEX'],
      path: '/indexes-views',
    },
    {
      id: 'aggregate',
      label: 'Aggregates',
      title: 'Summary Mathematics',
      icon: '📊',
      color: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.15)',
      desc: 'Execute mathematical summaries on datasets including counting records, sum totals, averages, and ranges.',
      commands: ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX'],
      path: '/aggregate',
    },
  ];

  return (
    <>
      <style>{`
        .landing { min-height: 100vh; padding-top: 64px; display: flex; flex-direction: column; }

        /* ── Hero ── */
        .hero {
          position: relative; overflow: hidden;
          padding: 90px 24px 70px;
          text-align: center;
          background: var(--bg-primary);
        }
        .hero-blob {
          position: absolute; border-radius: 50%;
          filter: blur(90px); pointer-events: none; z-index: 0;
        }
        .hblob1 { width: 600px; height: 600px; background: rgba(108,99,255,0.08); top: -200px; left: 50%; transform: translateX(-50%); }
        .hblob2 { width: 300px; height: 300px; background: rgba(245,158,11,0.06); bottom: -100px; left: 5%; }
        .hblob3 { width: 280px; height: 280px; background: rgba(59,130,246,0.06); top: 20px; right: 5%; }
        .hero-inner { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; }
        .hero-tag {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px;
          background: var(--accent-glow);
          border: 1px solid rgba(108,99,255,0.25);
          border-radius: 100px;
          font-size: 0.8rem; font-weight: 600;
          color: var(--accent-primary);
          margin-bottom: 24px;
          animation: pageEnter 0.5s ease forwards;
        }
        .hero-title {
          font-size: clamp(2.4rem, 6vw, 3.8rem);
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -1.5px;
          margin-bottom: 20px;
          animation: pageEnter 0.5s 0.1s ease both;
        }
        .hero-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 560px;
          margin: 0 auto 36px;
          line-height: 1.7;
          animation: pageEnter 0.5s 0.2s ease both;
        }
        .hero-greeting {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 0.92rem;
          color: var(--text-secondary);
          margin-bottom: 36px;
          animation: pageEnter 0.5s 0.15s ease both;
        }
        .hero-greeting .name { color: var(--text-primary); font-weight: 700; }
        .hero-greeting .wave { font-size: 1.2rem; animation: wave 1.5s ease infinite; transform-origin: 70% 70%; }
        @keyframes wave { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(20deg); } 75% { transform: rotate(-10deg); } }
        .hero-cta { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; animation: pageEnter 0.5s 0.3s ease both; }
        .hero-stats {
          display: flex; align-items: center; justify-content: center;
          gap: 32px; margin-top: 56px;
          animation: pageEnter 0.5s 0.4s ease both;
        }
        .hero-stat { text-align: center; }
        .hero-stat .val { font-size: 2rem; font-weight: 800; letter-spacing: -1px; }
        .hero-stat .lbl { font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600; }
        .hero-stat-divider { width: 1px; height: 40px; background: var(--border); }

        /* ── Cards Section ── */
        .cards-section {
          padding: 70px 24px 80px;
          background: var(--bg-secondary);
          flex: 1;
        }
        .cards-header { text-align: center; margin-bottom: 52px; }
        .cards-header h2 { font-size: 2rem; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 10px; }
        .cards-header p { font-size: 0.95rem; color: var(--text-secondary); }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          max-width: 1060px;
          margin: 0 auto;
        }
        .concept-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 32px 28px;
          display: flex; flex-direction: column;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          cursor: pointer;
          position: relative; overflow: hidden;
        }
        .concept-card::before {
          content: ''; position: absolute;
          inset: 0; opacity: 0;
          transition: opacity 0.35s ease;
          border-radius: var(--radius-xl);
        }
        .concept-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); }
        .card-icon-wrap {
          width: 64px; height: 64px;
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem; margin-bottom: 22px;
          transition: transform 0.3s ease;
        }
        .concept-card:hover .card-icon-wrap { transform: scale(1.1) rotate(-5deg); }
        .card-badge {
          display: inline-flex; align-items: center;
          padding: 3px 10px; border-radius: 100px;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          margin-bottom: 10px;
          width: fit-content;
        }
        .card-title { font-size: 1.2rem; font-weight: 800; margin-bottom: 10px; letter-spacing: -0.3px; }
        .card-desc { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.65; margin-bottom: 22px; flex: 1; }
        .card-commands { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px; }
        .cmd-pill {
          padding: 4px 10px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.74rem;
          color: var(--text-secondary);
          font-weight: 500;
          transition: all 0.2s;
        }
        .concept-card:hover .cmd-pill { border-color: currentColor; }
        .learn-btn {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 18px;
          border-radius: var(--radius-md);
          border: none;
          font-size: 0.9rem; font-weight: 700;
          transition: all 0.25s ease;
          letter-spacing: 0.2px;
        }
        .learn-btn .arrow { transition: transform 0.25s ease; font-size: 1.1rem; }
        .concept-card:hover .learn-btn .arrow { transform: translateX(5px); }

        /* ── Features strip ── */
        .features-strip {
          background: var(--bg-primary);
          border-top: 1px solid var(--border);
          padding: 48px 24px;
        }
        .features-inner {
          max-width: 1060px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 28px;
        }
        .feature-item { display: flex; align-items: flex-start; gap: 14px; }
        .feat-icon {
          width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
          background: var(--bg-card); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
        }
        .feat-title { font-size: 0.92rem; font-weight: 700; margin-bottom: 4px; }
        .feat-desc { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; }

        @media (max-width: 640px) {
          .hero-stats { gap: 20px; }
          .hero-stat .val { font-size: 1.6rem; }
          .cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <main className="landing">
        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-blob hblob1" />
          <div className="hero-blob hblob2" />
          <div className="hero-blob hblob3" />
          <div className="hero-inner">
            <div className="hero-tag">🎓 SQL Learning Platform</div>

            <div className="hero-greeting">
              <span className="wave">👋</span>
              Welcome back, <span className="name">{firstName}</span>!
            </div>

            <h1 className="hero-title">
              Master <span className="gradient-text">SQL Concepts</span><br />
              From Scratch
            </h1>

            <p className="hero-subtitle">
              Learn DDL, DML, and DQL with clear explanations, real-world examples,
              and interactive code snippets — all in one place.
            </p>

            <div className="hero-cta">
              <button className="btn-primary" onClick={() => navigate('/ddl')} id="start-learning-btn">
                🚀 Start Learning
              </button>
              <button className="btn-secondary" onClick={() => navigate('/dql')}>
                Explore Queries →
              </button>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="val gradient-text">9</div>
                <div className="lbl">Core Modules</div>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <div className="val gradient-text">30+</div>
                <div className="lbl">SQL Commands</div>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <div className="val gradient-text">60+</div>
                <div className="lbl">Examples</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cards ── */}
        <section className="cards-section">
          <div className="cards-header">
            <h2>Choose a <span className="gradient-text">Concept</span></h2>
            <p>Pick a category below and dive deep into SQL fundamentals</p>
          </div>

          <div className="cards-grid">
            {cards.map((card, i) => (
              <div
                key={card.id}
                className="concept-card"
                onClick={() => navigate(card.path)}
                id={`card-${card.id}`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  borderColor: 'var(--border)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = card.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div
                  className="card-icon-wrap"
                  style={{ background: card.glow, border: `1px solid ${card.color}30` }}
                >
                  {card.icon}
                </div>

                <div
                  className="card-badge"
                  style={{ background: card.glow, color: card.color }}
                >
                  {card.label}
                </div>

                <h3 className="card-title">{card.title}</h3>
                <p className="card-desc">{card.desc}</p>

                <div className="card-commands">
                  {card.commands.map(cmd => (
                    <span key={cmd} className="cmd-pill" style={{ color: card.color }}>{cmd}</span>
                  ))}
                </div>

                <button
                  className="learn-btn"
                  style={{ background: card.glow, color: card.color }}
                  id={`learn-${card.id}-btn`}
                >
                  Learn More <span className="arrow">→</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features strip ── */}
        <section className="features-strip">
          <div className="features-inner">
            {[
              { icon: '📖', title: 'Clear Definitions', desc: 'Every concept explained in plain English with precise technical definitions.' },
              { icon: '💻', title: 'Code Examples', desc: 'Real SQL queries with syntax highlighting and step-by-step breakdowns.' },
              { icon: '🌍', title: 'Real-World Use Cases', desc: 'Understand when and why to use each command in production scenarios.' },
              { icon: '📱', title: 'Fully Responsive', desc: 'Learn comfortably on any device — desktop, tablet, or mobile.' },
            ].map(f => (
              <div className="feature-item" key={f.title}>
                <div className="feat-icon">{f.icon}</div>
                <div>
                  <div className="feat-title">{f.title}</div>
                  <div className="feat-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
