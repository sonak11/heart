/* ⌘K Command Palette — search everywhere. window.CommandPalette */
(function () {
  function CommandPalette({ open, onClose, onNavigate, onAction }) {
    const [q, setQ] = React.useState('');
    const [sel, setSel] = React.useState(0);
    const inputRef = React.useRef(null);
    const D = window.HEART_DATA;

    React.useEffect(() => { if (open && inputRef.current) { inputRef.current.focus(); setQ(''); setSel(0); } }, [open]);

    const pages = [
      { type: 'Page', label: 'Executive Command Center', route: 'overview', icon: 'gauge' },
      { type: 'Page', label: 'Voice vs Authority', route: 'voice', icon: 'scale' },
      { type: 'Page', label: 'Readiness Score', route: 'readiness', icon: 'gauge' },
      { type: 'Page', label: 'Theme Intelligence', route: 'theme', icon: 'network' },
      { type: 'Page', label: 'Quote Explorer', route: 'quotes', icon: 'quote' },
      { type: 'Page', label: 'Engagement & Stakeholders', route: 'circle', icon: 'users' },
      { type: 'Page', label: 'Gaps & Barriers', route: 'gap', icon: 'alert' },
      { type: 'Page', label: 'Coding Matrix Explorer', route: 'matrix', icon: 'file' },
      { type: 'Page', label: 'Connections, Trends & Geography', route: 'patterns', icon: 'network' },
      { type: 'Page', label: 'Coding Quality', route: 'coding', icon: 'file' },
      { type: 'Page', label: 'Programs & Blueprint', route: 'recommend', icon: 'sparkle' },
      { type: 'Page', label: 'Pipeline Operations', route: 'operations', icon: 'flow' },
      { type: 'Page', label: 'Blind Spot Detection', route: 'blindspot', sub: 'Voice', icon: 'alert' },
      { type: 'Page', label: 'Authority Analysis', route: 'authority', sub: 'Voice', icon: 'layers' },
      { type: 'Page', label: 'Proximity Analysis', route: 'proximity', sub: 'Voice', icon: 'scale' },
      { type: 'Page', label: 'Emerging Themes', route: 'emerging', sub: 'Theme', icon: 'sparkle' },
      { type: 'Page', label: 'Stakeholder Intelligence', route: 'stakeholder', sub: 'Engagement', icon: 'users' },
      { type: 'Page', label: 'Trust & Community', route: 'trust', sub: 'Engagement', icon: 'users' },
      { type: 'Page', label: 'Barrier Intelligence', route: 'barrier', sub: 'Gaps', icon: 'alert' },
      { type: 'Page', label: 'Theme Connection Network', route: 'network', sub: 'Patterns', icon: 'network' },
      { type: 'Page', label: 'Trends & Timeline', route: 'trend', sub: 'Patterns', icon: 'flow' },
      { type: 'Page', label: 'Geographic', route: 'geo', sub: 'Patterns', icon: 'layers' },
      { type: 'Page', label: 'Program Impact', route: 'program', sub: 'Programs', icon: 'layers' },
      { type: 'Page', label: 'AI Coding Workspace', route: 'admin', sub: 'Operations', icon: 'sparkle' },
      { type: 'Page', label: 'Workflow Monitoring', route: 'workflow', sub: 'Operations', icon: 'flow' },
      { type: 'Page', label: 'Report Center', route: 'reports', sub: 'Operations', icon: 'download' },
    ];
    const actions = [
      { type: 'Action', label: 'Ask the Copilot', act: 'copilot', icon: 'sparkle' },
      { type: 'Action', label: 'Generate executive report', act: 'report', icon: 'download' },
      { type: 'Action', label: 'Save current view', act: 'save', icon: 'check' },
      { type: 'Action', label: 'Take dashboard snapshot', act: 'snapshot', icon: 'file' },
      { type: 'Action', label: 'Enter Executive Mode', act: 'exec', icon: 'gauge' },
    ];
    const themes = D.themes.map((t) => ({ type: 'Theme', label: t.name, sub: t.code, route: 'theme', icon: 'network' }));
    const quotes = D.quotes.map((qq) => ({ type: 'Quote', label: qq.text.slice(0, 52) + '…', sub: qq.id, route: 'quotes', icon: 'quote' }));

    const all = [...pages, ...actions, ...themes, ...quotes];
    const filtered = q ? all.filter((i) => (i.label + (i.sub || '') + i.type).toLowerCase().includes(q.toLowerCase())).slice(0, 9) : [...pages.slice(0, 5), ...actions];

    function choose(i) {
      const it = filtered[i]; if (!it) return;
      if (it.act) onAction(it.act); else if (it.route) onNavigate(it.route);
      onClose();
    }

    if (!open) return null;
    return (
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(20,23,31,0.32)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '12vh' }}>
        <div onClick={(e) => e.stopPropagation()} onKeyDown={(e) => {
          if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(filtered.length - 1, s + 1)); }
          else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
          else if (e.key === 'Enter') { e.preventDefault(); choose(sel); }
        }} style={{ width: 580, maxWidth: '90vw', background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-pop)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderBottom: '1px solid var(--border-divider)' }}>
            <span style={{ color: 'var(--ink-400)' }}><window.Icon.search size={18} /></span>
            <input ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} placeholder="Search pages, themes, quotes, actions…" style={{ flex: 1, border: 'none', outline: 'none', font: 'var(--type-h3)', color: 'var(--ink-900)', background: 'transparent' }} />
            <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-400)', border: '1px solid var(--border-default)', borderRadius: 4, padding: '2px 6px' }}>ESC</kbd>
          </div>
          <div style={{ maxHeight: 380, overflowY: 'auto', padding: 8 }}>
            {filtered.length === 0 && <div style={{ padding: 24, textAlign: 'center', color: 'var(--ink-400)', font: 'var(--type-sm)' }}>No matches</div>}
            {filtered.map((it, i) => {
              const Glyph = window.Icon[it.icon] || window.Icon.file;
              return (
                <button key={i} type="button" onMouseEnter={() => setSel(i)} onClick={() => choose(i)} style={{
                  display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', cursor: 'pointer',
                  border: 'none', borderRadius: 'var(--radius-sm)', padding: '10px 12px',
                  background: sel === i ? 'var(--scarlet-050)' : 'transparent',
                }}>
                  <span style={{ color: sel === i ? 'var(--scarlet-600)' : 'var(--ink-400)', display: 'inline-flex' }}><Glyph size={17} /></span>
                  <span style={{ flex: 1, font: 'var(--type-body)', fontWeight: 500, color: 'var(--ink-800)' }}>{it.label}</span>
                  {it.sub && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)' }}>{it.sub}</span>}
                  <span style={{ font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-300)' }}>{it.type}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  window.CommandPalette = CommandPalette;
})();
