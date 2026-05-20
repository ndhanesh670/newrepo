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

export default function Joins() {
  const navigate = useNavigate();
  const color = '#10b981'; // Green for joins
  const glow = 'rgba(16, 185, 129, 0.15)';

  const joinsList = [
    {
      num: '01', name: 'INNER JOIN', tagline: 'Returns matched records only',
      definition: 'INNER JOIN retrieves records that have matching values in both tables. If a row in the left table does not have a corresponding match in the right table, it is excluded.',
      syntax: `<span class="kw">SELECT</span> <span class="col">columns</span>\n<span class="kw">FROM</span> <span class="tbl">table_a</span>\n<span class="kw">INNER JOIN</span> <span class="tbl">table_b</span> <span class="kw">ON</span> <span class="tbl">table_a</span>.<span class="col">key</span> = <span class="tbl">table_b</span>.<span class="col">key</span>;`,
      examples: [
        {
          label: 'Get students with their courses',
          code: `<span class="kw">SELECT</span> <span class="tbl">s</span>.<span class="col">full_name</span>, <span class="tbl">e</span>.<span class="col">course_name</span>\n<span class="kw">FROM</span> <span class="tbl">Students</span> <span class="tbl">s</span>\n<span class="kw">INNER JOIN</span> <span class="tbl">Enrollments</span> <span class="tbl">e</span> <span class="kw">ON</span> <span class="tbl">s</span>.<span class="col">student_id</span> = <span class="tbl">e</span>.<span class="col">student_id</span>;`,
        }
      ],
      usecase: 'Used when you want to view related data where references are complete (e.g. Orders matching to active Customers).',
    },
    {
      num: '02', name: 'LEFT JOIN', tagline: 'All left table records, matching right records',
      definition: 'LEFT JOIN (or LEFT OUTER JOIN) returns all records from the left table, and the matched records from the right table. Columns from the right table contain NULL if there is no match.',
      syntax: `<span class="kw">SELECT</span> <span class="col">columns</span>\n<span class="kw">FROM</span> <span class="tbl">table_a</span>\n<span class="kw">LEFT JOIN</span> <span class="tbl">table_b</span> <span class="kw">ON</span> <span class="tbl">table_a</span>.<span class="col">key</span> = <span class="tbl">table_b</span>.<span class="col">key</span>;`,
      examples: [
        {
          label: 'Find all students and any courses they might be enrolled in',
          code: `<span class="kw">SELECT</span> <span class="tbl">s</span>.<span class="col">full_name</span>, <span class="tbl">e</span>.<span class="col">course_name</span>\n<span class="kw">FROM</span> <span class="tbl">Students</span> <span class="tbl">s</span>\n<span class="kw">LEFT JOIN</span> <span class="tbl">Enrollments</span> <span class="tbl">e</span> <span class="kw">ON</span> <span class="tbl">s</span>.<span class="col">student_id</span> = <span class="tbl">e</span>.<span class="col">student_id</span>;`,
        }
      ],
      usecase: 'Used to identify items with zero associations (e.g., finding customers who have not placed any orders yet, by filtering `WHERE order_id IS NULL`).',
    },
    {
      num: '03', name: 'RIGHT JOIN', tagline: 'All right table records, matching left records',
      definition: 'RIGHT JOIN (or RIGHT OUTER JOIN) returns all records from the right table, and the matched records from the left table. Left table columns contain NULLs where no match is found.',
      syntax: `<span class="kw">SELECT</span> <span class="col">columns</span>\n<span class="kw">FROM</span> <span class="tbl">table_a</span>\n<span class="kw">RIGHT JOIN</span> <span class="tbl">table_b</span> <span class="kw">ON</span> <span class="tbl">table_a</span>.<span class="col">key</span> = <span class="tbl">table_b</span>.<span class="col">key</span>;`,
      examples: [
        {
          label: 'Get all courses and students enrolled in them',
          code: `<span class="kw">SELECT</span> <span class="tbl">s</span>.<span class="col">full_name</span>, <span class="tbl">e</span>.<span class="col">course_name</span>\n<span class="kw">FROM</span> <span class="tbl">Students</span> <span class="tbl">s</span>\n<span class="kw">RIGHT JOIN</span> <span class="tbl">Enrollments</span> <span class="tbl">e</span> <span class="kw">ON</span> <span class="tbl">s</span>.<span class="col">student_id</span> = <span class="tbl">e</span>.<span class="col">student_id</span>;`,
        }
      ],
      usecase: 'Less common than LEFT JOIN as tables can be reversed, but useful for keeping table flow logical when referencing lookup directories.',
    },
    {
      num: '04', name: 'FULL OUTER JOIN', tagline: 'Returns all records when match exists on either side',
      definition: 'FULL OUTER JOIN returns all rows from both tables, joining matches where possible and presenting NULLs where matches do not exist on one side.',
      syntax: `<span class="kw">SELECT</span> <span class="col">columns</span>\n<span class="kw">FROM</span> <span class="tbl">table_a</span>\n<span class="kw">FULL OUTER JOIN</span> <span class="tbl">table_b</span> <span class="kw">ON</span> <span class="tbl">table_a</span>.<span class="col">key</span> = <span class="tbl">table_b</span>.<span class="col">key</span>;`,
      examples: [
        {
          label: 'Merge students and course enrollments completely',
          code: `<span class="kw">SELECT</span> <span class="tbl">s</span>.<span class="col">full_name</span>, <span class="tbl">e</span>.<span class="col">course_name</span>\n<span class="kw">FROM</span> <span class="tbl">Students</span> <span class="tbl">s</span>\n<span class="kw">FULL OUTER JOIN</span> <span class="tbl">Enrollments</span> <span class="tbl">e</span> <span class="kw">ON</span> <span class="tbl">s</span>.<span class="col">student_id</span> = <span class="tbl">e</span>.<span class="col">student_id</span>;`,
        }
      ],
      usecase: 'Used for complete audits or data synchronizations where unmatched items from both directories need to be identified.',
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
              🔗 SQL Joins — Multi-Table Queries
            </div>
            <h1 className="cp-title">
              SQL <span style={{ color }}>Joins</span>
            </h1>
            <p className="cp-subtitle">
              Joins are essential query structures used to combine columns from one or more tables based on a related column between them.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="cp-content">
          <div className="toc-strip">
            {joinsList.map(c => (
              <a key={c.name} href={`#joins-${c.name.split(' ')[0]}`} className="toc-link">{c.name}</a>
            ))}
          </div>

          {joinsList.map((cmd) => (
            <div key={cmd.name} id={`joins-${cmd.name.split(' ')[0]}`} className="cmd-section">
              <div className="cmd-header">
                <div className="cmd-num" style={{ background: color }}>{cmd.num}</div>
                <div>
                  <div className="cmd-name" style={{ color }}>{cmd.name}</div>
                  <div className="cmd-tagline">{cmd.tagline}</div>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-box">
                  <h4>📖 Join Explanation</h4>
                  <p>{cmd.definition}</p>
                </div>
                <div className="info-box">
                  <h4>📐 Join Syntax</h4>
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
            <button className="btn-primary" onClick={() => navigate('/subqueries')} id="go-subqueries-btn">
              Next: Subqueries & CTEs →
            </button>
            <button className="btn-secondary" onClick={() => navigate('/')}>← Home</button>
          </div>
        </div>
      </div>
    </>
  );
}
