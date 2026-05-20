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

export default function DDL() {
  const navigate = useNavigate();
  const color = 'var(--ddl-color)';
  const glow  = 'var(--ddl-glow)';

  const commands = [
    {
      num: '01', name: 'CREATE', tagline: 'Define new database objects',
      definition: 'CREATE is used to create a new database object such as a table, view, index, or database itself. It establishes the schema structure before data can be inserted.',
      syntax: `<span class="kw">CREATE TABLE</span> <span class="tbl">table_name</span> (\n  <span class="col">column1</span> datatype [constraints],\n  <span class="col">column2</span> datatype [constraints],\n  ...\n);`,
      examples: [
        {
          label: 'Create a Students table',
          code: `<span class="kw">CREATE TABLE</span> <span class="tbl">Students</span> (\n  <span class="col">student_id</span>   <span class="fn">INT</span> <span class="kw">PRIMARY KEY AUTO_INCREMENT</span>,\n  <span class="col">full_name</span>    <span class="fn">VARCHAR</span>(<span class="num">100</span>) <span class="kw">NOT NULL</span>,\n  <span class="col">email</span>        <span class="fn">VARCHAR</span>(<span class="num">150</span>) <span class="kw">UNIQUE NOT NULL</span>,\n  <span class="col">date_of_birth</span><span class="fn">DATE</span>,\n  <span class="col">enrolled_at</span>  <span class="fn">TIMESTAMP</span> <span class="kw">DEFAULT</span> <span class="fn">CURRENT_TIMESTAMP</span>\n);`,
        },
        {
          label: 'Create a database',
          code: `<span class="kw">CREATE DATABASE</span> <span class="tbl">SchoolDB</span>;\n<span class="kw">USE</span> <span class="tbl">SchoolDB</span>; <span class="cmt">-- Switch to the new database</span>`,
        },
      ],
      usecase: 'Used during the initial setup of any application — creating tables for users, products, orders, logs, etc. Every project begins with CREATE statements.',
    },
    {
      num: '02', name: 'ALTER', tagline: 'Modify existing table structure',
      definition: 'ALTER TABLE allows you to add, delete, or modify columns and constraints in an existing table without recreating it or losing data.',
      syntax: `<span class="kw">ALTER TABLE</span> <span class="tbl">table_name</span>\n  <span class="kw">ADD</span> <span class="col">column_name</span> datatype [constraints];\n\n<span class="kw">ALTER TABLE</span> <span class="tbl">table_name</span>\n  <span class="kw">MODIFY COLUMN</span> <span class="col">column_name</span> new_datatype;\n\n<span class="kw">ALTER TABLE</span> <span class="tbl">table_name</span>\n  <span class="kw">DROP COLUMN</span> <span class="col">column_name</span>;`,
      examples: [
        {
          label: 'Add a phone number column',
          code: `<span class="kw">ALTER TABLE</span> <span class="tbl">Students</span>\n  <span class="kw">ADD COLUMN</span> <span class="col">phone</span> <span class="fn">VARCHAR</span>(<span class="num">20</span>);`,
        },
        {
          label: 'Modify column datatype',
          code: `<span class="kw">ALTER TABLE</span> <span class="tbl">Students</span>\n  <span class="kw">MODIFY COLUMN</span> <span class="col">full_name</span> <span class="fn">VARCHAR</span>(<span class="num">200</span>) <span class="kw">NOT NULL</span>;`,
        },
        {
          label: 'Drop an unused column',
          code: `<span class="kw">ALTER TABLE</span> <span class="tbl">Students</span>\n  <span class="kw">DROP COLUMN</span> <span class="col">date_of_birth</span>; <span class="cmt">-- Removes the column permanently</span>`,
        },
      ],
      usecase: 'Used when database requirements evolve — adding new fields for new features, changing data types for better performance, or removing deprecated columns.',
    },
    {
      num: '03', name: 'DROP', tagline: 'Permanently delete database objects',
      definition: 'DROP removes an entire database object (table, view, index, or database) along with all its data, structure, and associated indexes permanently. This action cannot be undone.',
      syntax: `<span class="kw">DROP TABLE</span> <span class="tbl">table_name</span>;\n<span class="kw">DROP DATABASE</span> <span class="tbl">database_name</span>;\n<span class="kw">DROP INDEX</span> index_name <span class="kw">ON</span> <span class="tbl">table_name</span>;`,
      examples: [
        {
          label: 'Drop a table safely',
          code: `<span class="kw">DROP TABLE IF EXISTS</span> <span class="tbl">OldRecords</span>;\n<span class="cmt">-- IF EXISTS prevents an error if the table doesn't exist</span>`,
        },
        {
          label: 'Drop an entire database',
          code: `<span class="kw">DROP DATABASE</span> <span class="tbl">TestDB</span>;\n<span class="cmt">-- ⚠ All tables and data inside TestDB are permanently deleted</span>`,
        },
      ],
      usecase: 'Used during cleanup of unused tables, removing test databases, or decommissioning old application components. Always verify before executing — there is no undo.',
    },
    {
      num: '04', name: 'TRUNCATE', tagline: 'Remove all rows, keep structure',
      definition: 'TRUNCATE deletes all records from a table instantly but preserves the table structure, constraints, and indexes. It is faster than DELETE as it does not log individual row deletions.',
      syntax: `<span class="kw">TRUNCATE TABLE</span> <span class="tbl">table_name</span>;`,
      examples: [
        {
          label: 'Clear all student records',
          code: `<span class="kw">TRUNCATE TABLE</span> <span class="tbl">Students</span>;\n<span class="cmt">-- Table structure remains; all rows are gone</span>\n<span class="cmt">-- AUTO_INCREMENT counter also resets to 1</span>`,
        },
      ],
      usecase: 'Used to reset tables between test runs, clear staging data, or wipe logs/sessions tables in development environments. Much faster than DELETE for large datasets.',
    },
    {
      num: '05', name: 'RENAME', tagline: 'Rename database objects',
      definition: 'RENAME TABLE changes the name of an existing table. In some databases this is done via ALTER TABLE … RENAME TO. All references to the old name must be updated after renaming.',
      syntax: `<span class="kw">RENAME TABLE</span> <span class="tbl">old_name</span> <span class="kw">TO</span> <span class="tbl">new_name</span>;\n\n<span class="cmt">-- Alternative (standard SQL):</span>\n<span class="kw">ALTER TABLE</span> <span class="tbl">old_name</span> <span class="kw">RENAME TO</span> <span class="tbl">new_name</span>;`,
      examples: [
        {
          label: 'Rename a table',
          code: `<span class="kw">RENAME TABLE</span> <span class="tbl">Students</span> <span class="kw">TO</span> <span class="tbl">Learners</span>;\n<span class="cmt">-- All queries referencing "Students" must now use "Learners"</span>`,
        },
        {
          label: 'Rename multiple tables at once (MySQL)',
          code: `<span class="kw">RENAME TABLE</span>\n  <span class="tbl">Orders</span>   <span class="kw">TO</span> <span class="tbl">PurchaseOrders</span>,\n  <span class="tbl">Products</span> <span class="kw">TO</span> <span class="tbl">Inventory</span>;`,
        },
      ],
      usecase: 'Used during application refactoring, database normalization, or when naming conventions change across a project.',
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
              🏗️ DDL — Data Definition Language
            </div>
            <h1 className="cp-title">
              Data <span style={{ color }}>Definition</span> Language
            </h1>
            <p className="cp-subtitle">
              DDL commands shape the skeleton of your database — defining tables, modifying structures,
              and managing the schema that holds all your data.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="cp-content">
          {/* Quick nav */}
          <div className="toc-strip">
            {commands.map(c => (
              <a key={c.name} href={`#ddl-${c.name}`} className="toc-link">{c.name}</a>
            ))}
          </div>

          {commands.map((cmd) => (
            <div key={cmd.name} id={`ddl-${cmd.name}`} className="cmd-section">
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
            <button className="btn-primary" onClick={() => navigate('/dml')} id="go-dml-btn">
              Next: DML →
            </button>
            <button className="btn-secondary" onClick={() => navigate('/')}>← Home</button>
          </div>
        </div>
      </div>
    </>
  );
}
