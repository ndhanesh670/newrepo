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
        <span className="lang-tag">SQL SCHEMA</span>
      </div>
      <pre className="code-body" dangerouslySetInnerHTML={{ __html: children }} />
    </div>
  );
}

export default function Normalization() {
  const navigate = useNavigate();
  const color = '#ec4899'; // Hot pink for normalization
  const glow = 'rgba(236, 72, 153, 0.15)';

  const rules = [
    {
      num: '01', name: '1NF (First Normal Form)', tagline: 'Eliminate duplicate columns & repeating groups',
      definition: 'A relation is in 1NF if and only if the domain of each attribute contains only atomic (indivisible) values, and there are no repeating groups or multi-valued attributes.',
      syntax: 'Each cell must contain a single value. Every record must be unique (via a primary key).',
      examples: [
        {
          label: 'Unnormalized (Repeating values in a single cell)',
          code: `<span class="cmt">-- Bad Design (Violates 1NF):</span>\n<span class="cmt">-- Student ID: 1, Name: Jane, Courses: "Math, Physics, Chemistry"</span>\n\n<span class="cmt">-- Good Design (Normalized to 1NF):</span>\n<span class="kw">CREATE TABLE</span> <span class="tbl">StudentCourses_1NF</span> (\n  <span class="col">student_id</span> <span class="fn">INT</span>,\n  <span class="col">student_name</span> <span class="fn">VARCHAR</span>(<span class="num">50</span>),\n  <span class="col">course_name</span> <span class="fn">VARCHAR</span>(<span class="num">50</span>),\n  <span class="kw">PRIMARY KEY</span> (<span class="col">student_id</span>, <span class="col">course_name</span>)\n);`,
        }
      ],
      usecase: 'Ensures data can be easily searched and queried. Without 1NF, finding students taking "Physics" requires slow substring searches.',
    },
    {
      num: '02', name: '2NF (Second Normal Form)', tagline: 'Eliminate partial functional dependencies',
      definition: 'A table is in 2NF if it is in 1NF and all non-key attributes are fully functionally dependent on the entire primary key (no partial dependencies on a subset of a composite primary key).',
      syntax: 'If you have a composite primary key (A, B), any non-key attribute C must depend on both A and B, not just A.',
      examples: [
        {
          label: 'Separating partial dependencies into separate tables',
          code: `<span class="cmt">-- Bad Design (student_name depends only on student_id, not course_name):</span>\n<span class="cmt">-- (student_id, course_name) -> student_name, grade</span>\n\n<span class="cmt">-- Good Design (Normalized to 2NF):</span>\n<span class="kw">CREATE TABLE</span> <span class="tbl">Students</span> (\n  <span class="col">student_id</span> <span class="fn">INT</span> <span class="kw">PRIMARY KEY</span>,\n  <span class="col">student_name</span> <span class="fn">VARCHAR</span>(<span class="num">50</span>)\n);\n\n<span class="kw">CREATE TABLE</span> <span class="tbl">Grades</span> (\n  <span class="col">student_id</span> <span class="fn">INT</span>,\n  <span class="col">course_name</span> <span class="fn">VARCHAR</span>(<span class="num">50</span>),\n  <span class="col">grade</span> <span class="fn">CHAR</span>(<span class="num">1</span>),\n  <span class="kw">PRIMARY KEY</span> (<span class="col">student_id</span>, <span class="col">course_name</span>),\n  <span class="kw">FOREIGN KEY</span> (<span class="col">student_id</span>) <span class="kw">REFERENCES</span> <span class="tbl">Students</span>(<span class="col">student_id</span>)\n);`,
        }
      ],
      usecase: 'Prevents update anomalies. If a student changes their name, you only update it once in the Students table, not once per course they take.',
    },
    {
      num: '03', name: '3NF (Third Normal Form)', tagline: 'Eliminate transitive dependencies',
      definition: 'A table is in 3NF if it is in 2NF and no non-key attribute is transitively dependent on the primary key (no non-key attribute should determine another non-key attribute).',
      syntax: 'Non-key attributes must only depend on the primary key (the key, the whole key, and nothing but the key).',
      examples: [
        {
          label: 'Moving transitive attributes to their own lookup table',
          code: `<span class="cmt">-- Bad Design: student_id -> zip_code -> city</span>\n<span class="cmt">-- (city is transitively dependent on student_id through zip_code)</span>\n\n<span class="cmt">-- Good Design (Normalized to 3NF):</span>\n<span class="kw">CREATE TABLE</span> <span class="tbl">ZipLookup</span> (\n  <span class="col">zip_code</span> <span class="fn">VARCHAR</span>(<span class="num">10</span>) <span class="kw">PRIMARY KEY</span>,\n  <span class="col">city</span> <span class="fn">VARCHAR</span>(<span class="num">50</span>)\n);\n\n<span class="kw">CREATE TABLE</span> <span class="tbl">StudentAddresses</span> (\n  <span class="col">student_id</span> <span class="fn">INT</span> <span class="kw">PRIMARY KEY</span>,\n  <span class="col">street</span> <span class="fn">VARCHAR</span>(<span class="num">100</span>),\n  <span class="col">zip_code</span> <span class="fn">VARCHAR</span>(<span class="num">10</span>),\n  <span class="kw">FOREIGN KEY</span> (<span class="col">zip_code</span>) <span class="kw">REFERENCES</span> <span class="tbl">ZipLookup</span>(<span class="col">zip_code</span>)\n);`,
        }
      ],
      usecase: 'Eliminates redundant data entries for common values like location zip codes, departments, or manager titles.',
    },
    {
      num: '04', name: 'BCNF (Boyce-Codd Normal Form)', tagline: 'A stronger version of 3NF',
      definition: 'A relation is in BCNF if for every non-trivial functional dependency X -> Y, X is a superkey. BCNF resolves anomalies where multiple overlapping candidate keys exist.',
      syntax: 'Every determinant in a functional dependency must be a candidate key.',
      examples: [
        {
          label: 'Splitting overlapping candidate keys',
          code: `<span class="cmt">-- Case where (Student, Subject) determines Teacher, and Teacher determines Subject</span>\n<span class="cmt">-- Since Teacher determines Subject but Teacher is not a candidate key, it violates BCNF.</span>\n\n<span class="cmt">-- BCNF Solution:</span>\n<span class="kw">CREATE TABLE</span> <span class="tbl">TeacherSubject</span> (\n  <span class="col">teacher_name</span> <span class="fn">VARCHAR</span>(<span class="num">50</span>) <span class="kw">PRIMARY KEY</span>,\n  <span class="col">subject</span> <span class="fn">VARCHAR</span>(<span class="num">50</span>)\n);\n\n<span class="kw">CREATE TABLE</span> <span class="tbl">StudentTeacher</span> (\n  <span class="col">student_id</span> <span class="fn">INT</span>,\n  <span class="col">teacher_name</span> <span class="fn">VARCHAR</span>(<span class="num">50</span>),\n  <span class="kw">PRIMARY KEY</span> (<span class="col">student_id</span>, <span class="col">teacher_name</span>),\n  <span class="kw">FOREIGN KEY</span> (<span class="col">teacher_name</span>) <span class="kw">REFERENCES</span> <span class="tbl">TeacherSubject</span>(<span class="col">teacher_name</span>)\n);`,
        }
      ],
      usecase: 'Used in advanced database designs where complex constraints need to be enforced directly through schema relationships.',
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
              📈 Normalization — Database Design
            </div>
            <h1 className="cp-title">
              Database <span style={{ color }}>Normalization</span>
            </h1>
            <p className="cp-subtitle">
              Normalization is the structured process of organizing a database to reduce data redundancy
              and prevent data anomalies (insertion, update, and deletion anomalies).
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="cp-content">
          <div className="toc-strip">
            {rules.map(c => (
              <a key={c.name} href={`#norm-${c.name.split(' ')[0]}`} className="toc-link">{c.name}</a>
            ))}
          </div>

          {rules.map((cmd) => (
            <div key={cmd.name} id={`norm-${cmd.name.split(' ')[0]}`} className="cmd-section">
              <div className="cmd-header">
                <div className="cmd-num" style={{ background: color }}>{cmd.num}</div>
                <div>
                  <div className="cmd-name" style={{ color }}>{cmd.name}</div>
                  <div className="cmd-tagline">{cmd.tagline}</div>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-box">
                  <h4>📖 Rule Definition</h4>
                  <p>{cmd.definition}</p>
                </div>
                <div className="info-box">
                  <h4>📐 Design Goal</h4>
                  <p>{cmd.syntax}</p>
                </div>
              </div>

              {cmd.examples.map((ex, i) => (
                <div key={i}>
                  <div className="example-label">💡 Schema Example — {ex.label}</div>
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
            <button className="btn-primary" onClick={() => navigate('/joins')} id="go-joins-btn">
              Next: Joins →
            </button>
            <button className="btn-secondary" onClick={() => navigate('/')}>← Home</button>
          </div>
        </div>
      </div>
    </>
  );
}
