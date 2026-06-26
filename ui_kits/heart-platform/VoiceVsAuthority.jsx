/* Voice vs Authority — flagship divergence experience.
   Divergence + alignment scores, diverging chart, heatmap, blind-spot alerts, AI narrative. */
function VoiceVsAuthority({ onNavigate, filters }) {
  const { Panel, Badge, CircleBadge, Button, Tag } = window.HEARTDesignSystem_d7d056;
  const K = window.Kit, Charts = window.Charts, D = window.HEART_DATA;

  const lens = D.derive(filters);
  const themes = [...lens.themes].map((t) => ({ ...t })).sort((a, b) => b.gap - a.gap);
  const max = Math.max(...themes.map((t) => Math.max(t.community, t.leadership)));
  const divergence = Math.round(themes.reduce((a, t) => a + Math.abs(t.gap), 0) / themes.length);
  const alignment = Math.max(0, 100 - divergence * 3);

  function gapTone(gap) {
    if (gap >= 25) return 'critical';
    if (gap >= 12) return 'caution';
    if (gap <= -12) return 'info';
    return 'neutral';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Score banner */}
      <div style={{ background: 'var(--slate-900)', borderRadius: 'var(--radius-lg)', padding: '24px 28px', display: 'grid', gridTemplateColumns: 'auto auto 1fr', gap: 32, alignItems: 'center' }}>
        <div>
          <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--slate-200)', marginBottom: 6 }}>Divergence index</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 52, fontWeight: 600, color: '#fff', lineHeight: 1 }}>{divergence}<span style={{ fontSize: 22, color: 'var(--slate-200)' }}> pts</span></div>
        </div>
        <div style={{ borderLeft: '1px solid var(--slate-700)', paddingLeft: 32 }}>
          <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--slate-200)', marginBottom: 6 }}>Alignment score</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 52, fontWeight: 600, color: alignment < 60 ? '#E8A0AC' : '#7FD1A8', lineHeight: 1 }}>{alignment}<span style={{ fontSize: 22, color: 'var(--slate-200)' }}>/100</span></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <CircleBadge circle={1} />
            <span style={{ alignSelf: 'center', color: 'var(--slate-600)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>versus</span>
            <CircleBadge circle={3} />
          </div>
          <p style={{ font: 'var(--type-body)', color: 'var(--slate-200)', margin: 0, flex: 1 }}>
            On average, themes diverge <strong style={{ color: '#fff' }}>{divergence} points</strong> between community and leadership. <strong style={{ color: '#E8A0AC' }}>{themes.filter((t) => t.gap >= 25).length} severe blind spots</strong> drive most of it.
          </p>
        </div>
      </div>

      {/* AI narrative */}
      <K.AIInsight title="AI-generated narrative for leadership" actions={[
        <Button key="r" size="sm" variant="secondary" onClick={() => window.pushToast('Narrative copied to report', 'positive')} iconLeft={<window.Icon.download size={14} />}>Add to report</Button>,
      ]}>
        Across 247 interviews, the community is consistent: <strong>the barriers to equity are logistical before they are clinical.</strong> Transportation, interpretation, and childcare dominate community voice yet rarely surface in leadership interviews. Meanwhile leadership over-indexes on workforce pipeline and research infrastructure. Closing this perception gap — not launching new programs — is the fastest available path to readiness gains this quarter.
      </K.AIInsight>

      {/* Diverging chart */}
      <Panel eyebrow="Divergence" title="Theme prevalence — Community vs Leadership" action={
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontFamily: 'var(--font-sans)', fontSize: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--circle-community)' }} />Community</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--circle-leadership)' }} />Leadership</span>
        </div>
      }>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr 1fr 80px', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.04em', paddingBottom: 8, borderBottom: '1px solid var(--border-divider)' }}>
            <span>Theme</span><span style={{ textAlign: 'right', paddingRight: 12 }}>◄ Community</span><span style={{ paddingLeft: 12 }}>Leadership ►</span><span style={{ textAlign: 'right' }}>Gap</span>
          </div>
          {themes.map((t) => (
            <button key={t.code} type="button" onClick={() => onNavigate('quotes')} style={{ display: 'grid', gridTemplateColumns: '210px 1fr 1fr 80px', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-divider)', border: 'none', borderBottomStyle: 'solid', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ paddingRight: 12 }}>
                <div style={{ font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-800)' }}>{t.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-400)' }}>{t.code}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, paddingRight: 12, borderRight: '2px solid var(--border-strong)' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--circle-community)', fontWeight: 600, width: 22, textAlign: 'right' }}>{t.community}</span>
                <div style={{ width: (t.community / max) * 100 + '%', height: 16, background: 'var(--circle-community)', borderRadius: '3px 0 0 3px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 12 }}>
                <div style={{ width: (t.leadership / max) * 100 + '%', height: 16, background: 'var(--circle-leadership)', borderRadius: '0 3px 3px 0' }} />
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--circle-leadership)', fontWeight: 600, width: 22 }}>{t.leadership}</span>
              </div>
              <div style={{ textAlign: 'right' }}><Badge tone={gapTone(t.gap)}>{t.gap > 0 ? '+' : ''}{t.gap}</Badge></div>
            </button>
          ))}
        </div>
      </Panel>

      {/* Blind spot alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {themes.filter((t) => t.gap >= 25).map((t) => (
          <div key={t.code} style={{ background: 'var(--critical-100)', border: '1px solid #F2C2CA', borderRadius: 'var(--radius-md)', padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--critical-600)', marginBottom: 8 }}>
              <window.Icon.alert size={17} /><span style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' }}>Blind spot</span>
            </div>
            <div style={{ font: 'var(--type-title)', color: 'var(--ink-900)', marginBottom: 4 }}>{t.name}</div>
            <p style={{ font: 'var(--type-sm)', color: 'var(--ink-600)', margin: '0 0 12px' }}>Raised in <strong>{t.community}%</strong> of community interviews, only <strong>{t.leadership}%</strong> of leadership.</p>
            <Button size="sm" variant="secondary" onClick={() => onNavigate('quotes')} iconRight={<window.Icon.quote size={14} />}>See supporting quotes</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

window.VoiceVsAuthority = VoiceVsAuthority;
