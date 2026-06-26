/* Dashboards B — Stakeholder Intelligence · Gap Analysis · Program Impact */
(function () {
  const G = window.HEART_DATA;
  const C = window.Charts;
  const K = window.Kit;
  const UI = window.HEARTDesignSystem_d7d056;

  // ============================= STAKEHOLDER INTELLIGENCE =============================
  function StakeholderIntelligence({ onNavigate }) {
    const { Panel, Badge, CircleBadge, Button } = UI;
    const { HBars } = C;
    const s = G.stakeholders;
    const byCircle = [1, 2, 3].map((c) => ({ c, n: s.filter((x) => x.circle === c).reduce((a, b) => a + b.n, 0) }));
    const totalN = byCircle.reduce((a, b) => a + b.n, 0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <K.Grid cols={3}>
          {byCircle.map(({ c, n }) => (
            <Panel key={c}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CircleBadge circle={c} />
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 34, fontWeight: 600, color: G.circles[c].color }}>{n}</span>
              </div>
              <div style={{ height: 6, background: 'var(--ink-100)', borderRadius: 999, marginTop: 12, overflow: 'hidden' }}>
                <div style={{ width: (n / totalN) * 100 + '%', height: '100%', background: G.circles[c].color }} />
              </div>
              <div style={{ font: 'var(--type-meta)', color: 'var(--ink-400)', marginTop: 6 }}>{Math.round((n / totalN) * 100)}% of participants</div>
            </Panel>
          ))}
        </K.Grid>
        <K.Grid cols={2} style={{ gridTemplateColumns: '1.3fr 1fr' }}>
          <Panel eyebrow="By role" title="Participants & themes raised">
            <HBars items={s.map((x) => ({ label: x.role, value: x.n, color: G.circles[x.circle].color }))} />
          </Panel>
          <Panel eyebrow="Engagement depth" title="Avg themes per interview">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {s.map((x) => (
                <div key={x.role} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center' }}>
                  <span style={{ font: 'var(--type-sm)', color: 'var(--ink-700)' }}>{x.role}</span>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {Array.from({ length: 7 }).map((_, i) => <span key={i} style={{ width: 8, height: 14, borderRadius: 2, background: i < Math.round(x.themes) ? G.circles[x.circle].color : 'var(--ink-150)' }} />)}
                  </div>
                </div>
              ))}
            </div>
            <K.AIInsight title="Compare stakeholder groups">
              Community participants raise <strong>1.7× more distinct themes</strong> per interview than leadership — and a different set. Leadership clusters on workforce &amp; research; community on logistical access.
            </K.AIInsight>
          </Panel>
        </K.Grid>
      </div>
    );
  }

  // ============================= GAP ANALYSIS =============================
  function GapAnalysis({ onNavigate }) {
    const { Panel, Badge, Button } = UI;
    const { Heatmap } = C;
    const themes = [...G.themes].sort((a, b) => b.gap - a.gap);
    const top = themes.slice(0, 6);
    const matrix = top.map((t) => [t.community, t.internal, t.leadership]);
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
        <Panel eyebrow="Prevalence heatmap" title="Theme × engagement circle">
          <Heatmap rows={top.map((t) => t.name)} cols={['Comm', 'Intern', 'Lead']} matrix={matrix} fmt={(v) => v} colorFn={C.heat} onCell={() => onNavigate('quotes')} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, font: 'var(--type-meta)', color: 'var(--ink-400)' }}>
            <span>low</span>
            <div style={{ display: 'flex', flex: 1, height: 8, borderRadius: 999, overflow: 'hidden' }}>{['heat-0','heat-1','heat-2','heat-3','heat-4','heat-5'].map((h) => <span key={h} style={{ flex: 1, background: `var(--${h})` }} />)}</div>
            <span>high prevalence</span>
          </div>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Panel eyebrow="Opportunity detection" title="Largest closable gaps">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {top.filter((t) => t.gap > 0).slice(0, 4).map((t) => (
                <div key={t.code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid var(--border-divider)' }}>
                  <div><div style={{ font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-800)' }}>{t.name}</div><div style={{ font: 'var(--type-meta)', color: 'var(--ink-400)' }}>{t.code} · {t.segments} segs</div></div>
                  <Badge tone={t.gap >= 25 ? 'critical' : 'caution'}>+{t.gap}</Badge>
                </div>
              ))}
            </div>
          </Panel>
          <K.AIInsight title="Identify outliers" actions={[<Button key="a" size="sm" variant="secondary" onClick={() => onNavigate('voice')}>Open Voice vs Authority</Button>]}>
            Three themes account for <strong>71% of total divergence</strong>. Acting on transportation and interpretation alone would close roughly half the aggregate gap.
          </K.AIInsight>
        </div>
      </div>
    );
  }

  // ============================= PROGRAM IMPACT =============================
  function ProgramImpact({ onNavigate }) {
    const { Panel, Badge, Button } = UI;
    const p = G.programs;
    const maxReach = Math.max(...p.map((x) => x.reach));
    function senTone(s) { return s >= 0.6 ? 'positive' : s >= 0.45 ? 'caution' : 'critical'; }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel eyebrow="All programs" title="Reach, evidence & sentiment" padded={false}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.4fr 90px 1fr', padding: '10px 20px', borderBottom: '1px solid var(--border-divider)', font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-400)' }}>
            <span>Program</span><span>Reach</span><span style={{ textAlign: 'center' }}>Quotes</span><span>Sentiment</span>
          </div>
          {p.map((x) => (
            <div key={x.name} style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.4fr 90px 1fr', alignItems: 'center', padding: '13px 20px', borderBottom: '1px solid var(--border-divider)' }}>
              <span style={{ font: 'var(--type-body)', fontWeight: 600, color: 'var(--ink-800)' }}>{x.name}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 12, background: 'var(--ink-100)', borderRadius: 3, overflow: 'hidden', maxWidth: 140 }}><div style={{ width: (x.reach / maxReach) * 100 + '%', height: '100%', background: 'var(--circle-internal)' }} /></div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' }}>{x.reach.toLocaleString()}</span>
              </span>
              <button type="button" onClick={() => onNavigate('quotes')} style={{ justifySelf: 'center', border: 'none', background: 'var(--ink-100)', borderRadius: 'var(--radius-pill)', padding: '3px 10px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-600)', cursor: 'pointer' }}>{x.quotes}</button>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 6, background: 'var(--ink-100)', borderRadius: 999, overflow: 'hidden', maxWidth: 120 }}><div style={{ width: x.sentiment * 100 + '%', height: '100%', background: `var(--${senTone(x.sentiment) === 'positive' ? 'positive-500' : senTone(x.sentiment) === 'caution' ? 'caution-500' : 'critical-500'})` }} /></div>
                <Badge tone={senTone(x.sentiment)}>{Math.round(x.sentiment * 100)}%</Badge>
              </span>
            </div>
          ))}
        </Panel>
        <K.AIInsight title="Explain this view">
          <strong>Telehealth access</strong> has the widest reach (5,100) but the weakest sentiment (41%) — community quotes cite language and device barriers. High reach is not translating to trust; pair it with interpretation support.
        </K.AIInsight>
      </div>
    );
  }

  window.StakeholderIntelligence = StakeholderIntelligence;
  window.GapAnalysis = GapAnalysis;
  window.ProgramImpact = ProgramImpact;
})();
