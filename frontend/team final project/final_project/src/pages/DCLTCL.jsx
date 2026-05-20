import { useNavigate } from 'react-router-dom';

const conceptStyles = `
  .concept-page { min-height: 100vh; padding-top: 64px; background: var(--bg-primary); }
  .cp-hero {
    padding: 60px 24px 50px;
    position: relative; overflow: hidden;
    border-bottom: 1px solid var(--border);
  }
  .cp-hero-inner { max-width: 900px; margin: 0 auto; }
  .cp-back {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 16px; border-radius: 10px;
    background: var(--bg-card); border: 1px solid var(--border);
    font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);
    cursor: pointer; transition: all 0.2s;
    margin-bottom: 28px;
  }
  .cp-back:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
  .cp-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 5px 14px; border-radius: 100px;
    font-size: 0.78rem; font-weight: 700; letter-spacing: 0.8px;
    text-transform: uppercase; margin-bottom: 14px;
  }
  .cp-title {
    font-size: clamp(1.9rem, 5vw, 3rem);
    font-weight: 900; letter-spacing: -1px;
    line-height: 1.2; margin-bottom: 14px;
  }
  .cp-subtitle { font-size: 1rem; color: var(--text-secondary); max-width: 600px; line-height: 1.65; }
  .cp-content { max-width: 900px; margin: 0 auto; padding: 48px 24px 80px; }
  .cmd-section { margin-bottom: 60px; }
  .cmd-header {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }
  .cmd-num {
    width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 0.95rem; color: #fff;
  }
  .cmd-name { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.3px; }
  .cmd-tagline { font-size: 0.85rem; color: var(--text-secondary); margin-top: 2px; }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
  .info-box {
    padding: 18px 20px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }
  .info-box h4 {
    font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.8px; color: var(--text-muted); margin-bottom: 8px;
  }
  .info-box p { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; }
  .code-wrap { margin: 16px 0; border-radius: var(--radius-md); overflow: hidden; }
  .code-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 16px;
    background: #161b22;
    border: 1px solid #30363d; border-bottom: none;
    border-radius: var(--radius-md) var(--radius-md) 0 0;
  }
  .code-header .dots { display: flex; gap: 6px; }
  .code-header .dot { width: 12px; height: 12px; border-radius: 50%; }
  .code-header .lang-tag { font-size: 0.74rem; font-family: 'JetBrains Mono', monospace; color: #6e7681; font-weight: 600; }
  .code-body {
    background: #0d1117; border: 1px solid #30363d;
    border-radius: 0 0 var(--radius-md) var(--radius-md);
    padding: 20px 22px; overflow-x: auto;
    font-family: 'JetBrains Mono', monospace; font-size: 0.86rem; line-height: 1.75;
    color: #e6edf3;
  }
  .code-body .kw  { color: #ff7b72; font-weight: 600; }
  .code-body .tbl { color: #ffa657; }
  .code-body .col { color: #79c0ff; }
  .code-body .val { color: #a5d6ff; }
  .code-body .cmt { color: #6e7681; font-style: italic; }
  .code-body .fn  { color: #d2a8ff; }
  .code-body .num { color: #79c0ff; }
  .example-label {
    font-size: 0.78rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.8px; color: var(--text-muted); margin: 20px 0 8px;
    display: flex; align-items: center; gap: 6px;
  }
  .example-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .usecase-box {
    padding: 16px 20px;
    background: linear-gradient(135deg, rgba(108,99,255,0.06), rgba(139,124,246,0.04));
    border: 1px solid rgba(108,99,255,0.2);
    border-radius: var(--radius-md); margin-top: 16px;
  }
  .usecase-box h4 {
    font-size: 0.78rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.8px; color: var(--accent-primary); margin-bottom: 6px;
  }
  .usecase-box p { font-size: 0.86rem; color: var(--text-secondary); line-height: 1.6; }
  .toc-strip {
    display: flex; flex-wrap: wrap; gap: 8px;
    margin-bottom: 40px; padding-bottom: 24px;
    border-bottom: 1px solid var(--border);
  }
  .toc-link {
    padding: 6px 14px; border-radius: 8px;
    background: var(--bg-secondary); border: 1px solid var(--border);
    font-size: 0.82rem; font-weight: 600; color: var(--text-secondary);
    cursor: pointer; text-decoration: none;
    transition: all 0.2s;
  }
  .toc-link:hover { border-color: var(--accent-primary); color: var(--accent-primary); background: var(--accent-glow); }
  @media (max-width: 640px) {
    .info-grid { grid-template-columns: 1fr; }
    .cp-title { font-size: 1.8rem; }
  }
`;

function CodeBlock({ children }) {
  return (
    <div className="code-wrap">
      <div className="code-header">
        <div className="dots">
          <div className="dot" style={{ background: '#ff5f57' }} />
          <div className="dot" style={{ background: '#febc2e' }} />
          <div className="dot" style={{ background: '#28c840' }} />
        </div>
        <span className="lang-tag">SQL</span>
      </div>
      <pre className="code-body" dangerouslySetInnerHTML={{ __html: children }} />
    </div>
  );
}

export default function DCLTCL() {
  const navigate = useNavigate();
  const color = '#8b5cf6'; // Violet for security & transactions
  const glow = 'rgba(139, 92, 246, 0.15)';

  const sections = [
    {
      num: '01', name: 'GRANT (DCL)', tagline: 'Give user access privileges',
      definition: 'GRANT is a Data Control Language (DCL) command used to provide access rights or database privileges to specific users or roles.',
      syntax: `<span class="kw">GRANT</span> privilege_name <span class="kw">ON</span> object_name <span class="kw">TO</span> user_or_role;`,
      examples: [
        {
          label: 'Grant select & insert permissions on Students table',
          code: `<span class="kw">GRANT</span> <span class="kw">SELECT</span>, <span class="kw">INSERT</span> <span class="kw">ON</span> <span class="tbl">Students</span> <span class="kw">TO</span> <span class="val">'teacher_user'@'localhost'</span>;`,
        }
      ],
      usecase: 'Used by DBAs (Database Administrators) to set up access levels for application servers, analytics systems, or business analysts.',
    },
    {
      num: '02', name: 'REVOKE (DCL)', tagline: 'Withdraw user access privileges',
      definition: 'REVOKE removes previously granted access privileges or permissions from database users or roles.',
      syntax: `<span class="kw">REVOKE</span> privilege_name <span class="kw">ON</span> object_name <span class="kw">FROM</span> user_or_role;`,
      examples: [
        {
          label: 'Revoke insert permissions on Students table',
          code: `<span class="kw">REVOKE</span> <span class="kw">INSERT</span> <span class="kw">ON</span> <span class="tbl">Students</span> <span class="kw">FROM</span> <span class="val">'teacher_user'@'localhost'</span>;`,
        }
      ],
      usecase: 'Used to remove permissions when a service account is deprecated, an employee changes roles, or security policies are tightened.',
    },
    {
      num: '03', name: 'COMMIT (TCL)', tagline: 'Save transaction changes permanently',
      definition: 'COMMIT is a Transaction Control Language (TCL) command used to save all changes made during the current transaction permanently to the database.',
      syntax: `<span class="kw">START TRANSACTION</span>;\n<span class="cmt">-- updates/inserts here</span>\n<span class="kw">COMMIT</span>;`,
      examples: [
        {
          label: 'Complete a student fee transfer transaction',
          code: `<span class="kw">START TRANSACTION</span>;\n<span class="kw">UPDATE</span> <span class="tbl">Accounts</span> <span class="kw">SET</span> <span class="col">balance</span> = <span class="col">balance</span> - <span class="num">500</span> <span class="kw">WHERE</span> <span class="col">user_id</span> = <span class="num">101</span>;\n<span class="kw">UPDATE</span> <span class="tbl">Accounts</span> <span class="kw">SET</span> <span class="col">balance</span> = <span class="col">balance</span> + <span class="num">500</span> <span class="kw">WHERE</span> <span class="col">user_id</span> = <span class="num">999</span>;\n<span class="kw">COMMIT</span>; <span class="cmt">-- Saves both updates permanently</span>`,
        }
      ],
      usecase: 'Used to seal multi-step processes like banking transfers, checkout orders, and batch operations safely.',
    },
    {
      num: '04', name: 'ROLLBACK (TCL)', tagline: 'Undo transaction changes',
      definition: 'ROLLBACK restores the database to its state before the transaction began or to a defined checkpoint (Savepoint) if an error occurs.',
      syntax: `<span class="kw">ROLLBACK</span>;`,
      examples: [
        {
          label: 'Rollback changes in case of failure',
          code: `<span class="kw">START TRANSACTION</span>;\n<span class="kw">UPDATE</span> <span class="tbl">Inventory</span> <span class="kw">SET</span> <span class="col">stock</span> = <span class="col">stock</span> - <span class="num">1</span> <span class="kw">WHERE</span> <span class="col">product_id</span> = <span class="num">50</span>;\n<span class="cmt">-- Oh no, connection failed!</span>\n<span class="kw">ROLLBACK</span>; <span class="cmt">-- Reverts the stock change immediately</span>`,
        }
      ],
      usecase: 'Critical for error handling in servers to prevent partial, corrupted, or incomplete database state writes.',
    },
  ];

  return (
    <>
      <style>{conceptStyles}</style>

      <div className="concept-page page-enter">
        <div className="cp-hero" style={{ background: `linear-gradient(135deg, var(--bg-primary) 0%, ${glow} 100%)` }}>
          <div className="cp-hero-inner">
            <button className="cp-back" onClick={() => navigate('/')}>← Back to Home</button>
            <div className="cp-badge" style={{ background: glow, color }}>
              🛡️ DCL & TCL — Control & Security
            </div>
            <h1 className="cp-title">
              DCL & <span style={{ color }}>TCL</span> Concepts
            </h1>
            <p className="cp-subtitle">
              Learn how to manage database access permissions (Data Control) and secure transactions (Transaction Control) for resilient database operations.
            </p>
          </div>
        </div>

        <div className="cp-content">
          <div className="toc-strip">
            {sections.map(c => (
              <a key={c.name} href={`#dcltcl-${c.name.split(' ')[0]}`} className="toc-link">{c.name}</a>
            ))}
          </div>

          {sections.map((cmd) => (
            <div key={cmd.name} id={`dcltcl-${cmd.name.split(' ')[0]}`} className="cmd-section">
              <div className="cmd-header">
                <div className="cmd-num" style={{ background: color }}>{cmd.num}</div>
                <div>
                  <div className="cmd-name" style={{ color }}>{cmd.name}</div>
                  <div className="cmd-tagline">{cmd.tagline}</div>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-box">
                  <h4>📖 Explanation</h4>
                  <p>{cmd.definition}</p>
                </div>
                <div className="info-box">
                  <h4>📐 Syntax</h4>
                  <CodeBlock>{cmd.syntax}</CodeBlock>
                </div>
              </div>

              {cmd.examples.map((ex, i) => (
                <div key={i}>
                  <div className="example-label">💡 Query Example — {ex.label}</div>
                  <CodeBlock>{ex.code}</CodeBlock>
                </div>
              ))}

              <div className="usecase-box">
                <h4>🌍 Real-World Use Case</h4>
                <p>{cmd.usecase}</p>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
            <button className="btn-primary" onClick={() => navigate('/indexes-views')} id="go-views-btn">
              Next: Indexes & Views →
            </button>
            <button className="btn-secondary" onClick={() => navigate('/')}>← Home</button>
          </div>
        </div>
      </div>
    </>
  );
}
