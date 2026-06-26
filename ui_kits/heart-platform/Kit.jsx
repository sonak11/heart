/* Shared dashboard helpers. window.Kit */
(function () {
  function AIInsight({ title = 'AI-generated insight', children, actions }) {
    return (
      <div style={{ background: 'var(--scarlet-050)', border: '1px solid var(--scarlet-100)', borderRadius: 'var(--radius-md)', padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8, color: 'var(--scarlet-600)' }}>
          <window.Icon.sparkle size={15} />
          <span style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' }}>{title}</span>
        </div>
        <div style={{ font: 'var(--type-sm)', lineHeight: 1.6, color: 'var(--ink-700)' }}>{children}</div>
        {actions && <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>{actions}</div>}
      </div>
    );
  }

  function Tooltip({ label, children }) {
    const [show, setShow] = React.useState(false);
    return (
      <span style={{ position: 'relative', display: 'inline-flex' }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
        {show && (
          <span style={{ position: 'absolute', bottom: '130%', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', background: 'var(--slate-900)', color: '#fff', font: 'var(--type-meta)', padding: '6px 10px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-md)', zIndex: 30, pointerEvents: 'none' }}>{label}</span>
        )}
      </span>
    );
  }

  // Page section heading
  function Section({ title, sub, right, children }) {
    return (
      <section style={{ marginBottom: 24 }}>
        {(title || right) && (
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              {sub && <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 4 }}>{sub}</div>}
              {title && <h2 style={{ font: 'var(--type-h3)', color: 'var(--ink-900)', margin: 0 }}>{title}</h2>}
            </div>
            {right}
          </div>
        )}
        {children}
      </section>
    );
  }

  function Grid({ cols = 2, gap = 16, children, style }) {
    return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, ...style }}>{children}</div>;
  }

  window.Kit = { AIInsight, Tooltip, Section, Grid };
})();
