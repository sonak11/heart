/* HEART Copilot — right-side AI assistant drawer. window.Copilot
   Canned, deterministic "AI" responses keyed to the active screen. */
(function () {
  const { Badge } = window.HEARTDesignSystem_d7d056 || {};

  // Entrance animation. The drawer's OPEN state is its visible resting position,
  // so it is never stuck off-screen when CSS animations don't run (throttled /
  // non-painting previews, reduced-motion, print). The slide is a small,
  // freeze-safe nudge layered on top for browsers that do paint.
  if (typeof document !== 'undefined' && !document.getElementById('heart-copilot-styles')) {
    const st = document.createElement('style');
    st.id = 'heart-copilot-styles';
    st.textContent = '@keyframes heartCopilotIn{from{transform:translateX(24px)}to{transform:translateX(0)}}@media (prefers-reduced-motion: no-preference){.heart-copilot-drawer{animation:heartCopilotIn var(--dur-base,200ms) var(--ease-out,cubic-bezier(0.22,1,0.36,1))}}.heart-dot{width:6px;height:6px;border-radius:50%;background:var(--ink-300);display:inline-block}@keyframes heartDot{0%,80%,100%{opacity:.25;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}@media (prefers-reduced-motion: no-preference){.heart-dot{animation:heartDot 1.1s infinite}}';
    document.head.appendChild(st);
  }

  const SUGGEST = {
    overview: ['Summarize this quarter for the Dean', 'What are the top 3 risks?', 'Which pillar regressed and why?'],
    voice: ['Explain the biggest blind spot', 'Draft a narrative for leadership', 'Which themes is leadership over-indexing on?'],
    quotes: ['Summarize quotes about transportation', 'Find opposing viewpoints on trust', 'Build a citation for INT-2026-0142'],
    readiness: ['What is dragging the score down?', 'How do we get to 75?', 'Compare to last quarter'],
    theme: ['Which themes are emerging fastest?', 'Cluster the barriers', 'Summarize BARR-11'],
    gap: ['Rank gaps by evidence strength', 'What would close the transportation gap?'],
    default: ['Summarize this view', 'Generate an executive report', 'Find supporting quotes', 'Identify outliers'],
  };

  const ANSWERS = {
    'Summarize this quarter for the Dean': "Composite readiness rose to **67 (+5)**. Workforce and Community Partnerships improved; **Research Infrastructure slipped 5 pts**. The dominant signal is a widening **Voice–Authority gap**: community members raise transportation, language, and childcare barriers far more often than leadership acknowledges them. Recommended first move: a transportation-access task force (R1, 91% confidence, 138 segments).",
    'What are the top 3 risks?': "1. **Transportation access** — 41% of community interviews, 6% of leadership (gap +35). 2. **Language & interpretation** — emerging, +28 in two quarters. 3. **Research infrastructure regression** — pillar down 5 pts amid data-governance friction.",
    'Explain the biggest blind spot': "**Transportation access (BARR-04)** is the largest blind spot. It appears in **41%** of Community Voice segments but only **6%** of Leadership segments — a +35 divergence, the highest in the corpus. 138 coded segments and 12 high-salience quotes support it. This is a high-confidence, low-effort intervention target.",
    'Draft a narrative for leadership': "Across 247 interviews, the community is consistent: **the barriers to equity are logistical before they are clinical.** Transportation, interpretation, and childcare dominate community voice yet rarely surface in leadership interviews. Closing this perception gap — not new programs — is the fastest path to readiness gains this quarter.",
  };

  // Human-readable label for each route, used to ground the live Copilot.
  const SCREEN_LABEL = {
    overview: 'Executive Command Center', readiness: 'Health Equity Readiness Score',
    circle: 'Engagement & Stakeholders', theme: 'Theme Intelligence', emerging: 'Emerging Themes',
    voice: 'Voice vs Authority', blindspot: 'Blind Spot Detection', authority: 'Authority Analysis',
    proximity: 'Proximity Analysis', gap: 'Gaps & Barriers', barrier: 'Barrier Intelligence',
    trust: 'Trust & Community', stakeholder: 'Stakeholder Intelligence', quotes: 'Quote Explorer',
    matrix: 'Coding Matrix Explorer', network: 'Theme Connection Network', trend: 'Trends & Timeline',
    geo: 'Geographic Distribution', coding: 'Coding Quality', patterns: 'Connections, Trends & Geography',
    program: 'Program Impact', recommend: 'Programs & Blueprint', operations: 'Pipeline Operations',
    admin: 'AI Coding Agent Workspace', workflow: 'Workflow Monitoring', reports: 'Report Generation Center', aws: 'Future AWS Voice Agent Architecture',
  };

  // Ground every free-form question in HEART's domain + the screen the user is on,
  // so the Copilot answers real prompts (incl. "hello") instead of a canned blurb.
  function buildPrompt(q, screen) {
    const where = SCREEN_LABEL[screen] || 'the analytics platform';
    return [
      "You are HEART Copilot, the AI assistant embedded in HEART \u2014 a health-equity analytics platform for an academic medical center.",
      "HEART analyzes 247 qualitative community interviews, coded into themes, barriers, and three engagement circles (Community, Internal, Leadership).",
      "Context for this quarter (Q2 2026): composite readiness is 67/100, up 5 points from Q1. The dominant signal is a Voice\u2013Authority gap \u2014 community members raise logistical barriers (transportation, language/interpretation, childcare) far more often than leadership acknowledges. Transportation access (BARR-04) appears in 41% of community segments versus 6% of leadership segments. The Research Infrastructure pillar slipped 5 points.",
      "The user is currently viewing the \"" + where + "\" screen.",
      "Answer concisely: 2\u20134 short sentences or a tight bulleted list, under 110 words. Use **bold** for key figures. Never invent verbatim quotes or specific interview IDs. If the user simply greets you or asks something general, respond warmly and briefly, then offer a useful next step.",
      "",
      "User: " + q,
    ].join("\n");
  }

  function fmt(t) {
    return t.split('**').map((s, i) => i % 2 ? <strong key={i} style={{ color: 'var(--ink-900)' }}>{s}</strong> : <React.Fragment key={i}>{s}</React.Fragment>);
  }

  function Copilot({ open, onClose, screen }) {
    const [msgs, setMsgs] = React.useState([]);
    const [typing, setTyping] = React.useState('');
    const [busy, setBusy] = React.useState(false);
    const [thinking, setThinking] = React.useState(false);
    const bodyRef = React.useRef(null);
    const timers = React.useRef([]);
    const reqRef = React.useRef(0);
    const suggestions = SUGGEST[screen] || SUGGEST.default;

    React.useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [msgs, typing, thinking]);

    // Cancel any in-flight typewriter/timeout so a new question can't be clobbered by an old one.
    function cancelPending() {
      timers.current.forEach((id) => { clearInterval(id); clearTimeout(id); });
      timers.current = [];
      reqRef.current += 1; // invalidate any in-flight Copilot request
    }

    React.useEffect(() => () => cancelPending(), []);

    // Typewriter-reveal a finished answer, then commit it as a message.
    function typeOut(ans) {
      let i = 0;
      const id = setInterval(() => {
        i += 5;
        setTyping(ans.slice(0, i));
        if (i >= ans.length) {
          clearInterval(id);
          setTyping('');
          setBusy(false);
          setMsgs((m) => [...m, { role: 'ai', text: ans }]);
        }
      }, 12);
      timers.current.push(id);
    }

    const FALLBACK = "Here's what the evidence shows for this view. I cross-referenced the coding matrix and engagement-circle shares — the strongest signal is the **Voice–Authority divergence**, concentrated in community-raised logistical barriers. Ask me to pull the supporting quotes or draft a brief.";

    function ask(q) {
      cancelPending();
      const myReq = reqRef.current;
      setMsgs((m) => [...m, { role: 'user', text: q }]);
      setTyping('');
      setThinking(false);
      setBusy(true);

      // Headline questions keep their curated, instant answers.
      if (ANSWERS[q]) {
        const start = setTimeout(() => typeOut(ANSWERS[q]), 220);
        timers.current.push(start);
        return;
      }

      // Everything else gets a real, grounded Copilot response.
      if (!(window.claude && typeof window.claude.complete === 'function')) {
        const start = setTimeout(() => typeOut(FALLBACK), 220);
        timers.current.push(start);
        return;
      }

      setThinking(true);
      window.claude.complete({ messages: [{ role: 'user', content: buildPrompt(q, screen) }] })
        .then((reply) => {
          if (myReq !== reqRef.current) return; // superseded by a newer question
          setThinking(false);
          typeOut((reply || '').trim() || FALLBACK);
        })
        .catch(() => {
          if (myReq !== reqRef.current) return;
          setThinking(false);
          typeOut(FALLBACK);
        });
    }

    if (!open) return null;

    return (
      <div className="heart-copilot-drawer" style={{
        position: 'fixed', top: 0, right: 0, height: '100vh', width: 380, zIndex: 40,
        background: 'var(--white)', borderLeft: '1px solid var(--border-default)', boxShadow: 'var(--shadow-lg)',
        display: 'flex', flexDirection: 'column',
      }}>
        <header style={{ padding: '16px 18px', borderBottom: '1px solid var(--border-divider)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <span style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', background: 'var(--scarlet-500)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><window.Icon.sparkle size={16} /></span>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ font: 'var(--type-title)', color: 'var(--ink-900)' }}>HEART Copilot</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-400)' }}>Bedrock · grounded in coding matrix</div>
            </div>
          </div>
          <button type="button" onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ink-400)', fontSize: 20, lineHeight: 1 }}>×</button>
        </header>

        <div ref={bodyRef} style={{ flex: 1, overflowY: 'auto', padding: '18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {msgs.length === 0 && (
            <div style={{ color: 'var(--ink-500)', font: 'var(--type-sm)', lineHeight: 1.6 }}>
              Ask anything about this view. I cite the coding matrix and never invent quotes.
            </div>
          )}
          {msgs.map((m, i) => (
            <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '92%' }}>
              {m.role === 'ai' && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--scarlet-600)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Copilot</div>}
              <div style={{
                font: 'var(--type-sm)', lineHeight: 1.6,
                color: m.role === 'user' ? '#fff' : 'var(--ink-700)',
                background: m.role === 'user' ? 'var(--slate-800)' : 'var(--ink-100)',
                padding: '10px 13px', borderRadius: m.role === 'user' ? '10px 10px 2px 10px' : '2px 10px 10px 10px',
                whiteSpace: 'pre-wrap',
              }}>{fmt(m.text)}</div>
            </div>
          ))}
          {typing && (
            <div style={{ alignSelf: 'flex-start', maxWidth: '92%' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--scarlet-600)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Copilot</div>
              <div style={{ font: 'var(--type-sm)', lineHeight: 1.6, color: 'var(--ink-700)', background: 'var(--ink-100)', padding: '10px 13px', borderRadius: '2px 10px 10px 10px', whiteSpace: 'pre-wrap' }}>{fmt(typing)}<span style={{ opacity: 0.5 }}>▋</span></div>
            </div>
          )}
          {thinking && (
            <div style={{ alignSelf: 'flex-start', maxWidth: '92%' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--scarlet-600)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Copilot</div>
              <div style={{ background: 'var(--ink-100)', padding: '12px 14px', borderRadius: '2px 10px 10px 10px', display: 'inline-flex', gap: 5, alignItems: 'center' }}>
                <span className="heart-dot"></span><span className="heart-dot" style={{ animationDelay: '160ms' }}></span><span className="heart-dot" style={{ animationDelay: '320ms' }}></span>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '14px 16px', borderTop: '1px solid var(--border-divider)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
            {suggestions.map((s) => (
              <button key={s} type="button" disabled={busy} onClick={() => ask(s)} style={{ font: 'var(--type-sm)', color: busy ? 'var(--ink-300)' : 'var(--ink-600)', background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-pill)', padding: '5px 11px', cursor: busy ? 'default' : 'pointer', opacity: busy ? 0.6 : 1, textAlign: 'left' }}>{s}</button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (busy) return; const v = e.target.q.value.trim(); if (v) { ask(v); e.target.reset(); } }} style={{ display: 'flex', gap: 8, alignItems: 'center', background: 'var(--ink-100)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', padding: '4px 4px 4px 12px' }}>
            <input name="q" disabled={busy} placeholder={busy ? 'Copilot is responding…' : 'Ask the Copilot…'} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', font: 'var(--type-body)', color: 'var(--ink-800)', padding: '7px 0' }} />
            <button type="submit" disabled={busy} style={{ border: 'none', background: busy ? 'var(--ink-300)' : 'var(--scarlet-500)', color: '#fff', borderRadius: 'var(--radius-xs)', width: 32, height: 32, cursor: busy ? 'default' : 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><window.Icon.arrowRight size={16} /></button>
          </form>
        </div>
      </div>
    );
  }

  window.Copilot = Copilot;
})();
