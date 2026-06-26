/* Global filter + compare bar and toast system.
   window.FilterBar, window.Toasts, window.pushToast */
(function () {
  function pushToast(text, tone = 'neutral') {
    window.dispatchEvent(new CustomEvent('heart-toast', { detail: { text, tone, id: Date.now() + Math.random() } }));
  }
  window.pushToast = pushToast;

  function Toasts() {
    const [items, setItems] = React.useState([]);
    React.useEffect(() => {
      const h = (e) => {
        setItems((x) => [...x, e.detail]);
        setTimeout(() => setItems((x) => x.filter((i) => i.id !== e.detail.id)), 3200);
      };
      window.addEventListener('heart-toast', h);
      return () => window.removeEventListener('heart-toast', h);
    }, []);
    const color = { neutral: 'var(--slate-800)', positive: 'var(--positive-600)', critical: 'var(--critical-600)' };
    return (
      <div style={{ position: 'fixed', bottom: 22, left: '50%', transform: 'translateX(-50%)', zIndex: 80, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        {items.map((it) => (
          <div key={it.id} style={{ background: color[it.tone] || color.neutral, color: '#fff', font: 'var(--type-sm)', fontWeight: 600, padding: '11px 18px', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: 9 }}>
            <window.Icon.check size={15} />{it.text}
          </div>
        ))}
      </div>
    );
  }

  const circleChips = [{ v: 'all', l: 'All circles' }, { v: 1, l: 'Community' }, { v: 2, l: 'Internal' }, { v: 3, l: 'Leadership' }];

  function FilterBar({ filters, setFilters, compare, setCompare, savedViews, onSaveView, onLoadView, onSnapshot }) {
    const D = window.HEART_DATA;
    const [viewsOpen, setViewsOpen] = React.useState(false);
    const set = (k, v) => setFilters((f) => ({ ...f, [k]: v }));

    return (
      <div style={{ position: 'sticky', top: 'var(--topbar-h)', zIndex: 6, background: 'var(--bg-topbar)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--border-divider)', padding: '10px 28px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        {/* circle segmented */}
        <div style={{ display: 'inline-flex', background: 'var(--ink-100)', borderRadius: 'var(--radius-sm)', padding: 3, gap: 2 }}>
          {circleChips.map((c) => {
            const on = filters.circle === c.v;
            const col = c.v !== 'all' ? D.circles[c.v].color : 'var(--ink-700)';
            return <button key={c.v} type="button" onClick={() => set('circle', c.v)} style={{ border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-xs)', padding: '5px 11px', font: 'var(--type-sm)', fontWeight: 600, background: on ? 'var(--white)' : 'transparent', color: on ? col : 'var(--ink-500)', boxShadow: on ? 'var(--shadow-xs)' : 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {c.v !== 'all' && <span style={{ width: 7, height: 7, borderRadius: 999, background: col }} />}{c.l}
            </button>;
          })}
        </div>

        <Sel label="Domain" value={filters.domain || 'all'} onChange={(v) => set('domain', v)} options={[['all', 'All domains'], ...D.domains.map((d) => [d.id, d.code + ' · ' + d.name])]} />
        <Sel label="Timeframe" value={filters.time} onChange={(v) => set('time', v)} options={[['q2', 'Q2 2026'], ['q1', 'Q1 2026'], ['ytd', 'Year to date'], ['all', 'All time']]} />

        {(filters.circle !== 'all' || (filters.domain && filters.domain !== 'all') || (filters.time && filters.time !== 'q2')) && (
          <button type="button" onClick={() => setFilters({ circle: 'all', domain: 'all', time: 'q2' })} title="Clear filters" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px dashed var(--border-strong)', background: 'transparent', color: 'var(--ink-500)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', cursor: 'pointer', font: 'var(--type-sm)', fontWeight: 600 }}>
            Clear<span style={{ fontSize: 13 }}>×</span>
          </button>
        )}

        <div style={{ flex: 1 }} />

        <button type="button" onClick={() => setCompare(!compare)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: `1px solid ${compare ? 'var(--scarlet-500)' : 'var(--border-default)'}`, background: compare ? 'var(--scarlet-050)' : 'var(--white)', color: compare ? 'var(--scarlet-700)' : 'var(--ink-600)', borderRadius: 'var(--radius-sm)', padding: '7px 12px', cursor: 'pointer', font: 'var(--type-sm)', fontWeight: 600 }}>
          <window.Icon.scale size={15} />Compare{compare ? ' · on' : ''}
        </button>

        <div style={{ position: 'relative' }}>
          <button type="button" onClick={() => setViewsOpen((o) => !o)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1px solid var(--border-default)', background: 'var(--white)', color: 'var(--ink-600)', borderRadius: 'var(--radius-sm)', padding: '7px 12px', cursor: 'pointer', font: 'var(--type-sm)', fontWeight: 600 }}>
            <window.Icon.layers size={15} />Saved views<window.Icon.chevronDown size={13} />
          </button>
          {viewsOpen && (
            <div style={{ position: 'absolute', right: 0, top: '110%', width: 230, background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', padding: 8, zIndex: 10 }}>
              {savedViews.length === 0 && <div style={{ padding: '8px 10px', font: 'var(--type-sm)', color: 'var(--ink-400)' }}>No saved views yet</div>}
              {savedViews.map((v) => (
                <button key={v.id} type="button" onClick={() => { onLoadView(v); setViewsOpen(false); }} style={{ display: 'flex', width: '100%', textAlign: 'left', border: 'none', background: 'transparent', cursor: 'pointer', padding: '8px 10px', borderRadius: 'var(--radius-sm)', font: 'var(--type-sm)', color: 'var(--ink-700)', gap: 8, alignItems: 'center' }}>
                  <window.Icon.check size={13} style={{ color: 'var(--ink-300)' }} />{v.name}
                </button>
              ))}
              <div style={{ borderTop: '1px solid var(--border-divider)', marginTop: 6, paddingTop: 6 }}>
                <button type="button" onClick={() => { onSaveView(); setViewsOpen(false); }} style={{ display: 'flex', width: '100%', textAlign: 'left', border: 'none', background: 'transparent', cursor: 'pointer', padding: '8px 10px', borderRadius: 'var(--radius-sm)', font: 'var(--type-sm)', color: 'var(--scarlet-600)', fontWeight: 600, gap: 8, alignItems: 'center' }}>
                  + Save current filters
                </button>
              </div>
            </div>
          )}
        </div>

        <button type="button" onClick={onSnapshot} title="Snapshot" style={{ width: 34, height: 34, border: '1px solid var(--border-default)', background: 'var(--white)', color: 'var(--ink-500)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><window.Icon.file size={16} /></button>
      </div>
    );
  }

  function Sel({ label, value, onChange, options }) {
    return (
      <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
        <select value={value} onChange={(e) => onChange(e.target.value)} style={{ appearance: 'none', WebkitAppearance: 'none', font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-700)', background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', padding: '7px 28px 7px 12px', cursor: 'pointer' }}>
          {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <span style={{ position: 'absolute', right: 10, pointerEvents: 'none', color: 'var(--ink-400)', fontSize: 10 }}>▾</span>
      </span>
    );
  }

  window.FilterBar = FilterBar;
  window.Toasts = Toasts;
})();
