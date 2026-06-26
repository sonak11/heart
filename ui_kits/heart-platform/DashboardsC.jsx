/* Dashboards C — Cross-Pillar Network · Trends & Timeline · Geographic */
(function () {
  const G = window.HEART_DATA;
  const C = window.Charts;
  const K = window.Kit;
  const UI = window.HEARTDesignSystem_d7d056;

  // ============================= DOMAIN CONNECTION NETWORK =============================
  function CrossPillarNetwork({ onNavigate, filters }) {
    const { Panel, Badge, Button, CircleBadge, Tag } = UI;
    const [sel, setSel] = React.useState('D5');
    const [hover, setHover] = React.useState(null);

    const stats = G.domainStats;
    const maxSeg = Math.max(...stats.map((s) => s.segments));
    const N = stats.length;
    const W = 600, H = 560, cx = W / 2, cy = H / 2, R = 215;
    const pos = {};
    stats.forEach((s, i) => {
      const a = (i / N) * Math.PI * 2 - Math.PI / 2;
      pos[s.id] = [cx + Math.cos(a) * R, cy + Math.sin(a) * R, a];
    });
    const focus = hover || sel;
    const neighbors = new Set(G.coocOf(focus).map((c) => c.other));
    const selStat = G.domainStat(sel);
    const selCooc = G.coocOf(sel);
    const totalC = selStat.c1 + selStat.c2 + selStat.c3;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
          <Panel eyebrow="Co-occurrence graph · all 13 domains" title="How themes connect across the corpus"
            action={<Badge tone="neutral">node = domain · edge = co-coded</Badge>}>
            <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', overflow: 'visible' }}>
              {/* edges */}
              {G.domainCooc.map((p, i) => {
                const A = pos[p.a], B = pos[p.b];
                const onPath = focus && (p.a === focus || p.b === focus);
                const dim = focus && !onPath;
                return <line key={i} x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]}
                  stroke={onPath ? 'var(--scarlet-500)' : 'var(--ink-400)'}
                  strokeWidth={1 + (p.w / 14)} strokeLinecap="round"
                  opacity={dim ? 0.05 : onPath ? 0.55 : 0.16} />;
              })}
              {/* center label */}
              <text x={cx} y={cy - 4} textAnchor="middle" style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, fill: 'var(--ink-300)' }}>Health Equity</text>
              <text x={cx} y={cy + 14} textAnchor="middle" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--ink-300)', letterSpacing: '0.08em' }}>CORPUS</text>
              {/* nodes */}
              {stats.map((s) => {
                const [x, y, a] = pos[s.id];
                const rr = 11 + (s.segments / maxSeg) * 20;
                const isFocus = focus === s.id;
                const isNeighbor = neighbors.has(s.id);
                const dim = focus && !isFocus && !isNeighbor;
                const lx = x + Math.cos(a) * (rr + 12), ly = y + Math.sin(a) * (rr + 12);
                const anchor = Math.abs(Math.cos(a)) < 0.3 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end';
                return (
                  <g key={s.id} style={{ cursor: 'pointer' }} opacity={dim ? 0.32 : 1}
                    onMouseEnter={() => setHover(s.id)} onMouseLeave={() => setHover(null)} onClick={() => setSel(s.id)}>
                    {sel === s.id && <circle cx={x} cy={y} r={rr + 5} fill="none" stroke={s.domain.color} strokeWidth="2" opacity="0.4" />}
                    <circle cx={x} cy={y} r={rr} fill={s.domain.color} opacity={isFocus ? 1 : 0.9} />
                    <text x={x} y={y + 4} textAnchor="middle" style={{ fontFamily: 'var(--font-mono)', fontSize: rr > 18 ? 11 : 9, fontWeight: 600, fill: '#fff', pointerEvents: 'none' }}>{s.domain.code}</text>
                    <text x={lx} y={ly + 3} textAnchor={anchor} style={{ fontFamily: 'var(--font-sans)', fontSize: 10.5, fontWeight: isFocus ? 700 : 500, fill: isFocus ? 'var(--ink-900)' : 'var(--ink-500)', pointerEvents: 'none' }}>{s.domain.name.split(' ').slice(0, 2).join(' ')}</text>
                  </g>
                );
              })}
            </svg>
            <div style={{ font: 'var(--type-meta)', color: 'var(--ink-400)', marginTop: 6, textAlign: 'center' }}>Node size = coded segments · hover to trace, click to inspect a domain</div>
          </Panel>

          {/* Detail panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Panel eyebrow="Selected domain" title={selStat.domain.name} action={<span style={{ width: 12, height: 12, borderRadius: 3, background: selStat.domain.color }} />}>
              <div style={{ display: 'flex', gap: 18, marginBottom: 16 }}>
                <div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 30, fontWeight: 600, color: 'var(--ink-900)' }}>{selStat.segments}</div><div style={{ font: 'var(--type-meta)', color: 'var(--ink-400)' }}>segments</div></div>
                <div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 30, fontWeight: 600, color: selCooc[0].w >= 45 ? 'var(--scarlet-600)' : 'var(--ink-800)' }}>{selCooc.length}</div><div style={{ font: 'var(--type-meta)', color: 'var(--ink-400)' }}>connections</div></div>
              </div>
              {/* circle split */}
              <div style={{ font: 'var(--type-meta)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--ink-400)', marginBottom: 7 }}>Who raises it</div>
              <div style={{ display: 'flex', height: 16, borderRadius: 4, overflow: 'hidden', marginBottom: 6 }}>
                {[['c1', 'var(--circle-community)'], ['c2', 'var(--circle-internal)'], ['c3', 'var(--circle-leadership)']].map(([k, col]) => (
                  <div key={k} title={`${k}: ${selStat[k]}`} style={{ width: (selStat[k] / totalC) * 100 + '%', background: col }} />
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, font: 'var(--type-meta)', color: 'var(--ink-500)' }}>
                <span><b style={{ color: 'var(--circle-community)' }}>{selStat.c1}</b> comm</span>
                <span><b style={{ color: 'var(--circle-internal)' }}>{selStat.c2}</b> int</span>
                <span><b style={{ color: 'var(--circle-leadership)' }}>{selStat.c3}</b> lead</span>
              </div>
            </Panel>

            <Panel eyebrow="Strongest links" title="Co-occurs most with">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {selCooc.slice(0, 5).map((c) => {
                  const d = G.domainById(c.other);
                  return (
                    <button key={c.other} type="button" onClick={() => setSel(c.other)} style={{ display: 'grid', gridTemplateColumns: '1fr 70px 30px', alignItems: 'center', gap: 8, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, textAlign: 'left' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, font: 'var(--type-sm)', color: 'var(--ink-700)', overflow: 'hidden' }}><span style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flex: 'none' }} /><span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</span></span>
                      <div style={{ height: 7, background: 'var(--ink-100)', borderRadius: 999, overflow: 'hidden' }}><div style={{ width: c.w + '%', height: '100%', background: 'var(--scarlet-500)', borderRadius: 999 }} /></div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)', textAlign: 'right' }}>{c.w}</span>
                    </button>
                  );
                })}
              </div>
              <Button size="sm" variant="secondary" fullWidth style={{ marginTop: 14 }} onClick={() => onNavigate('quotes')} iconRight={<window.Icon.quote size={13} />}>Quotes coded {selStat.domain.code}</Button>
            </Panel>
          </div>
        </div>

        {/* Strongest connections across corpus */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, alignItems: 'start' }}>
          <Panel eyebrow="Corpus-wide" title="Strongest theme connections">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 22px' }}>
              {G.coocPairs.slice(0, 8).map((p, i) => {
                const A = G.domainById(p.a), B = G.domainById(p.b);
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: '1px solid var(--border-divider)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-300)', width: 16 }}>{i + 1}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: 'var(--type-sm)', color: 'var(--ink-700)', flex: 1, overflow: 'hidden' }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: A.color, flex: 'none' }} />{A.code}
                      <span style={{ color: 'var(--ink-300)' }}>↔</span>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: B.color, flex: 'none' }} />{B.code}
                    </span>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: p.w >= 45 ? 'var(--scarlet-600)' : 'var(--ink-700)' }}>{p.w}</span>
                  </div>
                );
              })}
            </div>
          </Panel>
          <K.AIInsight title="What the network shows">
            <strong>Barriers (D5)</strong> is the most connected domain — it co-occurs with community trust, relationship dynamics, and how community is defined. Logistical barriers are not an isolated complaint; they are the structural hub the whole corpus orbits. Severing the <strong>Barriers ↔ Community Experience</strong> tie (58%) — by fixing transportation, language, and childcare — would ripple across the most themes.
          </K.AIInsight>
        </div>
      </div>
    );
  }

  // ============================= TRENDS & TIMELINE =============================
  function TrendTimeline({ onNavigate }) {
    const { Panel, Badge, Button, CircleBadge } = UI;
    const { TrendChart } = C;
    const [scrub, setScrub] = React.useState(5);
    const [theme, setTheme] = React.useState(G.themes[0]);
    const series = [
      { label: 'Community', color: 'var(--circle-community)', values: theme.trend },
      { label: 'Internal', color: 'var(--circle-internal)', values: theme.trend.map((v, i) => Math.round(v * 0.6 + i)) },
      { label: 'Leadership', color: 'var(--circle-leadership)', values: theme.trend.map((v) => Math.round(v * 0.25 + 4)) },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel eyebrow="Timeline · drag to scrub" title={`Prevalence over time — ${theme.name}`} action={
          <select value={theme.code} onChange={(e) => setTheme(G.themeByCode(e.target.value))} style={{ appearance: 'none', font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-700)', background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', padding: '6px 12px', cursor: 'pointer' }}>
            {G.themes.map((t) => <option key={t.code} value={t.code}>{t.name}</option>)}
          </select>
        }>
          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            {series.map((s) => <span key={s.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: 'var(--type-sm)', color: 'var(--ink-600)' }}><span style={{ width: 12, height: 3, background: s.color, borderRadius: 2 }} />{s.label}: <strong style={{ fontFamily: 'var(--font-serif)' }}>{s.values[scrub]}%</strong></span>)}
            <span style={{ marginLeft: 'auto', font: 'var(--type-meta)', color: 'var(--ink-400)' }}>{G.months[scrub]} 2026</span>
          </div>
          <TrendChart series={series} labels={G.months} scrub={scrub} onScrub={setScrub} />
          <input type="range" min="0" max="5" value={scrub} onChange={(e) => setScrub(+e.target.value)} style={{ width: '100%', marginTop: 10, accentColor: 'var(--scarlet-500)' }} />
        </Panel>
        <K.AIInsight title="Explain this chart">
          The community line for <strong>{theme.name}</strong> climbed from {theme.trend[0]}% to {theme.trend[5]}% over two quarters while leadership stayed flat — the divergence is <strong>widening</strong>, not closing.
        </K.AIInsight>
      </div>
    );
  }

  // ============================= GEOGRAPHIC =============================
  function Geographic({ onNavigate }) {
    const { Panel, Badge, Button } = UI;
    const { RegionMap } = C;
    const [active, setActive] = React.useState(null);
    const r = active || G.geo.find((x) => x.id === 'newbrunswick');
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        <Panel eyebrow="New Jersey · readiness signal" title="Geographic distribution" action={<Badge tone="neutral">click a region</Badge>}>
          <RegionMap regions={G.geo} active={r.id} onRegion={(x) => setActive(x)} />
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Panel eyebrow="Region detail" title={r.name}>
            <div style={{ display: 'flex', gap: 20, marginBottom: 14 }}>
              <div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 600, color: C.heat(r.value) }}>{r.value}</div><div style={{ font: 'var(--type-meta)', color: 'var(--ink-400)' }}>readiness</div></div>
              <div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 600, color: 'var(--ink-800)' }}>{r.interviews}</div><div style={{ font: 'var(--type-meta)', color: 'var(--ink-400)' }}>interviews</div></div>
            </div>
            <Button size="sm" variant="secondary" fullWidth onClick={() => onNavigate('quotes')} iconRight={<window.Icon.quote size={13} />}>Quotes from {r.name.split(' / ')[0]}</Button>
          </Panel>
          <K.AIInsight title="Find outliers">
            <strong>Camden (44)</strong> trails the state despite 26 interviews — transportation and childcare barriers dominate there. Prioritize for the mobile-clinic expansion.
          </K.AIInsight>
        </div>
      </div>
    );
  }

  window.CrossPillarNetwork = CrossPillarNetwork;
  window.TrendTimeline = TrendTimeline;
  window.Geographic = Geographic;
})();
