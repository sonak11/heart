/* Dashboards A — Readiness Score · Theme Intelligence · Emerging Themes */
(function () {
  const G = window.HEART_DATA;
  const C = window.Charts;
  const K = window.Kit;
  const UI = window.HEARTDesignSystem_d7d056;

  // ============================= READINESS SCORE =============================
  function ReadinessScore({ onNavigate, filters }) {
    const { Panel, Badge, Button, KpiCard } = UI;
    const { Gauge, Sparkline, HBars } = C;
    const r = G.readiness;
    const d = G.derive(filters);
    const composite = d.composite;
    const prior = composite - (filters && filters.time === 'q1' ? -5 : 5);
    const delta = composite - prior;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <window.Kit.LensHeader filters={filters} />
        <K.Grid cols={3} style={{ gridTemplateColumns: '1.1fr 1fr 1fr' }}>
          <Panel eyebrow="Composite index" title="Health Equity Readiness Score">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Gauge value={composite} color={composite >= 70 ? 'var(--positive-500)' : 'var(--caution-500)'} label="of 100" size={240} />
              <Badge tone={delta >= 0 ? 'positive' : 'critical'} dot>{delta >= 0 ? '+' : ''}{delta} {d.tm.priorLabel}</Badge>
              <div style={{ marginTop: 10 }}><Sparkline values={d.time === 'q1' ? r.history.slice(0, 5) : r.history} w={200} h={40} color="var(--circle-internal)" /></div>
            </div>
          </Panel>
          <Panel eyebrow="Weighted drivers" title="What moves the score" action={<K.Tooltip label="Score = Σ(driver × weight)"><span style={{ color: 'var(--ink-400)' }}><window.Icon.alert size={15} /></span></K.Tooltip>}>
            <HBars items={r.drivers.map((d) => ({ label: d.label, value: d.value, color: d.value < 55 ? 'var(--critical-500)' : 'var(--circle-internal)' }))} max={100} />
          </Panel>
          <Panel eyebrow="By pillar" title="Pillar readiness">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {G.pillars.map((p) => (
                <button key={p.id} type="button" onClick={() => onNavigate('theme')} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 10, alignItems: 'center', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                  <span style={{ font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-800)' }}>{p.name}</span>
                  <Sparkline values={[p.prior, (p.prior+p.score)/2, p.score]} w={48} h={20} color={p.score < 60 ? 'var(--critical-500)' : p.color} fill={false} />
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 600, color: p.score < 60 ? 'var(--critical-600)' : 'var(--ink-800)', width: 28, textAlign: 'right' }}>{p.score}</span>
                </button>
              ))}
            </div>
          </Panel>
        </K.Grid>
        <K.AIInsight actions={[<Button key="a" size="sm" variant="secondary" onClick={() => onNavigate('voice')} iconRight={<window.Icon.arrowRight size={14} />}>See the gap</Button>]}>
          The score is held back most by <strong>community alignment (49/100)</strong>. Modeling suggests closing the top two voice gaps — transportation and interpretation access — would lift the composite to an estimated <strong>74</strong> next quarter, the largest single-lever move available.
        </K.AIInsight>
      </div>
    );
  }

  // ============================= THEME INTELLIGENCE =============================
  function ThemeIntelligence({ onNavigate }) {
    const { Panel, Badge, Button, Tag } = UI;
    const { Sparkline } = C;
    const [sel, setSel] = React.useState(null);
    const [sort, setSort] = React.useState('segments');
    const themes = [...G.themes].sort((a, b) => sort === 'segments' ? b.segments - a.segments : b.gap - a.gap);
    const sub = { 'BARR-04': ['Bus routes', 'Ride share', 'Distance', 'Parking'], 'BARR-11': ['Interpreters', 'Translated forms', 'Bilingual staff'], 'FAC-02': ['Prior harm', 'Representation', 'Continuity'] };

    return (
      <div style={{ display: 'grid', gridTemplateColumns: sel ? '1fr 340px' : '1fr', gap: 24, alignItems: 'start' }}>
        <Panel eyebrow="All parent codes" title="Theme intelligence" padded={false} action={
          <div style={{ display: 'inline-flex', gap: 4, padding: '0 4px' }}>
            {[['segments', 'Volume'], ['gap', 'Voice gap']].map(([k, l]) => <button key={k} type="button" onClick={() => setSort(k)} style={{ border: 'none', background: sort === k ? 'var(--ink-100)' : 'transparent', borderRadius: 'var(--radius-xs)', padding: '5px 10px', font: 'var(--type-sm)', fontWeight: 600, color: sort === k ? 'var(--ink-800)' : 'var(--ink-400)', cursor: 'pointer' }}>{l}</button>)}
          </div>
        }>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 90px 70px 60px', padding: '10px 20px', borderBottom: '1px solid var(--border-divider)', font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-400)' }}>
            <span>Theme</span><span>Prevalence by circle</span><span>Trend</span><span style={{ textAlign: 'right' }}>Segs</span><span style={{ textAlign: 'right' }}>Gap</span>
          </div>
          {themes.map((t) => {
            const tot = t.community + t.internal + t.leadership;
            return (
              <button key={t.code} type="button" onClick={() => setSel(t)} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 90px 70px 60px', alignItems: 'center', width: '100%', textAlign: 'left', border: 'none', borderBottom: '1px solid var(--border-divider)', background: sel && sel.code === t.code ? 'var(--scarlet-050)' : 'transparent', cursor: 'pointer', padding: '11px 20px' }}>
                <span><span style={{ font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-800)' }}>{t.name}</span> {t.emerging && <Badge tone="caution">emerging</Badge>}<div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-400)' }}>{t.code} · {t.parent}</div></span>
                <span style={{ display: 'flex', height: 12, borderRadius: 3, overflow: 'hidden', marginRight: 12 }}>
                  <span style={{ width: (t.community / tot) * 100 + '%', background: 'var(--circle-community)' }} />
                  <span style={{ width: (t.internal / tot) * 100 + '%', background: 'var(--circle-internal)' }} />
                  <span style={{ width: (t.leadership / tot) * 100 + '%', background: 'var(--circle-leadership)' }} />
                </span>
                <Sparkline values={t.trend} w={70} h={22} color="var(--ink-400)" fill={false} />
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: 'var(--ink-800)', textAlign: 'right' }}>{t.segments}</span>
                <span style={{ textAlign: 'right' }}><Badge tone={t.gap >= 25 ? 'critical' : t.gap >= 12 ? 'caution' : t.gap <= -12 ? 'info' : 'neutral'}>{t.gap > 0 ? '+' : ''}{t.gap}</Badge></span>
              </button>
            );
          })}
        </Panel>

        {sel && (
          <Panel eyebrow={sel.code} title={sel.name} action={<button type="button" onClick={() => setSel(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ink-400)', fontSize: 18 }}>×</button>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Badge tone="neutral">{sel.segments} segments</Badge>
                <Badge tone={sel.gap >= 25 ? 'critical' : 'caution'}>gap {sel.gap > 0 ? '+' : ''}{sel.gap}</Badge>
                <Badge tone="neutral">{G.pillarName(sel.pillar)}</Badge>
              </div>
              <div>
                <div style={{ font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-400)', marginBottom: 8 }}>Subcodes</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{(sub[sel.code] || ['—']).map((s) => <Tag key={s}>{s}</Tag>)}</div>
              </div>
              <K.AIInsight title="Summarize this theme">
                {sel.name} is raised in <strong>{sel.community}%</strong> of community vs <strong>{sel.leadership}%</strong> of leadership interviews{sel.emerging ? ' and is accelerating quarter over quarter' : ''}. {sel.gap >= 25 ? 'It is a high-priority blind spot.' : 'Recognition is comparatively balanced.'}
              </K.AIInsight>
              <Button variant="secondary" fullWidth onClick={() => onNavigate('quotes')} iconRight={<window.Icon.quote size={14} />}>View {sel.segments} supporting quotes</Button>
            </div>
          </Panel>
        )}
      </div>
    );
  }

  // ============================= EMERGING THEMES =============================
  function EmergingThemes({ onNavigate }) {
    const { Panel, Badge, Button } = UI;
    const { Sparkline } = C;
    const em = G.themes.filter((t) => t.emerging).map((t) => ({ ...t, momentum: t.trend[5] - t.trend[3] })).sort((a, b) => b.momentum - a.momentum);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <K.AIInsight title="Emerging signal detection">
          <strong>{em.length} themes</strong> are accelerating faster than the corpus average. <strong>Language &amp; interpretation</strong> shows the steepest rise (+{em[0].momentum} in two quarters) — flag for the next leadership review before it becomes a crisis.
        </K.AIInsight>
        <K.Grid cols={3}>
          {em.map((t) => (
            <Panel key={t.code} eyebrow={t.code} title={t.name}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 600, color: 'var(--circle-community)' }}>+{t.momentum}</div>
                  <div style={{ font: 'var(--type-meta)', color: 'var(--ink-400)' }}>momentum · 2 quarters</div>
                </div>
                <Sparkline values={t.trend} w={90} h={40} color="var(--circle-community)" />
              </div>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('theme')} iconRight={<window.Icon.arrowRight size={13} />}>Investigate</Button>
            </Panel>
          ))}
        </K.Grid>
      </div>
    );
  }

  window.ReadinessScore = ReadinessScore;
  window.ThemeIntelligence = ThemeIntelligence;
  window.EmergingThemes = EmergingThemes;
})();
