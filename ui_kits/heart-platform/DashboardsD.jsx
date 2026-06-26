/* Dashboards D — Coding Quality / Human-vs-AI / Coverage / Recruitment · Recommendations */
(function () {
  const G = window.HEART_DATA;
  const C = window.Charts;
  const K = window.Kit;
  const UI = window.HEARTDesignSystem_d7d056;

  // ============================= CODING QUALITY =============================
  function CodingQuality({ onNavigate }) {
    const { Panel, Badge, KpiCard, Tabs } = UI;
    const { Heatmap } = C;
    const [tab, setTab] = React.useState('agreement');
    const cd = G.coding;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <K.Grid cols={4}>
          <KpiCard label="AI ↔ human agreement" value="91" unit="%" accent="var(--positive-600)" trend="up" trendValue="+2" />
          <KpiCard label="Segments coded" value="5,840" caption="across 247 interviews" />
          <KpiCard label="Human-reviewed" value="36" unit="%" caption="2,106 segments QA'd" />
          <KpiCard label="Interview coverage" value="247" unit="/280" accent="var(--circle-internal)" caption="88% of scheduled" />
        </K.Grid>
        <Panel padded={false}>
          <div style={{ padding: '0 20px' }}><Tabs value={tab} onChange={setTab} tabs={[{ value: 'agreement', label: 'AI vs Human' }, { value: 'confusion', label: 'Confusion matrix' }, { value: 'coverage', label: 'Coverage & recruitment' }]} /></div>
          <div style={{ padding: 20 }}>
            {tab === 'agreement' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {cd.aiVsHuman.map((x) => {
                  const max = Math.max(x.ai, x.human), agree = 100 - Math.round((Math.abs(x.ai - x.human) / max) * 100);
                  return (
                    <div key={x.code} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr 60px', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-600)' }}>{x.code}</span>
                      <span style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 6 }}><span style={{ font: 'var(--type-meta)', color: 'var(--ink-400)' }}>AI {x.ai}</span><div style={{ width: (x.ai / max) * 100 + '%', maxWidth: 160, height: 12, background: 'var(--scarlet-400)', borderRadius: '3px 0 0 3px' }} /></span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: (x.human / max) * 100 + '%', maxWidth: 160, height: 12, background: 'var(--slate-600)', borderRadius: '0 3px 3px 0' }} /><span style={{ font: 'var(--type-meta)', color: 'var(--ink-400)' }}>Human {x.human}</span></span>
                      <Badge tone={agree >= 95 ? 'positive' : 'caution'}>{agree}%</Badge>
                    </div>
                  );
                })}
                <div style={{ display: 'flex', gap: 16, marginTop: 8, font: 'var(--type-sm)', color: 'var(--ink-500)' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--scarlet-400)' }} />AI agent</span><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--slate-600)' }} />Human coder</span></div>
              </div>
            )}
            {tab === 'confusion' && (
              <div style={{ maxWidth: 480 }}>
                <Heatmap rows={cd.parents} cols={['Barr', 'Fac', 'Work', 'Res']} matrix={cd.confusion} fmt={(v) => v + '%'} colorFn={(v) => v > 80 ? 'var(--positive-500)' : v > 10 ? 'var(--caution-400, var(--caution-500))' : 'var(--ink-100)'} />
                <p style={{ font: 'var(--type-sm)', color: 'var(--ink-500)', marginTop: 14 }}>Diagonal = self-agreement. Off-diagonal cells show where the agent confuses one parent code for another. Highest confusion: Facilitators ↔ Workforce (7%).</p>
              </div>
            )}
            {tab === 'coverage' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div>
                  <div style={{ font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-400)', marginBottom: 12 }}>Recruitment funnel</div>
                  {[['Invited', 412, 1], ['Scheduled', 280, 0.68], ['Conducted', 261, 0.63], ['Transcribed', 254, 0.62], ['Coded', 247, 0.6]].map(([l, n, f]) => (
                    <div key={l} style={{ marginBottom: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--type-sm)', marginBottom: 4 }}><span style={{ color: 'var(--ink-700)' }}>{l}</span><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-500)' }}>{n}</span></div>
                      <div style={{ height: 22, background: 'var(--ink-100)', borderRadius: 4, overflow: 'hidden' }}><div style={{ width: f * 100 + '%', height: '100%', background: 'var(--circle-internal)', opacity: 0.4 + f * 0.6 }} /></div>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-400)', marginBottom: 12 }}>Coverage by circle</div>
                  {[1, 2, 3].map((c) => {
                    const pct = [92, 84, 71][c - 1];
                    return <div key={c} style={{ marginBottom: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--type-sm)', marginBottom: 4 }}><span style={{ color: 'var(--ink-700)' }}>{G.circles[c].label}</span><span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600 }}>{pct}%</span></div>
                      <div style={{ height: 8, background: 'var(--ink-100)', borderRadius: 999, overflow: 'hidden' }}><div style={{ width: pct + '%', height: '100%', background: G.circles[c].color }} /></div>
                    </div>;
                  })}
                  <K.AIInsight title="Coverage gap">Leadership coverage (71%) lags. Six scheduled dean interviews remain — completing them will sharpen the Voice vs Authority comparison.</K.AIInsight>
                </div>
              </div>
            )}
          </div>
        </Panel>
      </div>
    );
  }

  // ============================= RECOMMENDATIONS =============================
  function Recommendations({ onNavigate }) {
    const { Panel, Badge, Button } = UI;
    const { Scatter } = C;
    const recs = G.recommendations;
    const tiers = { now: 'Do now', next: 'Do next', later: 'Later' };
    const tierTone = { now: 'critical', next: 'caution', later: 'neutral' };
    const points = recs.map((r) => ({ id: r.id, impact: r.impact, effort: r.effort, confidence: r.confidence, color: r.tier === 'now' ? 'var(--scarlet-500)' : r.tier === 'next' ? 'var(--caution-500)' : 'var(--ink-400)' }));
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24, alignItems: 'start' }}>
        <Panel eyebrow="Prioritization" title="Impact vs effort">
          <Scatter points={points} onPoint={() => {}} />
          <p style={{ font: 'var(--type-meta)', color: 'var(--ink-400)', marginTop: 8 }}>Bubble size = AI confidence. Top-left = quick wins.</p>
        </Panel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <K.AIInsight title="AI-generated recommendations">
            Ranked from <strong>{recs.length} interventions</strong> by modeled impact, effort, and evidence strength. Each is grounded in coded segments — click to trace the quotes behind it.
          </K.AIInsight>
          {recs.map((r) => (
            <div key={r.id} style={{ background: 'var(--white)', border: 'var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-400)', width: 24 }}>{r.id}</span>
              <div style={{ flex: 1 }}>
                <div style={{ font: 'var(--type-body)', fontWeight: 600, color: 'var(--ink-900)' }}>{r.title}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 7, flexWrap: 'wrap' }}>
                  <Badge tone={tierTone[r.tier]}>{tiers[r.tier]}</Badge>
                  <Badge tone="neutral">{G.pillarName(r.pillar)}</Badge>
                  <Badge tone="neutral">{Math.round(r.confidence * 100)}% confidence</Badge>
                </div>
              </div>
              <button type="button" onClick={() => onNavigate('quotes')} style={{ border: '1px solid var(--border-default)', background: 'var(--white)', borderRadius: 'var(--radius-sm)', padding: '7px 11px', cursor: 'pointer', font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-600)', display: 'inline-flex', gap: 6, alignItems: 'center', whiteSpace: 'nowrap' }}>{r.evidence} segs<window.Icon.arrowRight size={13} /></button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  window.CodingQuality = CodingQuality;
  window.Recommendations = Recommendations;
})();
