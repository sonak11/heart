/* Consolidated hub pages — tabbed shells that REUSE the existing screen
   components (no rewrites), plus a shared, filter-reactive "lens" header so
   every Intelligence page visibly responds to the global circle/domain/time
   filter. Loaded after all Dashboards*.jsx so window.<Screen> refs resolve. */
(function () {
  const UI = window.HEARTDesignSystem_d7d056;
  const G = window.HEART_DATA;

  // ---- Filter-reactive context strip shown atop every Intelligence page ----
  function LensHeader({ filters }) {
    const d = G.derive(filters);
    const stats = [
      { k: 'Interviews', v: d.interviews },
      { k: 'Participants', v: d.participants },
      { k: 'Coded segments', v: d.segments.toLocaleString() },
      { k: 'Composite', v: d.composite },
    ];
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
        background: 'var(--white)', border: 'var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)', padding: '12px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <span style={{ display: 'inline-flex', width: 30, height: 30, borderRadius: 'var(--radius-sm)', background: 'var(--scarlet-050)', color: 'var(--scarlet-600)', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><window.Icon.layers size={16} /></span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ font: 'var(--type-eyebrow)', lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--ink-400)' }}>Active lens</div>
            <div style={{ font: 'var(--type-sm)', lineHeight: 1.2, fontWeight: 600, color: 'var(--ink-800)' }}>{d.summary}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 26 }}>
          {stats.map((s) => (
            <div key={s.k} style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, color: 'var(--ink-900)', lineHeight: 1 }}>{s.v}</div>
              <div style={{ font: 'var(--type-meta)', color: 'var(--ink-400)', marginTop: 3 }}>{s.k}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---- Generic tabbed shell. tabs: [{ value, label, Comp, count? }] ----
  function Hub({ tabs, initialTab, filters, lens, onNavigate, compare }) {
    const { Tabs } = UI;
    const seed = tabs.some((t) => t.value === initialTab) ? initialTab : tabs[0].value;
    const [tab, setTab] = React.useState(seed);
    React.useEffect(() => {
      if (initialTab && tabs.some((t) => t.value === initialTab)) setTab(initialTab);
    }, [initialTab]);
    const active = tabs.find((t) => t.value === tab) || tabs[0];
    const Active = active.Comp;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {lens && <LensHeader filters={filters} />}
        <Tabs value={tab} onChange={setTab} tabs={tabs.map((t) => ({ value: t.value, label: t.label, count: t.count }))} />
        <div>{Active ? <Active onNavigate={onNavigate} filters={filters} compare={compare} /> : null}</div>
      </div>
    );
  }

  // ---- Intelligence hubs (lens-aware) ----
  function VoiceAuthority(props) {
    return <Hub {...props} lens tabs={[
      { value: 'divergence', label: 'Divergence', Comp: window.VoiceVsAuthority },
      { value: 'blindspot', label: 'Blind Spots', Comp: window.BlindSpotDetection },
      { value: 'authority', label: 'Authority', Comp: window.AuthorityAnalysis },
      { value: 'proximity', label: 'Proximity', Comp: window.ProximityAnalysis },
    ]} />;
  }
  function ThemeHub(props) {
    return <Hub {...props} lens tabs={[
      { value: 'themes', label: 'Theme intelligence', Comp: window.ThemeIntelligence },
      { value: 'emerging', label: 'Emerging themes', Comp: window.EmergingThemes },
    ]} />;
  }
  function EngagementHub(props) {
    return <Hub {...props} lens tabs={[
      { value: 'circles', label: 'Engagement circles', Comp: window.CircleIntelligence },
      { value: 'stakeholders', label: 'Stakeholders', Comp: window.StakeholderIntelligence },
      { value: 'trust', label: 'Trust & community', Comp: window.TrustCommunity },
    ]} />;
  }
  function GapsBarriers(props) {
    return <Hub {...props} lens tabs={[
      { value: 'gaps', label: 'Gap analysis', Comp: window.GapAnalysis },
      { value: 'barriers', label: 'Barrier intelligence', Comp: window.BarrierIntelligence },
    ]} />;
  }

  // ---- Evidence / Pipeline hubs (own controls; no global lens) ----
  function PatternsHub(props) {
    return <Hub {...props} tabs={[
      { value: 'network', label: 'Connection network', Comp: window.CrossPillarNetwork },
      { value: 'timeline', label: 'Trends & timeline', Comp: window.TrendTimeline },
      { value: 'geography', label: 'Geographic', Comp: window.Geographic },
    ]} />;
  }
  function ProgramsBlueprint(props) {
    return <Hub {...props} tabs={[
      { value: 'recommend', label: 'Blueprint recommendations', Comp: window.Recommendations },
      { value: 'program', label: 'Program impact', Comp: window.ProgramImpact },
    ]} />;
  }
  function Operations(props) {
    return <Hub {...props} tabs={[
      { value: 'agent', label: 'AI coding agent', Comp: window.AICodingWorkspace },
      { value: 'workflow', label: 'Workflow monitoring', Comp: window.WorkflowMonitoring },
      { value: 'reports', label: 'Report center', Comp: window.ReportCenter },
      { value: 'aws', label: 'Architecture', Comp: window.AWSArchitecture },
    ]} />;
  }

  window.Kit = Object.assign(window.Kit || {}, { LensHeader });
  Object.assign(window, { VoiceAuthority, ThemeHub, EngagementHub, GapsBarriers, PatternsHub, ProgramsBlueprint, Operations });
})();
