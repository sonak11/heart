/* Executive Mode — the 2-minute Dean briefing. window.ExecutiveMode */
function ExecutiveMode({ onNavigate, onExit }) {
  const { Button, Badge } = window.HEARTDesignSystem_d7d056;
  const D = window.HEART_DATA;
  const risks = [...D.themes].sort((a, b) => b.gap - a.gap).slice(0, 3);
  const opps = D.recommendations.filter((r) => r.tier === 'now');
  const emerging = D.themes.filter((t) => t.emerging).slice(0, 3);

  const Col = ({ icon, tone, title, children }) => (
    <div style={{ background: 'var(--slate-800)', borderRadius: 'var(--radius-lg)', padding: '22px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16, color: tone }}>
        {React.createElement(window.Icon[icon], { size: 18 })}
        <span style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' }}>{title}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--slate-900)', color: 'var(--slate-100)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 48px', borderBottom: '1px solid var(--slate-700)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', background: 'var(--scarlet-500)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 18 }}>H</div>
          <div>
            <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--slate-200)' }}>Executive Briefing · Q2 2026</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16, color: '#fff', letterSpacing: '0.04em' }}>HEART for Leadership</div>
          </div>
        </div>
        <button type="button" onClick={onExit} style={{ border: '1px solid var(--slate-600)', background: 'transparent', color: 'var(--slate-100)', borderRadius: 'var(--radius-sm)', padding: '8px 16px', cursor: 'pointer', font: 'var(--type-sm)', fontWeight: 600 }}>Exit to full platform</button>
      </header>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 48px 64px' }}>
        {/* Headline finding */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--slate-200)', marginBottom: 14 }}>The one thing to know</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 46, lineHeight: 1.12, color: '#fff', margin: 0, maxWidth: 920, letterSpacing: '-0.02em', textWrap: 'balance' }}>
            Readiness rose to <span style={{ color: '#7FD1A8' }}>67</span>, but the community keeps naming logistical barriers that leadership rarely hears.
          </h1>
          <div style={{ display: 'flex', gap: 28, marginTop: 26 }}>
            {[['67', 'Readiness', '#7FD1A8'], ['31%', 'Voice gap', '#E8A0AC'], ['247', 'Interviews', '#fff'], ['3', 'Blind spots', '#E8A0AC']].map(([v, l, c]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 600, color: c, lineHeight: 1 }}>{v}</div>
                <div style={{ font: 'var(--type-meta)', color: 'var(--slate-200)', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Three columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 18 }}>
          <Col icon="alert" tone="#E8A0AC" title="Risks">
            {risks.map((t) => (
              <div key={t.code} style={{ borderBottom: '1px solid var(--slate-700)', paddingBottom: 12 }}>
                <div style={{ font: 'var(--type-body)', fontWeight: 600, color: '#fff' }}>{t.name}</div>
                <div style={{ font: 'var(--type-sm)', color: 'var(--slate-200)', marginTop: 3 }}>Community {t.community}% · Leadership {t.leadership}% · gap +{t.gap}</div>
              </div>
            ))}
          </Col>
          <Col icon="check" tone="#7FD1A8" title="Opportunities">
            {opps.map((r) => (
              <div key={r.id} style={{ borderBottom: '1px solid var(--slate-700)', paddingBottom: 12 }}>
                <div style={{ font: 'var(--type-body)', fontWeight: 600, color: '#fff' }}>{r.title}</div>
                <div style={{ font: 'var(--type-sm)', color: 'var(--slate-200)', marginTop: 3 }}>{Math.round(r.confidence * 100)}% confidence · {r.evidence} segments</div>
              </div>
            ))}
          </Col>
          <Col icon="sparkle" tone="#F0C77A" title="Emerging">
            {emerging.map((t) => (
              <div key={t.code} style={{ borderBottom: '1px solid var(--slate-700)', paddingBottom: 12 }}>
                <div style={{ font: 'var(--type-body)', fontWeight: 600, color: '#fff' }}>{t.name}</div>
                <div style={{ font: 'var(--type-sm)', color: 'var(--slate-200)', marginTop: 3 }}>+{t.trend[5] - t.trend[3]} in two quarters</div>
              </div>
            ))}
          </Col>
        </div>

        {/* Recommended actions */}
        <div style={{ background: 'var(--scarlet-600)', borderRadius: 'var(--radius-lg)', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div>
            <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Recommended first move</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 600, color: '#fff', maxWidth: 720, lineHeight: 1.2 }}>Stand up a transportation-access task force — the single highest-impact, lowest-effort lever this quarter.</div>
          </div>
          <Button variant="secondary" onClick={() => onNavigate('recommend')} iconRight={<window.Icon.arrowRight size={16} />} style={{ flex: 'none' }}>See all actions</Button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32 }}>
          <Button variant="authority" onClick={() => onNavigate('voice')} iconLeft={<window.Icon.scale size={15} />}>Voice vs Authority</Button>
          <Button variant="authority" onClick={() => onNavigate('reports')} iconLeft={<window.Icon.download size={15} />}>Download full report</Button>
        </div>
      </div>
    </div>
  );
}

window.ExecutiveMode = ExecutiveMode;
