/* Matrix analytics — Proximity Analysis · Trust & Community · Barrier Intelligence */

// ============================================================
// 6 · PROXIMITY ANALYSIS  (directly vs indirectly affected)
// ============================================================
function ProximityAnalysis({ filters }) {
  const UI = window.HEARTDesignSystem_d7d056, C = window.Charts, K = window.Kit, G = window.HEART_DATA;
  const { Panel, Badge, Button } = UI;
  const d = G.derive(filters);
  const pool = d.domainStats.length >= 4 ? d.domainStats : G.domainStats;
  const ranked = [...pool].sort((a, b) => b.proximityGap - a.proximityGap);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <K.Grid cols={2}>
        {G.proximity.groups.map((g) => (
          <Panel key={g.id} style={{ borderTop: `3px solid ${g.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ font: 'var(--type-title)', color: 'var(--ink-900)' }}>{g.label}</div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 30, fontWeight: 600, color: g.color }}>{g.n}</span>
            </div>
            <div style={{ display: 'flex', gap: 22, marginTop: 14 }}>
              <div><div style={{ font: 'var(--type-meta)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--ink-400)' }}>Trust index</div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600, color: g.trust < 0.5 ? 'var(--critical-600)' : 'var(--positive-600)' }}>{(g.trust * 100).toFixed(0)}%</div></div>
              <div><div style={{ font: 'var(--type-meta)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--ink-400)' }}>Interviews</div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600, color: 'var(--ink-800)' }}>{g.n}</div></div>
            </div>
          </Panel>
        ))}
      </K.Grid>

      <Panel eyebrow="Where lived experience diverges" title="Domain emphasis — directly vs indirectly affected"
        action={<div style={{ display: 'flex', gap: 12, font: 'var(--type-sm)' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--circle-community)' }} />Directly</span><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--circle-leadership)' }} />Indirectly</span></div>}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr 70px', alignItems: 'center', font: 'var(--type-meta)', color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.04em', paddingBottom: 8, borderBottom: '1px solid var(--border-divider)' }}>
          <span>Domain</span><span style={{ textAlign: 'right', paddingRight: 12 }}>◄ Directly</span><span style={{ paddingLeft: 12 }}>Indirectly ►</span><span style={{ textAlign: 'right' }}>Δ</span>
        </div>
        {ranked.map((s) => (
          <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr 70px', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-divider)' }}>
            <div style={{ paddingRight: 10 }}><div style={{ font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-800)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.domain.name}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-400)' }}>{s.domain.code}</div></div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, paddingRight: 12, borderRight: '2px solid var(--border-strong)' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--circle-community)', fontWeight: 600, width: 22, textAlign: 'right' }}>{s.dir}</span>
              <div style={{ width: (s.dir / 50) * 100 + '%', height: 14, background: 'var(--circle-community)', borderRadius: '3px 0 0 3px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 12 }}>
              <div style={{ width: (s.ind / 50) * 100 + '%', height: 14, background: 'var(--circle-leadership)', borderRadius: '0 3px 3px 0' }} />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--circle-leadership)', fontWeight: 600, width: 22 }}>{s.ind}</span>
            </div>
            <div style={{ textAlign: 'right' }}><Badge tone={s.proximityGap > 12 ? 'critical' : s.proximityGap < -12 ? 'info' : 'neutral'}>{s.proximityGap > 0 ? '+' : ''}{s.proximityGap}</Badge></div>
          </div>
        ))}
        <K.AIInsight title="Proximity insight" >Those <strong>directly affected</strong> raise barriers, trust, and community-definition issues far more than those indirectly affected — whose attention skews to measurement, formal strategy, and benchmarks. The lived-experience signal is concentrated exactly where decision authority is lowest.</K.AIInsight>
      </Panel>
    </div>
  );
}

// ============================================================
// 10 · TRUST & COMMUNITY
// ============================================================
function TrustCommunity({ filters }) {
  const UI = window.HEARTDesignSystem_d7d056, C = window.Charts, K = window.Kit, G = window.HEART_DATA;
  const { Panel, Badge, CircleBadge, Button } = UI;
  // EXP domain subcodes: Trust / Mistrust / Credibility / Responsiveness by circle
  const dims = [
    { name: 'Trust', c1: 31, c2: 44, c3: 58 },
    { name: 'Mistrust', c1: 47, c2: 28, c3: 12 },
    { name: 'Credibility', c1: 38, c2: 41, c3: 49 },
    { name: 'Responsiveness', c1: 29, c2: 35, c3: 44 },
  ];
  const rows = dims.map((x) => x.name);
  const matrix = dims.map((x) => [x.c1, x.c2, x.c3]);
  const breakdowns = [
    { who: 'Camden community', issue: 'Forms never translated; near-miss on medication', circle: 1, sev: 'critical' },
    { who: 'Paterson / Passaic', issue: 'Mobile clinic builds trust the main hospital lost', circle: 1, sev: 'caution' },
    { who: 'Promotores network', issue: 'Years of relational trust, fragile to staffing cuts', circle: 2, sev: 'caution' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <K.Grid cols={3}>
        <Panel><div style={{ font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--ink-400)', marginBottom: 6 }}>Community trust index</div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 34, fontWeight: 600, color: 'var(--critical-600)' }}>38%</div><div style={{ font: 'var(--type-sm)', color: 'var(--ink-500)' }}>directly-affected respondents</div></Panel>
        <Panel><div style={{ font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--ink-400)', marginBottom: 6 }}>Mistrust mentions</div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 34, fontWeight: 600, color: 'var(--ink-900)' }}>47%</div><div style={{ font: 'var(--type-sm)', color: 'var(--ink-500)' }}>of community interviews</div></Panel>
        <Panel><div style={{ font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--ink-400)', marginBottom: 6 }}>Trust gap</div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 34, fontWeight: 600, color: 'var(--critical-600)' }}>27<span style={{ fontSize: 18, color: 'var(--ink-400)' }}>pts</span></div><div style={{ font: 'var(--type-sm)', color: 'var(--ink-500)' }}>leadership − community</div></Panel>
      </K.Grid>

      <K.Grid cols={2} style={{ gridTemplateColumns: '1fr 1fr' }}>
        <Panel eyebrow="Community Experience domain" title="Trust dimensions by circle">
          <C.Heatmap rows={rows} cols={['C1', 'C2', 'C3']} matrix={matrix} fmt={(v) => v} />
          <div style={{ font: 'var(--type-meta)', color: 'var(--ink-400)', marginTop: 12 }}>Mistrust concentrates in Community Voice (C1); reported trust rises with institutional distance.</div>
        </Panel>
        <Panel eyebrow="Where trust breaks down" title="Flagged community experiences" padded={false}>
          {breakdowns.map((b, i) => (
            <div key={i} style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-divider)', borderLeft: `3px solid ${b.sev === 'critical' ? 'var(--critical-500)' : 'var(--caution-500)'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><CircleBadge circle={b.circle} size="sm" /><Badge tone={b.sev}>{b.sev === 'critical' ? 'Breakdown' : 'At risk'}</Badge></div>
              <div style={{ font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-800)' }}>{b.who}</div>
              <p style={{ font: 'var(--type-sm)', color: 'var(--ink-600)', margin: '4px 0 0' }}>{b.issue}</p>
            </div>
          ))}
        </Panel>
      </K.Grid>
    </div>
  );
}

// ============================================================
// 9 · BARRIER INTELLIGENCE  (co-occurrence)
// ============================================================
function BarrierIntelligence({ filters }) {
  const UI = window.HEARTDesignSystem_d7d056, C = window.Charts, K = window.Kit, G = window.HEART_DATA;
  const { Panel, Badge, Button } = UI;
  const barriers = [
    { name: 'Structural Barriers', freq: 612, sev: 4.6 },
    { name: 'Resource Limitations', freq: 488, sev: 4.1 },
    { name: 'Institutional Resistance', freq: 296, sev: 3.8 },
    { name: 'Competing Priorities', freq: 354, sev: 3.2 },
  ];
  // co-occurrence matrix (how often barrier i appears with j)
  const labels = ['Structural', 'Resource', 'Resistance', 'Priorities'];
  const cooc = [
    [100, 64, 38, 41],
    [64, 100, 29, 47],
    [38, 29, 100, 52],
    [41, 47, 52, 100],
  ];
  const maxFreq = Math.max(...barriers.map((b) => b.freq));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <K.Grid cols={2} style={{ gridTemplateColumns: '1.1fr 1fr' }}>
        <Panel eyebrow="Severity × frequency" title="Barrier subcodes ranked">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {barriers.map((b) => (
              <div key={b.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ font: 'var(--type-body)', fontWeight: 600, color: 'var(--ink-800)' }}>{b.name}</span>
                  <span style={{ display: 'inline-flex', gap: 10, alignItems: 'baseline' }}><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)' }}>{b.freq} seg</span><Badge tone={b.sev > 4 ? 'critical' : 'caution'}>sev {b.sev.toFixed(1)}</Badge></span>
                </div>
                <div style={{ height: 12, background: 'var(--ink-100)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: (b.freq / maxFreq) * 100 + '%', height: '100%', borderRadius: 999, background: b.sev > 4 ? 'var(--critical-500)' : 'var(--caution-500)' }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel eyebrow="Co-occurrence" title="Which barriers travel together">
          <C.Heatmap rows={labels} cols={labels} matrix={cooc} fmt={(v) => v === 100 ? '·' : v} />
          <div style={{ font: 'var(--type-meta)', color: 'var(--ink-400)', marginTop: 12 }}>% of segments where the row barrier also carries the column barrier. <strong>Structural + Resource</strong> co-occur in 64% of cases — they must be solved together.</div>
        </Panel>
      </K.Grid>
      <K.AIInsight title="Barrier insight">Structural and resource barriers are not separate problems — they co-occur in nearly two-thirds of coded segments and carry the highest severity. <strong>Transportation, language access, and childcare</strong> recur as the concrete drivers. Addressing them piecemeal will under-deliver; a bundled access intervention is indicated.</K.AIInsight>
    </div>
  );
}

window.ProximityAnalysis = ProximityAnalysis;
window.TrustCommunity = TrustCommunity;
window.BarrierIntelligence = BarrierIntelligence;
