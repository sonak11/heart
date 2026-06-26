/* Executive Overview — the leadership landing. Readiness in 30 seconds. */

function ExecutiveOverview({ onNavigate, filters }) {
  const { KpiCard, Panel, Badge, CircleBadge, Button } = window.HEARTDesignSystem_d7d056;
  const G = window.HEART_DATA;
  const d = G.derive(filters);

  const pillars = [
    { name: 'Workforce', score: 78, trend: 'up' },
    { name: 'Community Partnerships', score: 64, trend: 'up' },
    { name: 'Education', score: 71, trend: 'flat' },
    { name: 'Research Infrastructure', score: 52, trend: 'down' },
  ];
  // largest voice gaps, recomputed from the active lens (domain/circle/time aware)
  const gaps = [...d.domainStats].sort((a, b) => b.voiceGap - a.voiceGap).slice(0, 3).map((s) => ({
    theme: s.domain.name, community: s.c1, leadership: s.c3, code: s.domain.code,
  }));
  const prior = d.composite - (filters && filters.time === 'q1' ? -5 : 5);
  const delta = d.composite - prior;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Authority banner */}
      <div style={{
        background: 'var(--slate-900)', borderRadius: 'var(--radius-lg)', padding: '26px 30px',
        color: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 30,
      }}>
        <div style={{ maxWidth: 620 }}>
          <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--slate-200)', marginBottom: 10 }}>Composite Readiness · {d.summary}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 64, lineHeight: 0.95, color: '#fff' }}>{d.composite}<span style={{ fontSize: 30, color: 'var(--slate-200)' }}>/100</span></span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: delta >= 0 ? '#7FD1A8' : '#F0697F', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14 }}><window.Icon.arrowUpRight size={16} />{delta >= 0 ? '+' : ''}{delta} {d.tm.priorLabel}</span>
          </div>
          <p style={{ font: 'var(--type-body)', color: 'var(--slate-200)', marginTop: 12, marginBottom: 0 }}>Readiness is improving, but <strong style={{ color: '#fff' }}>community-raised barriers remain under-acknowledged by leadership</strong> in 3 of 4 pillars. Review the Voice vs Authority gap below.</p>
        </div>
        <div style={{ flex: 'none', display: 'flex', gap: 10 }}>
          <Button variant="authority" onClick={() => onNavigate('voice')} iconRight={<window.Icon.arrowRight size={16} />}>Open briefing</Button>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        <KpiCard label="Interviews coded" value={String(d.interviews)} trend="up" trendValue={'+' + Math.round(d.interviews * 0.07)} caption={d.circle === 'all' ? '184 1:1 · 63 focus group' : G.circles[d.circle].label} />
        <KpiCard label={d.domain === 'all' ? 'Domains active' : 'Domain in focus'} value={d.domain === 'all' ? String(d.domainStats.length) : d.domainStats[0].domain.code} trend="up" trendValue={d.domain === 'all' ? '13 total' : ''} caption={d.domain === 'all' ? 'of 13 coding domains' : d.domainStats[0].domain.name} />
        <KpiCard label="Voice–Authority gap" value={String(Math.max(...d.domainStats.map((s) => s.voiceGap)))} unit="pts" accent="var(--critical-600)" trend="down" trendValue="-4 pts" caption="widest community blind spot" />
        <KpiCard label="Coding agreement" value="91" unit="%" accent="var(--positive-600)" trend="up" trendValue="+2" caption="AI ↔ human concordance" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
        {/* Pillar readiness */}
        <Panel eyebrow="Pillar intelligence" title="Readiness by pillar" action={<Button size="sm" variant="ghost" iconRight={<window.Icon.arrowRight size={14} />}>Detail</Button>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {pillars.map((p) => (
              <div key={p.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ font: 'var(--type-body)', fontWeight: 600, color: 'var(--ink-800)' }}>{p.name}</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 600, color: p.score < 60 ? 'var(--critical-600)' : 'var(--ink-800)' }}>{p.score}</span>
                </div>
                <div style={{ height: 8, background: 'var(--ink-100)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: p.score + '%', height: '100%', borderRadius: 999, background: p.score < 60 ? 'var(--critical-500)' : 'var(--circle-internal)' }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Top gaps */}
        <Panel eyebrow="Flagship signal" title="Largest voice gaps" action={<Badge tone="critical" dot>Action</Badge>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {gaps.map((g) => (
              <div key={g.code} style={{ paddingBottom: 14, borderBottom: '1px solid var(--border-divider)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
                  <span style={{ font: 'var(--type-body)', fontWeight: 600, color: 'var(--ink-800)' }}>{g.theme}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)' }}>{g.code}</span>
                </div>
                <div style={{ display: 'flex', gap: 16, fontFamily: 'var(--font-sans)', fontSize: 12 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--circle-community)' }}><b style={{ fontFamily: 'var(--font-serif)', fontSize: 15 }}>{g.community}</b> community</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--circle-leadership)' }}><b style={{ fontFamily: 'var(--font-serif)', fontSize: 15 }}>{g.leadership}</b> leadership</span>
                </div>
              </div>
            ))}
            <Button variant="secondary" fullWidth onClick={() => onNavigate('voice')} iconRight={<window.Icon.scale size={15} />}>Open Voice vs Authority</Button>
          </div>
        </Panel>
      </div>
    </div>
  );
}

window.ExecutiveOverview = ExecutiveOverview;
