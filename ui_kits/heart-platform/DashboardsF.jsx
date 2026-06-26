/* Pipeline screens — AI Coding Agent Workspace · Report Generation Center
   Workflow Monitoring · Future AWS Voice Agent Architecture */

// ============================================================
// 17 · AI CODING AGENT WORKSPACE
// ============================================================
function AICodingWorkspace() {
  const UI = window.HEARTDesignSystem_d7d056, K = window.Kit, G = window.HEART_DATA;
  const { Panel, Badge, Button, Tag, CircleBadge, Tabs } = UI;
  const [stage, setStage] = React.useState('review'); // upload | running | review
  const [decided, setDecided] = React.useState({});
  const [tab, setTab] = React.useState('review');

  // --- Prompt Management: real, stateful version control ---
  const DEFAULT_PROMPT = `You are a qualitative coding agent for the HEART
health-equity framework. Read each transcript
segment and assign:
  • parent domain (1 of 13)
  • subcode(s)
  • confidence 0–1
Return strict JSON. Never invent codes outside
the matrix. Flag ambiguous segments for human
review.`;
  const [promptText, setPromptText] = React.useState(DEFAULT_PROMPT);
  const [draft, setDraft] = React.useState(DEFAULT_PROMPT);
  const [editing, setEditing] = React.useState(false);
  const [versions, setVersions] = React.useState([
    { v: 'v4', note: 'Added confidence + review flag', agree: 91, live: true },
    { v: 'v3', note: 'Constrained to 13-domain matrix', agree: 87 },
    { v: 'v2', note: 'Subcode support', agree: 82 },
    { v: 'v1', note: 'Initial parent-only', agree: 74 },
  ]);
  const liveV = (versions.find((x) => x.live) || versions[0]).v;
  const nextV = 'v' + (Math.max.apply(null, versions.map((x) => parseInt(x.v.slice(1), 10))) + 1);
  function startEdit() { setDraft(promptText); setEditing(true); }
  function deployPrompt() {
    const text = editing ? (draft.trim() || promptText) : promptText;
    setPromptText(text);
    setVersions((vs) => [{ v: nextV, note: editing ? 'Edited coding instructions' : 'Re-deployed current prompt', agree: 91, live: true }, ...vs.map((x) => ({ ...x, live: false }))]);
    setEditing(false);
    window.pushToast('Prompt ' + nextV + ' deployed · now live', 'positive');
  }

  const candidates = [
    { id: 'c1', segment: "If I can't get a ride to the clinic, none of the rest matters.", domain: 'D5', sub: 'Structural Barriers', conf: 0.94 },
    { id: 'c2', segment: 'My mother filled the intake forms out wrong — nobody translated them.', domain: 'D5', sub: 'Resource Limitations', conf: 0.88 },
    { id: 'c3', segment: 'People trust someone who looks like them and speaks their language.', domain: 'D8', sub: 'Trust', conf: 0.91 },
    { id: 'c4', segment: 'The data lives in five systems and no one owns governance.', domain: 'D4', sub: 'Measurement Gaps', conf: 0.79 },
  ];
  const decide = (id, v) => { setDecided((d) => ({ ...d, [id]: v })); window.pushToast(v === 'approve' ? 'Code approved' : 'Code rejected', v === 'approve' ? 'positive' : 'critical'); };
  const approved = Object.values(decided).filter((v) => v === 'approve').length;

  const run = () => {
    setStage('running');
    window.pushToast('Coding agent running…', 'neutral');
    setTimeout(() => { setStage('review'); window.pushToast('4 candidate codes generated', 'positive'); }, 1400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Tabs value={tab} onChange={setTab} tabs={[{ value: 'review', label: 'Transcript & Review' }, { value: 'agreement', label: 'LLM vs Human', count: 5 }, { value: 'prompts', label: 'Prompt Management' }]} />

      {tab === 'review' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 18, alignItems: 'start' }}>
          {/* Left — transcript + run */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Panel eyebrow="Step 1" title="Transcript" action={<Badge tone="neutral">INT-2026-0142</Badge>}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <CircleBadge circle={1} size="sm" /><Badge tone="neutral">Community member</Badge><Badge tone="neutral">Mobile clinic</Badge>
              </div>
              <div style={{ background: 'var(--ink-100)', border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-sm)', padding: '14px 16px', font: 'var(--type-sm)', color: 'var(--ink-600)', lineHeight: 1.65, maxHeight: 168, overflow: 'auto' }}>
                <p style={{ margin: '0 0 10px' }}><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)' }}>00:04:12 · Participant</span><br />If I can't get a ride to the clinic, none of the rest matters. I've missed three appointments this year because the bus doesn't run on time out here.</p>
                <p style={{ margin: 0 }}><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)' }}>00:05:48 · Participant</span><br />My mother filled the intake forms out wrong and they almost gave her the wrong medication. Nobody translated them.</p>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                <Button variant="secondary" iconLeft={<window.Icon.file size={15} />} onClick={() => window.pushToast('Upload transcript (.txt, .docx, .vtt)', 'neutral')}>Upload transcript</Button>
                <Button variant="primary" iconLeft={<window.Icon.sparkle size={15} />} onClick={run} disabled={stage === 'running'}>{stage === 'running' ? 'Running…' : 'Run coding agent'}</Button>
              </div>
            </Panel>
            <Panel eyebrow="Step 3" title="One-hot encoding output" action={<Button size="sm" variant="ghost" iconLeft={<window.Icon.download size={14} />} onClick={() => window.pushToast('Exported one-hot vector → CSV', 'positive')}>CSV</Button>}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['D5', 'D8', 'D4', 'D1', 'D2', 'D7', 'D9', 'D11'].map((k) => {
                  const present = candidates.some((c) => c.domain === k && decided[c.id] === 'approve');
                  return <span key={k} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, padding: '5px 9px', borderRadius: 'var(--radius-xs)', background: present ? 'var(--positive-100)' : 'var(--ink-100)', color: present ? 'var(--positive-600)' : 'var(--ink-400)', border: '1px solid var(--border-divider)' }}>{G.domainById(k).code}={present ? 1 : 0}</span>;
                })}
              </div>
              <div style={{ font: 'var(--type-meta)', color: 'var(--ink-400)', marginTop: 12 }}>Vector updates as you approve codes. Feeds the analytics pipeline.</div>
            </Panel>
          </div>

          {/* Right — candidate codes review */}
          <Panel eyebrow="Step 2 · Human-in-the-loop" title="Agent-proposed codes" action={<Badge tone={approved > 0 ? 'positive' : 'neutral'} dot>{approved}/{candidates.length} approved</Badge>} padded={false}>
            {candidates.map((c) => {
              const dom = G.domainById(c.domain);
              const dec = decided[c.id];
              return (
                <div key={c.id} style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-divider)', opacity: dec === 'reject' ? 0.5 : 1 }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, lineHeight: 1.5, color: 'var(--ink-900)', margin: '0 0 10px' }}>"{c.segment}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-700)' }}><span style={{ width: 9, height: 9, borderRadius: 2, background: dom.color }} />{dom.name}</span>
                    <Tag>{c.sub}</Tag>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: c.conf > 0.85 ? 'var(--positive-600)' : 'var(--caution-600)' }}>conf {(c.conf * 100).toFixed(0)}%</span>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                      {dec ? <Badge tone={dec === 'approve' ? 'positive' : 'critical'}>{dec === 'approve' ? 'Approved' : 'Rejected'}</Badge> : (
                        <React.Fragment>
                          <Button size="sm" variant="secondary" onClick={() => decide(c.id, 'reject')}>Reject</Button>
                          <Button size="sm" variant="primary" onClick={() => decide(c.id, 'approve')} iconLeft={<window.Icon.check size={13} />}>Approve</Button>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </Panel>
        </div>
      )}

      {tab === 'agreement' && (
        <Panel eyebrow="Agent evaluation" title="LLM vs human agreement by domain">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 18 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 44, fontWeight: 600, color: 'var(--positive-600)' }}>91%</span>
            <span style={{ font: 'var(--type-sm)', color: 'var(--ink-500)' }}>overall concordance · {G.coding.humanReviewed.toLocaleString()} of {G.coding.totalSegments.toLocaleString()} segments human-reviewed</span>
          </div>
          {G.coding.aiVsHuman.map((r) => {
            const agree = Math.round(100 - Math.abs(r.ai - r.human) / r.human * 100);
            return (
              <div key={r.code} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 60px', alignItems: 'center', gap: 12, padding: '9px 0', borderBottom: '1px solid var(--border-divider)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-700)' }}>{r.code}</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ font: 'var(--type-meta)', color: 'var(--ink-400)', width: 64 }}>AI {r.ai}</span>
                  <div style={{ flex: 1, height: 10, background: 'var(--ink-100)', borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
                    <div style={{ width: agree + '%', height: '100%', background: agree > 92 ? 'var(--positive-500)' : 'var(--caution-500)', borderRadius: 999 }} />
                  </div>
                  <span style={{ font: 'var(--type-meta)', color: 'var(--ink-400)', width: 70 }}>Human {r.human}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: 'var(--ink-800)', textAlign: 'right' }}>{agree}%</span>
              </div>
            );
          })}
        </Panel>
      )}

      {tab === 'prompts' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <Panel eyebrow="Versioned" title="Coding agent prompt" action={<Badge tone="positive" dot>{liveV} · live</Badge>}>
            {editing ? (
              <textarea value={draft} onChange={(e) => setDraft(e.target.value)} spellCheck={false} style={{ width: '100%', minHeight: 188, boxSizing: 'border-box', background: 'var(--white)', border: '1px solid var(--scarlet-500)', borderRadius: 'var(--radius-sm)', padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.7, color: 'var(--ink-800)', resize: 'vertical', outline: 'none' }} />
            ) : (
              <div style={{ background: 'var(--ink-100)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-sm)', padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.7, color: 'var(--ink-700)', whiteSpace: 'pre-wrap' }}>{promptText}</div>
            )}
            <div style={{ display: 'flex', gap: 10, marginTop: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              {editing ? (
                <React.Fragment>
                  <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
                  <Button variant="primary" onClick={deployPrompt} iconLeft={<window.Icon.sparkle size={14} />}>Deploy {nextV}</Button>
                  <span style={{ font: 'var(--type-meta)', color: 'var(--ink-400)' }}>Saves as {nextV} and sets it live</span>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button variant="secondary" onClick={startEdit} iconLeft={<window.Icon.file size={14} />}>Edit prompt</Button>
                  <Button variant="primary" onClick={deployPrompt}>Re-deploy {liveV}</Button>
                </React.Fragment>
              )}
            </div>
          </Panel>
          <Panel eyebrow="History" title="Prompt versions">
            {versions.map((p) => (
              <div key={p.v} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid var(--border-divider)' }}>
                <div><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--ink-800)' }}>{p.v}</span>{p.live && <Badge tone="positive">live</Badge>}</div><div style={{ font: 'var(--type-sm)', color: 'var(--ink-500)', marginTop: 2 }}>{p.note}</div></div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: 'var(--ink-700)' }}>{p.agree}%</span>
              </div>
            ))}
          </Panel>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 19 · REPORT GENERATION CENTER
// ============================================================
function ReportCenter() {
  const UI = window.HEARTDesignSystem_d7d056, K = window.Kit, G = window.HEART_DATA;
  const { Panel, Badge, Button } = UI;
  const reports = [
    { id: 'r1', name: 'Executive Summary', desc: 'One-page readiness briefing for the Dean', icon: 'gauge', fmt: 'PDF', pages: 1, hot: true },
    { id: 'r2', name: 'Health Equity Readiness Report', desc: 'Full corpus findings across all 13 domains', icon: 'file', fmt: 'PDF', pages: 24 },
    { id: 'r3', name: 'Theme Report', desc: 'Deep-dive on a selected domain + subcodes', icon: 'network', fmt: 'PDF', pages: 8 },
    { id: 'r4', name: 'Stakeholder Report', desc: 'Circle & authority breakdown with quotes', icon: 'users', fmt: 'PDF', pages: 12 },
    { id: 'r5', name: 'Blueprint Report', desc: 'Prioritized recommendations & impact matrix', icon: 'sparkle', fmt: 'PDF', pages: 6 },
    { id: 'r6', name: 'Board Presentation', desc: '16:9 slides for institutional leadership', icon: 'layers', fmt: 'PPTX', pages: 18 },
  ];
  const [gen, setGen] = React.useState(null);
  const generate = (r) => { setGen(r.id); window.pushToast(r.name + ' generating…', 'neutral'); setTimeout(() => { setGen(null); window.pushToast(r.name + ' ready to download', 'positive'); }, 1500); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <K.Grid cols={3}>
        {reports.map((r) => {
          const Glyph = window.Icon[r.icon];
          return (
            <div key={r.id} style={{ background: 'var(--surface-card)', border: r.hot ? '1px solid var(--scarlet-500)' : 'var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: r.hot ? 'var(--scarlet-050)' : 'var(--ink-100)', color: r.hot ? 'var(--scarlet-600)' : 'var(--ink-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Glyph size={20} /></div>
                <Badge tone="neutral">{r.fmt} · {r.pages}p</Badge>
              </div>
              <div>
                <div style={{ font: 'var(--type-title)', color: 'var(--ink-900)' }}>{r.name}</div>
                <p style={{ font: 'var(--type-sm)', color: 'var(--ink-500)', margin: '4px 0 0' }}>{r.desc}</p>
              </div>
              <Button variant={r.hot ? 'primary' : 'secondary'} fullWidth iconLeft={<window.Icon.download size={15} />} onClick={() => generate(r)} disabled={gen === r.id}>{gen === r.id ? 'Generating…' : 'Generate'}</Button>
            </div>
          );
        })}
      </K.Grid>
      <Panel eyebrow="Auto-generation" title="Scheduled reports">
        {[{ n: 'Weekly Dean briefing', when: 'Every Monday · 7:00 AM', to: 'Office of the Dean', on: true }, { n: 'Monthly board pack', when: '1st of month', to: 'Institutional Leadership', on: true }, { n: 'Quarterly community report', when: 'End of quarter', to: 'Community Advisory Board', on: false }].map((s) => (
          <div key={s.n} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-divider)' }}>
            <div><div style={{ font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-800)' }}>{s.n}</div><div style={{ font: 'var(--type-meta)', color: 'var(--ink-400)', marginTop: 2 }}>{s.when} · {s.to}</div></div>
            <Badge tone={s.on ? 'positive' : 'neutral'} dot>{s.on ? 'Active' : 'Paused'}</Badge>
          </div>
        ))}
      </Panel>
    </div>
  );
}

// ============================================================
// 18 · WORKFLOW MONITORING
// ============================================================
function WorkflowMonitoring() {
  const UI = window.HEARTDesignSystem_d7d056, K = window.Kit, G = window.HEART_DATA;
  const { Panel, Badge, Button } = UI;
  const stages = [
    { id: 'int', label: 'Interview', icon: 'users', done: 247, active: 0, failed: 0 },
    { id: 'tr', label: 'Transcript', icon: 'file', done: 244, active: 2, failed: 1 },
    { id: 'code', label: 'Coding', icon: 'sparkle', done: 238, active: 5, failed: 1 },
    { id: 'val', label: 'Validation', icon: 'check', done: 206, active: 32, failed: 0 },
    { id: 'dash', label: 'Dashboard', icon: 'gauge', done: 206, active: 0, failed: 0 },
  ];
  const queue = [
    { id: 'INT-2026-0251', stage: 'Coding', status: 'active', t: '2m', circle: 1 },
    { id: 'INT-2026-0250', stage: 'Validation', status: 'active', t: '14m', circle: 2 },
    { id: 'INT-2026-0249', stage: 'Transcript', status: 'failed', t: '—', circle: 1 },
    { id: 'INT-2026-0248', stage: 'Dashboard', status: 'done', t: '1h', circle: 3 },
    { id: 'INT-2026-0247', stage: 'Dashboard', status: 'done', t: '1h', circle: 1 },
  ];
  const tone = { active: 'info', failed: 'critical', done: 'positive' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Panel eyebrow="Pipeline" title="Interview → Transcript → Coding → Validation → Dashboard">
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
          {stages.map((s, i) => {
            const Glyph = window.Icon[s.icon];
            return (
              <React.Fragment key={s.id}>
                <div style={{ flex: 1, textAlign: 'center', padding: '4px 8px' }}>
                  <div style={{ width: 44, height: 44, margin: '0 auto 10px', borderRadius: 'var(--radius-md)', background: s.failed ? 'var(--critical-100)' : 'var(--ink-100)', color: s.failed ? 'var(--critical-600)' : 'var(--ink-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Glyph size={21} /></div>
                  <div style={{ font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-800)' }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600, color: 'var(--ink-900)', marginTop: 4 }}>{s.done}</div>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 6 }}>
                    {s.active > 0 && <Badge tone="info">{s.active} active</Badge>}
                    {s.failed > 0 && <Badge tone="critical">{s.failed} failed</Badge>}
                  </div>
                </div>
                {i < stages.length - 1 && <div style={{ alignSelf: 'flex-start', marginTop: 22, color: 'var(--ink-300)' }}><window.Icon.arrowRight size={18} /></div>}
              </React.Fragment>
            );
          })}
        </div>
      </Panel>

      <K.Grid cols={4}>
        <window.Kit.AIInsight title="Throughput"><strong>238 interviews</strong> fully coded this quarter · avg <strong>6.2 min</strong> agent runtime per transcript.</window.Kit.AIInsight>
        <Panel padded><div style={{ font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--ink-400)', marginBottom: 6 }}>Avg processing</div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 30, fontWeight: 600, color: 'var(--ink-900)' }}>6.2<span style={{ fontSize: 16, color: 'var(--ink-400)' }}>min</span></div></Panel>
        <Panel padded><div style={{ font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--ink-400)', marginBottom: 6 }}>Success rate</div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 30, fontWeight: 600, color: 'var(--positive-600)' }}>98.8<span style={{ fontSize: 16, color: 'var(--ink-400)' }}>%</span></div></Panel>
        <Panel padded><div style={{ font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--ink-400)', marginBottom: 6 }}>Awaiting review</div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 30, fontWeight: 600, color: 'var(--caution-600)' }}>32</div></Panel>
      </K.Grid>

      <Panel eyebrow="Live queue" title="Recent activity" padded={false} action={<Button size="sm" variant="ghost" onClick={() => window.pushToast('Retrying failed jobs…', 'neutral')}>Retry failed</Button>}>
        {queue.map((q) => (
          <div key={q.id} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 120px 60px', alignItems: 'center', gap: 12, padding: '12px 18px', borderBottom: '1px solid var(--border-divider)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-700)' }}>{q.id}</span>
            <span style={{ font: 'var(--type-sm)', color: 'var(--ink-600)' }}>{q.stage}</span>
            <Badge tone={tone[q.status]} dot>{q.status}</Badge>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)', textAlign: 'right' }}>{q.t}</span>
          </div>
        ))}
      </Panel>
    </div>
  );
}

// ============================================================
// 20 · FUTURE AWS VOICE AGENT ARCHITECTURE
// ============================================================
function AWSArchitecture() {
  const UI = window.HEARTDesignSystem_d7d056, K = window.Kit;
  const { Panel, Badge, Button } = UI;
  const flow = [
    { svc: 'Amazon Connect', role: 'Voice Interview Agent', desc: 'Schedules & conducts structured interviews by phone', icon: 'users', cost: '$0.018/min' },
    { svc: 'Amazon Transcribe', role: 'Transcript', desc: 'Speaker-diarized medical transcription', icon: 'file', cost: '$0.024/min' },
    { svc: 'Amazon Bedrock', role: 'Coding Agent', desc: 'Claude applies the 13-domain matrix + one-hot encoding', icon: 'sparkle', cost: '$0.003/1K tok' },
    { svc: 'Lambda + S3', role: 'Analytics Pipeline', desc: 'Transforms coding matrix → structured tables', icon: 'flow', cost: '~$40/mo' },
    { svc: 'QuickSight', role: 'Dashboards', desc: 'Auto-refreshing executive analytics', icon: 'gauge', cost: '$18/user/mo' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: 'var(--slate-900)', borderRadius: 'var(--radius-lg)', padding: '24px 28px', color: 'var(--slate-100)' }}>
        <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--slate-200)', marginBottom: 8 }}>Future state · target architecture</div>
        <h2 style={{ font: 'var(--type-h2)', color: '#fff', margin: '0 0 8px' }}>Fully automated voice-to-dashboard pipeline</h2>
        <p style={{ font: 'var(--type-body)', color: 'var(--slate-200)', margin: 0, maxWidth: 680 }}>An interview is conducted by an AWS voice agent and flows — with no manual step — through transcription, AI coding, analytics, and live dashboards. Human review remains optional for quality assurance.</p>
      </div>

      <Panel eyebrow="Data flow" title="Voice Agent → Transcript → Coding → Analytics → Dashboards">
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {flow.map((n, i) => {
            const Glyph = window.Icon[n.icon];
            return (
              <React.Fragment key={n.svc}>
                <div style={{ flex: '1 0 180px', background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--slate-900)', color: '#FF9900', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Glyph size={20} /></div>
                  <div style={{ font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-label)', color: 'var(--ink-400)' }}>{n.role}</div>
                  <div style={{ font: 'var(--type-title)', color: 'var(--ink-900)' }}>{n.svc}</div>
                  <p style={{ font: 'var(--type-sm)', color: 'var(--ink-500)', margin: 0, flex: 1 }}>{n.desc}</p>
                  <Badge tone="neutral">{n.cost}</Badge>
                </div>
                {i < flow.length - 1 && <div style={{ alignSelf: 'center', color: 'var(--ink-300)', flex: '0 0 auto' }}><window.Icon.arrowRight size={20} /></div>}
              </React.Fragment>
            );
          })}
        </div>
      </Panel>

      <K.Grid cols={2}>
        <Panel eyebrow="Current MVP" title="What runs today" action={<Badge tone="positive" dot>Live</Badge>}>
          <ul style={{ margin: 0, paddingLeft: 18, font: 'var(--type-body)', color: 'var(--ink-700)', lineHeight: 1.9 }}>
            <li>Manual interviews → uploaded transcripts (S3)</li>
            <li>Bedrock coding agent + human review</li>
            <li>One-hot encoding → CSV → QuickSight</li>
            <li>Static executive dashboards</li>
          </ul>
          <div style={{ marginTop: 14, font: 'var(--type-sm)', color: 'var(--ink-500)' }}>Est. infrastructure cost: <strong style={{ color: 'var(--ink-800)' }}>~$220/mo</strong></div>
        </Panel>
        <Panel eyebrow="Future production" title="Target additions" action={<Badge tone="info" dot>Planned</Badge>}>
          <ul style={{ margin: 0, paddingLeft: 18, font: 'var(--type-body)', color: 'var(--ink-700)', lineHeight: 1.9 }}>
            <li>Amazon Connect voice interview agent</li>
            <li>Real-time Transcribe + auto-coding</li>
            <li>Event-driven pipeline (Lambda + EventBridge)</li>
            <li>Cognito SSO · auto-refreshing dashboards</li>
          </ul>
          <div style={{ marginTop: 14, font: 'var(--type-sm)', color: 'var(--ink-500)' }}>Est. at 1,000 interviews/yr: <strong style={{ color: 'var(--ink-800)' }}>~$1,400/mo</strong></div>
        </Panel>
      </K.Grid>
    </div>
  );
}

window.AICodingWorkspace = AICodingWorkspace;
window.ReportCenter = ReportCenter;
window.WorkflowMonitoring = WorkflowMonitoring;
window.AWSArchitecture = AWSArchitecture;
