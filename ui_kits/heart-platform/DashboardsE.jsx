/* Matrix-anchored dashboards — IA emerges directly from the HEART coding matrix.
   Engagement Circle Intelligence · Blind Spot Detection · Authority Analysis · Coding Matrix Explorer */

// ============================================================
// 2 · ENGAGEMENT CIRCLE INTELLIGENCE
// ============================================================
function CircleIntelligence({ onNavigate, filters }) {
  const UI = window.HEARTDesignSystem_d7d056, C = window.Charts, K = window.Kit, G = window.HEART_DATA;
  const { Panel, Badge, CircleBadge, Button } = UI;
  const d = G.derive(filters);
  const pool = d.domainStats.length >= 4 ? d.domainStats : G.domainStats;
  // top domains by total prevalence for the radar axes
  const top = [...pool].sort((a, b) => b.segments - a.segments).slice(0, 7);
  const axes = top.map((d) => ({ label: d.domain.code }));
  const radarSeries = [
    { label: 'Community', color: 'var(--circle-community)', values: top.map((d) => d.c1) },
    { label: 'Internal', color: 'var(--circle-internal)', values: top.map((d) => d.c2) },
    { label: 'Leadership', color: 'var(--circle-leadership)', values: top.map((d) => d.c3) },
  ];
  const rows = top.map((d) => d.domain.code);
  const matrix = top.map((d) => [d.c1, d.c2, d.c3]);
  const aligned = [...pool].sort((a, b) => Math.abs(a.voiceGap) - Math.abs(b.voiceGap)).slice(0, 3);
  const diverged = [...pool].sort((a, b) => Math.abs(b.voiceGap) - Math.abs(a.voiceGap)).slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <K.Grid cols={3} style={{ gridTemplateColumns: '1.1fr 1fr 1fr' }}>
        {G.authority && null}
        {[1, 2, 3].map((c) => {
          const cir = G.circles[c];
          const stat = G.domainStats.reduce((s, d) => s + (c === 1 ? d.c1 : c === 2 ? d.c2 : d.c3), 0);
          const lead = [...G.domainStats].sort((a, b) => (c === 1 ? b.c1 - a.c1 : c === 2 ? b.c2 - a.c2 : b.c3 - a.c3))[0];
          return (
            <Panel key={c} style={{ borderTop: `3px solid ${cir.color}` }}>
              <CircleBadge circle={c} />
              <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 34, fontWeight: 600, color: 'var(--ink-900)' }}>{lead.domain.code}</span>
                <span style={{ font: 'var(--type-sm)', color: 'var(--ink-500)' }}>dominant domain</span>
              </div>
              <div style={{ font: 'var(--type-sm)', color: 'var(--ink-600)', marginTop: 4 }}>{lead.domain.name}</div>
            </Panel>
          );
        })}
      </K.Grid>

      <K.Grid cols={2} style={{ gridTemplateColumns: '1fr 1fr' }}>
        <Panel eyebrow="Where the circles diverge" title="Domain emphasis by engagement circle"
          action={<div style={{ display: 'flex', gap: 12, font: 'var(--type-sm)' }}>
            {radarSeries.map((s) => <span key={s.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} />{s.label}</span>)}
          </div>}>
          <C.Radar axes={axes} series={radarSeries} size={340} max={48} />
        </Panel>
        <Panel eyebrow="Prevalence matrix" title="Domain × circle (share of coded segments)">
          <C.Heatmap rows={rows} cols={['C1', 'C2', 'C3']} matrix={matrix} fmt={(v) => v} onCell={() => onNavigate && onNavigate('voice')} />
          <div style={{ font: 'var(--type-meta)', color: 'var(--ink-400)', marginTop: 12 }}>Click any cell to open Voice vs Authority. Darker = higher share within that circle.</div>
        </Panel>
      </K.Grid>

      <K.Grid cols={2}>
        <Panel eyebrow="Consensus" title="Where perspectives align" action={<Badge tone="positive" dot>Shared ground</Badge>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {aligned.map((d) => (
              <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-divider)' }}>
                <div><div style={{ font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-800)' }}>{d.domain.name}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-400)' }}>{d.domain.code} · C1 {d.c1}% · C3 {d.c3}%</div></div>
                <Badge tone="neutral">Δ {Math.abs(d.voiceGap)}</Badge>
              </div>
            ))}
          </div>
        </Panel>
        <Panel eyebrow="Tension" title="Where perspectives diverge" action={<Badge tone="critical" dot>Misalignment</Badge>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {diverged.map((d) => (
              <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-divider)' }}>
                <div><div style={{ font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-800)' }}>{d.domain.name}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-400)' }}>{d.domain.code} · C1 {d.c1}% · C3 {d.c3}%</div></div>
                <Badge tone={d.voiceGap > 0 ? 'critical' : 'info'}>{d.voiceGap > 0 ? '+' : ''}{d.voiceGap}</Badge>
              </div>
            ))}
          </div>
        </Panel>
      </K.Grid>
    </div>
  );
}

// ============================================================
// 4 · BLIND SPOT DETECTION
// ============================================================
function BlindSpotDetection({ onNavigate, filters }) {
  const UI = window.HEARTDesignSystem_d7d056, C = window.Charts, K = window.Kit, G = window.HEART_DATA;
  const { Panel, Badge, Button } = UI;
  const dd = G.derive(filters);
  const pool = dd.domainStats.length >= 3 ? dd.domainStats : G.domainStats;
  const ranked = [...pool].sort((a, b) => b.blindspot - a.blindspot);
  const critical = ranked.filter((d) => d.blindspot >= 18);
  const index = Math.round(critical.reduce((s, d) => s + d.blindspot, 0) / Math.max(1, critical.length));
  const maxBs = ranked[0].blindspot;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ background: 'var(--slate-900)', borderRadius: 'var(--radius-lg)', padding: '24px 28px', color: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28 }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--slate-200)', marginBottom: 10 }}>Blind Spot Index · Q2 2026</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 60, fontWeight: 600, lineHeight: 0.95, color: '#fff' }}>{index}</span>
            <Badge tone="critical" dot>{critical.length} critical gaps</Badge>
          </div>
          <p style={{ font: 'var(--type-body)', color: 'var(--slate-200)', marginTop: 12, marginBottom: 0 }}>Composite of three divergences: <strong style={{ color: '#fff' }}>community vs leadership</strong>, <strong style={{ color: '#fff' }}>low vs high authority</strong>, and <strong style={{ color: '#fff' }}>directly vs indirectly affected</strong>. High values mean frontline voices raise an issue leadership rarely names.</p>
        </div>
        <div style={{ flex: 'none' }}><C.Gauge value={index} max={40} size={180} color="var(--critical-500)" label="index" /></div>
      </div>

      <Panel eyebrow="Ranked" title="Blind spot ranking — all 13 domains"
        action={<Button size="sm" variant="ghost" onClick={() => window.pushToast && window.pushToast('Exporting blind-spot register…', 'neutral')}>Export register</Button>}>
        <div style={{ display: 'grid', gridTemplateColumns: '22px 1fr 80px 80px 80px 120px', alignItems: 'center', gap: 10, font: 'var(--type-meta)', color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.04em', paddingBottom: 10, borderBottom: '1px solid var(--border-divider)' }}>
          <span>#</span><span>Domain</span><span style={{ textAlign: 'center' }}>Voice</span><span style={{ textAlign: 'center' }}>Author.</span><span style={{ textAlign: 'center' }}>Proxim.</span><span style={{ textAlign: 'right' }}>Blind spot</span>
        </div>
        {ranked.map((d, i) => (
          <div key={d.id} style={{ display: 'grid', gridTemplateColumns: '22px 1fr 80px 80px 80px 120px', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border-divider)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-400)' }}>{i + 1}</span>
            <div><div style={{ font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-800)' }}>{d.domain.name}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-400)' }}>{d.domain.code}</div></div>
            <span style={{ textAlign: 'center', fontFamily: 'var(--font-serif)', fontSize: 14, color: d.voiceGap > 0 ? 'var(--critical-600)' : 'var(--ink-400)' }}>{d.voiceGap > 0 ? '+' : ''}{d.voiceGap}</span>
            <span style={{ textAlign: 'center', fontFamily: 'var(--font-serif)', fontSize: 14, color: d.authorityGap > 0 ? 'var(--critical-600)' : 'var(--ink-400)' }}>{d.authorityGap > 0 ? '+' : ''}{d.authorityGap}</span>
            <span style={{ textAlign: 'center', fontFamily: 'var(--font-serif)', fontSize: 14, color: d.proximityGap > 0 ? 'var(--critical-600)' : 'var(--ink-400)' }}>{d.proximityGap > 0 ? '+' : ''}{d.proximityGap}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <div style={{ width: 56, height: 8, background: 'var(--ink-100)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: Math.max(0, (d.blindspot / maxBs) * 100) + '%', height: '100%', background: d.blindspot >= 18 ? 'var(--critical-500)' : 'var(--caution-500)', borderRadius: 999 }} />
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: 'var(--ink-900)', width: 26, textAlign: 'right' }}>{d.blindspot}</span>
            </div>
          </div>
        ))}
      </Panel>

      <div>
        <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)', marginBottom: 12 }}>Critical gap alerts</div>
        <K.Grid cols={3}>
          {critical.slice(0, 3).map((d) => (
            <div key={d.id} style={{ background: 'var(--critical-100)', border: '1px solid var(--critical-500)', borderRadius: 'var(--radius-md)', padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--critical-600)', marginBottom: 8 }}>
                <window.Icon.alert size={17} /><span style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' }}>Undiscussed at the top</span>
              </div>
              <div style={{ font: 'var(--type-title)', color: 'var(--ink-900)', marginBottom: 6 }}>{d.domain.name}</div>
              <p style={{ font: 'var(--type-sm)', color: 'var(--ink-600)', margin: '0 0 12px' }}>Raised by <strong>{d.lo}%</strong> of low-authority and <strong>{d.c1}%</strong> of community interviews — only <strong>{d.c3}%</strong> of leadership.</p>
              <Button size="sm" variant="secondary" iconRight={<window.Icon.quote size={14} />} onClick={() => onNavigate && onNavigate('quotes')}>See evidence</Button>
            </div>
          ))}
        </K.Grid>
      </div>
    </div>
  );
}

// ============================================================
// 5 · AUTHORITY ANALYSIS
// ============================================================
function AuthorityAnalysis() {
  const UI = window.HEARTDesignSystem_d7d056, C = window.Charts, K = window.Kit, G = window.HEART_DATA;
  const { Panel, Badge } = UI;
  const segs = [
    { key: 'hi', label: 'High Authority', color: 'var(--circle-leadership)' },
    { key: 'med', label: 'Medium Authority', color: 'var(--circle-internal)' },
    { key: 'lo', label: 'Low Authority', color: 'var(--circle-community)' },
  ];
  const items = G.authority.focus.map((f) => ({ label: f.topic, parts: { hi: f.hi, med: f.med, lo: f.lo } }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <K.Grid cols={3}>
        {G.authority.levels.map((l) => (
          <Panel key={l.id} style={{ borderLeft: `3px solid ${l.color}` }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div style={{ font: 'var(--type-title)', color: 'var(--ink-900)' }}>{l.label}</div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 600, color: l.color }}>{l.n}</span>
            </div>
            <div style={{ font: 'var(--type-sm)', color: 'var(--ink-500)', marginTop: 4 }}>{l.sub}</div>
          </Panel>
        ))}
      </K.Grid>

      <Panel eyebrow="Who talks about what" title="Topic ownership by decision authority"
        action={<div style={{ display: 'flex', gap: 12, font: 'var(--type-sm)' }}>{segs.map((s) => <span key={s.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} />{s.label.split(' ')[0]}</span>)}</div>}>
        <C.StackedBars items={items} segs={segs} />
        <K.AIInsight title="Authority insight" >
          <strong>Solutions and measurement are owned at the top; barriers and trust are owned at the bottom.</strong> High-authority stakeholders account for 44–49% of solution and measurement segments but only 15–18% of barrier and trust segments — the people naming problems are rarely the people empowered to fix them.
        </K.AIInsight>
      </Panel>

      <Panel eyebrow="Domain lens" title="Domain emphasis — low vs high authority"
        action={<Badge tone="neutral">Δ = low − high</Badge>}>
        <C.HBars items={[...G.domainStats].sort((a, b) => b.authorityGap - a.authorityGap).slice(0, 8).map((d) => ({ label: d.domain.code + ' · ' + d.domain.name.split(' ').slice(0, 2).join(' '), value: d.authorityGap, color: d.authorityGap > 0 ? 'var(--circle-community)' : 'var(--circle-leadership)' }))} max={50} />
      </Panel>
    </div>
  );
}

// ============================================================
// 16 · CODING MATRIX EXPLORER
// ============================================================
function CodingMatrixExplorer() {
  const UI = window.HEARTDesignSystem_d7d056, K = window.Kit, G = window.HEART_DATA;
  const { Panel, Badge, CircleBadge, Tag, Button, Input } = UI;
  const [expanded, setExpanded] = React.useState(G.matrixRows[0].interview);
  const [oneHot, setOneHot] = React.useState(false);
  const onehotKeys = ['D1', 'D2', 'D4', 'D5', 'D8', 'D9', 'D11'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <Input style={{ flex: 1, minWidth: 240 }} label="Search interviews, codes, subcodes" iconLeft={<window.Icon.search size={16} />} placeholder="e.g. BARR, trust, INT-2026" />
        <Button variant={oneHot ? 'primary' : 'secondary'} onClick={() => setOneHot((v) => !v)} iconLeft={<window.Icon.layers size={15} />}>One-hot encoding</Button>
        <Button variant="secondary" onClick={() => window.pushToast && window.pushToast('Exporting coding matrix → CSV', 'positive')} iconLeft={<window.Icon.download size={15} />}>CSV</Button>
        <Button variant="secondary" onClick={() => window.pushToast && window.pushToast('Exporting coding matrix → XLSX', 'positive')} iconLeft={<window.Icon.download size={15} />}>Excel</Button>
      </div>

      {oneHot ? (
        <Panel eyebrow="Machine-readable" title="One-hot encoded matrix" padded={false}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', font: 'var(--type-meta)', color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.04em', position: 'sticky', left: 0, background: 'var(--white)' }}>Interview</th>
                  {onehotKeys.map((k) => <th key={k} style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' }}>{G.domainById(k).code}</th>)}
                </tr>
              </thead>
              <tbody>
                {G.matrixRows.map((r) => (
                  <tr key={r.interview} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                    <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-700)', position: 'sticky', left: 0, background: 'var(--white)' }}>{r.interview}</td>
                    {onehotKeys.map((k) => {
                      const v = r.onehot[k];
                      return <td key={k} style={{ textAlign: 'center', padding: '10px 8px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: v ? 'var(--positive-600)' : 'var(--ink-300)' }}>{v != null ? v : 0}</span>
                      </td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '12px 16px', font: 'var(--type-meta)', color: 'var(--ink-400)', borderTop: '1px solid var(--border-divider)' }}>1 = domain coded present in interview · 0 = absent. This structured output feeds the analytics pipeline.</div>
        </Panel>
      ) : (
        <Panel eyebrow="Raw coding output" title="Interview → codes → subcodes → quote" padded={false}>
          {G.matrixRows.map((r) => {
            const open = expanded === r.interview;
            const dom = G.domainById(r.domain);
            const auth = G.authority.levels.find((a) => a.id === r.authority);
            const q = G.quotes.find((x) => x.id === r.quote);
            return (
              <div key={r.interview} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                <button type="button" onClick={() => setExpanded(open ? null : r.interview)} style={{ width: '100%', display: 'grid', gridTemplateColumns: '20px 150px 1fr 130px 120px', alignItems: 'center', gap: 12, padding: '12px 16px', border: 'none', background: open ? 'var(--ink-100)' : 'transparent', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ color: 'var(--ink-400)', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform var(--dur-fast)' }}><window.Icon.arrowRight size={14} /></span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-700)' }}>{r.interview}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: dom.color }} /><span style={{ font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-800)' }}>{dom.name}</span></span>
                  <CircleBadge circle={r.circle} size="sm" />
                  <Badge tone="neutral">{auth.label.split(' ')[0]} authority</Badge>
                </button>
                {open && (
                  <div style={{ padding: '4px 16px 20px 48px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                      <span style={{ font: 'var(--type-meta)', color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.04em', marginRight: 4 }}>Subcodes</span>
                      {r.subs.map((s) => <Tag key={s}>{s}</Tag>)}
                      <span style={{ font: 'var(--type-meta)', color: 'var(--ink-400)', marginLeft: 8 }}>{r.proximity === 'dir' ? 'Directly affected' : 'Indirectly affected'} · {r.role}</span>
                    </div>
                    {q && (
                      <div style={{ background: 'var(--white)', borderLeft: `3px solid ${G.circles[r.circle].color}`, border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-sm)', padding: '14px 18px' }}>
                        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.5, color: 'var(--ink-900)', margin: 0 }}>“{q.text}”</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </Panel>
      )}
    </div>
  );
}

window.CircleIntelligence = CircleIntelligence;
window.BlindSpotDetection = BlindSpotDetection;
window.AuthorityAnalysis = AuthorityAnalysis;
window.CodingMatrixExplorer = CodingMatrixExplorer;
