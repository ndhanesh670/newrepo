import { useNavigate } from 'react-router-dom';

/* ── Shared concept page styles ── */
const conceptStyles = `
  .concept-page { min-height: 100vh; padding-top: 64px; background: var(--bg-primary); }

  /* Hero banner */
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

  /* Content area */
  .cp-content { max-width: 900px; margin: 0 auto; padding: 48px 24px 80px; }

  /* Command section */
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

  /* Info grid */
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

  /* Code block */
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

  /* Example label */
  .example-label {
    font-size: 0.78rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.8px; color: var(--text-muted); margin: 20px 0 8px;
    display: flex; align-items: center; gap: 6px;
  }
  .example-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

  /* Use case callout */
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

  /* TOC sidebar-like nav */
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

export default function DML() {
  const navigate = useNavigate();
  const color = 'var(--dml-color)';
  const glow  = 'var(--dml-glow)';

  const commands = [
    {
      num: '01', name: 'INSERT', tagline: 'Add new records to a table',
      definition: 'INSERT INTO is used to insert new rows of data into an existing table. You can specify both the column names and the values to be populated.',
      syntax: `<span class="kw">INSERT INTO</span> <span class="tbl">table_name</span> (<span class="col">column1</span>, <span class="col">column2</span>, ...)\n<span class="kw">VALUES</span> (<span class="val">value1</span>, <span class="val">value2</span>, ...);`,
      examples: [
        {
          label: 'Insert a single row',
          code: `<span class="kw">INSERT INTO</span> <span class="tbl">Students</span> (<span class="col">full_name</span>, <span class="col">email</span>, <span class="col">phone</span>)\n<span class="kw">VALUES</span> (<span class="val">'Jane Doe'</span>, <span class="val">'jane@example.com'</span>, <span class="val">'+1234567890'</span>);`,
        },
        {
          label: 'Insert multiple rows in one query',
          code: `<span class="kw">INSERT INTO</span> <span class="tbl">Students</span> (<span class="col">full_name</span>, <span class="col">email</span>)\n<span class="kw">VALUES</span>\n  (<span class="val">'Alice Smith'</span>, <span class="val">'alice@example.com'</span>),\n  (<span class="val">'Bob Johnson'</span>, <span class="val">'bob@example.com'</span>);`,
        },
      ],
      usecase: 'Used whenever a user registers, a product is added, or an action creates a new entry/record in your database.',
    },
    {
      num: '02', name: 'UPDATE', tagline: 'Modify existing records in a table',
      definition: 'UPDATE is used to modify values in existing rows of a table. Crucially, a WHERE clause should be used to restrict modifications to specific rows, otherwise all rows will be updated.',
      syntax: `<span class="kw">UPDATE</span> <span class="tbl">table_name</span>\n<span class="kw">SET</span> <span class="col">column1</span> = <span class="val">value1</span>, <span class="col">column2</span> = <span class="val">value2</span>, ...\n<span class="kw">WHERE</span> <span class="col">condition</span>;`,
      examples: [
        {
          label: 'Update a student email by ID',
          code: `<span class="kw">UPDATE</span> <span class="tbl">Students</span>\n<span class="kw">SET</span> <span class="col">email</span> = <span class="val">'jane.new@example.com'</span>\n<span class="kw">WHERE</span> <span class="col">student_id</span> = <span class="num">1</span>;`,
        },
        {
          label: 'Update multiple fields at once',
          code: `<span class="kw">UPDATE</span> <span class="tbl">Students</span>\n<span class="kw">SET</span> \n  <span class="col">full_name</span> = <span class="val">'Alice Cooper'</span>,\n  <span class="col">phone</span> = <span class="val">'+9876543210'</span>\n<span class="kw">WHERE</span> <span class="col">email</span> = <span class="val">'alice@example.com'</span>;`,
        },
      ],
      usecase: 'Used when updating user profiles, resetting passwords, changing order statuses, or updating pricing catalogs.',
    },
    {
      num: '03', name: 'DELETE', tagline: 'Remove existing records from a table',
      definition: 'DELETE removes rows from a table. Like UPDATE, a WHERE clause should be used to target specific records. If the WHERE clause is omitted, all records in the table will be deleted.',
      syntax: `<span class="kw">DELETE FROM</span> <span class="tbl">table_name</span>\n<span class="kw">WHERE</span> <span class="col">condition</span>;`,
      examples: [
        {
          label: 'Delete a student by ID',
          code: `<span class="kw">DELETE FROM</span> <span class="tbl">Students</span>\n<span class="kw">WHERE</span> <span class="col">student_id</span> = <span class="num">3</span>;`,
        },
        {
          label: 'Delete students using a pattern match',
          code: `<span class="kw">DELETE FROM</span> <span class="tbl">Students</span>\n<span class="kw">WHERE</span> <span class="col">email</span> <span class="kw">LIKE</span> <span class="val">'%test.com'</span>;\n<span class="cmt">-- Deletes all students with emails ending in test.com</span>`,
        },
      ],
      usecase: 'Used when users close accounts, items are removed from a shopping cart, or expired session tokens are cleared.',
    },
  ];

  return (
    <>
      <style>{conceptStyles}</style>

      <div className="concept-page page-enter">
        {/* Hero */}
        <div className="cp-hero" style={{ background: `linear-gradient(135deg, var(--bg-primary) 0%, ${glow} 100%)` }}>
          <div className="cp-hero-inner">
            <button className="cp-back" onClick={() => navigate('/')}>← Back to Home</button>
            <div className="cp-badge" style={{ background: glow, color }}>
              ✏️ DML — Data Manipulation Language
            </div>
            <h1 className="cp-title">
              Data <span style={{ color }}>Manipulation</span> Language
            </h1>
            <p className="cp-subtitle">
              DML commands manage the actual data records inside your tables — enabling you to insert new records, update existing ones, and delete records as needed.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="cp-content">
          {/* Quick nav */}
          <div className="toc-strip">
            {commands.map(c => (
              <a key={c.name} href={`#dml-${c.name}`} className="toc-link">{c.name}</a>
            ))}
          </div>

          {commands.map((cmd) => (
            <div key={cmd.name} id={`dml-${cmd.name}`} className="cmd-section">
              <div className="cmd-header">
                <div className="cmd-num" style={{ background: color }}>{cmd.num}</div>
                <div>
                  <div className="cmd-name" style={{ color }}>{cmd.name}</div>
                  <div className="cmd-tagline">{cmd.tagline}</div>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-box">
                  <h4>📖 Definition</h4>
                  <p>{cmd.definition}</p>
                </div>
                <div className="info-box">
                  <h4>📐 Syntax</h4>
                  <CodeBlock>{cmd.syntax}</CodeBlock>
                </div>
              </div>

              {cmd.examples.map((ex, i) => (
                <div key={i}>
                  <div className="example-label">💡 Example {i + 1} — {ex.label}</div>
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
            <button className="btn-primary" onClick={() => navigate('/dql')} id="go-dql-btn">
              Next: DQL →
            </button>
            <button className="btn-secondary" onClick={() => navigate('/ddl')}>
              ← DDL
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
