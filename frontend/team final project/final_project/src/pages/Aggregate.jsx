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
  .code-body .fn  { color: #d2a8ff; font-weight: 600; }
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

export default function Aggregate() {
  const navigate = useNavigate();
  const color = '#f59e0b'; // Amber yellow for aggregation
  const glow = 'rgba(245, 158, 11, 0.15)';

  const sections = [
    {
      num: '01', name: 'COUNT', tagline: 'Count rows or values',
      definition: 'COUNT returns the total number of rows matching query criteria. COUNT(column) ignores NULL values, while COUNT(*) counts all rows.',
      syntax: `<span class="kw">SELECT</span> <span class="fn">COUNT</span>(<span class="col">column_name</span>) <span class="kw">FROM</span> <span class="tbl">table_name</span>;`,
      examples: [
        {
          label: 'Count total students in database',
          code: `<span class="kw">SELECT</span> <span class="fn">COUNT</span>(*) <span class="kw">AS</span> total_students <span class="kw">FROM</span> <span class="tbl">Students</span>;`,
        }
      ],
      usecase: 'Used to display numerical totals on user interfaces (e.g. "Total Orders", "Registered Users").',
    },
    {
      num: '02', name: 'SUM', tagline: 'Calculate totals of numeric columns',
      definition: 'SUM returns the total arithmetic sum of a numeric column. Null values are ignored in the calculation.',
      syntax: `<span class="kw">SELECT</span> <span class="fn">SUM</span>(<span class="col">column_name</span>) <span class="kw">FROM</span> <span class="tbl">table_name</span>;`,
      examples: [
        {
          label: 'Calculate sum of all fees paid',
          code: `<span class="kw">SELECT</span> <span class="fn">SUM</span>(<span class="col">fees_paid</span>) <span class="kw">AS</span> total_revenue <span class="kw">FROM</span> <span class="tbl">Enrollments</span>;`,
        }
      ],
      usecase: 'Commonly used in financial reports, checkout shopping cart subtotal additions, and dashboard statistics.',
    },
    {
      num: '03', name: 'AVG', tagline: 'Calculate average numeric values',
      definition: 'AVG returns the arithmetic average (mean) value of a numeric column, ignoring null values.',
      syntax: `<span class="kw">SELECT</span> <span class="fn">AVG</span>(<span class="col">column_name</span>) <span class="kw">FROM</span> <span class="tbl">table_name</span>;`,
      examples: [
        {
          label: 'Find the average GPA of students',
          code: `<span class="kw">SELECT</span> <span class="fn">AVG</span>(<span class="col">gpa</span>) <span class="kw">AS</span> average_gpa <span class="kw">FROM</span> <span class="tbl">Students</span>;`,
        }
      ],
      usecase: 'Used for metrics dashboards (e.g. "Average rating per product", "Average order size").',
    },
    {
      num: '04', name: 'MIN & MAX', tagline: 'Find smallest and largest values',
      definition: 'MIN returns the smallest value in a column, while MAX returns the largest value. Works on numeric, string, and date columns.',
      syntax: `<span class="kw">SELECT</span> <span class="fn">MIN</span>(<span class="col">col</span>), <span class="fn">MAX</span>(<span class="col">col</span>) <span class="kw">FROM</span> <span class="tbl">table_name</span>;`,
      examples: [
        {
          label: 'Find the lowest and highest GPA values',
          code: `<span class="kw">SELECT</span> <span class="fn">MIN</span>(<span class="col">gpa</span>) <span class="kw">AS</span> lowest_gpa, <span class="fn">MAX</span>(<span class="col">gpa</span>) <span class="kw">AS</span> highest_gpa <span class="kw">FROM</span> <span class="tbl">Students</span>;`,
        }
      ],
      usecase: 'Used to filter search options (e.g., finding the price range bounds of items in stock).',
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
              📊 Aggregates — Summary Calculations
            </div>
            <h1 className="cp-title">
              Aggregate <span style={{ color }}>Functions</span>
            </h1>
            <p className="cp-subtitle">
              Learn how to run calculations on multiple rows of data to return single summary values using COUNT, SUM, AVG, MIN, and MAX.
            </p>
          </div>
        </div>

        <div className="cp-content">
          <div className="toc-strip">
            {sections.map(c => (
              <a key={c.name} href={`#agg-${c.name.split(' ')[0]}`} className="toc-link">{c.name}</a>
            ))}
          </div>

          {sections.map((cmd) => (
            <div key={cmd.name} id={`agg-${cmd.name.split(' ')[0]}`} className="cmd-section">
              <div className="cmd-header">
                <div className="cmd-num" style={{ background: color }}>{cmd.num}</div>
                <div>
                  <div className="cmd-name" style={{ color }}>{cmd.name}</div>
                  <div className="cmd-tagline">{cmd.tagline}</div>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-box">
                  <h4>📖 Function Definition</h4>
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
            <button className="btn-primary" onClick={() => navigate('/')} id="go-home-agg-btn">
              Back to Home
            </button>
            <button className="btn-secondary" onClick={() => navigate('/indexes-views')}>
              ← Indexes & Views
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
