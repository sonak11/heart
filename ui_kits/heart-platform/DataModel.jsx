/* Shared mock data + helpers for the HEART platform. window.HEART_DATA */
(function () {
  const circles = {
    1: { id: 1, label: 'Community Voice', short: 'Community', color: 'var(--circle-community)', soft: 'var(--circle-community-soft)' },
    2: { id: 2, label: 'Internal Stakeholders', short: 'Internal', color: 'var(--circle-internal)', soft: 'var(--circle-internal-soft)' },
    3: { id: 3, label: 'Leadership', short: 'Leadership', color: 'var(--circle-leadership)', soft: 'var(--circle-leadership-soft)' },
  };

  const cat = ['var(--cat-1)','var(--cat-2)','var(--cat-3)','var(--cat-4)','var(--cat-5)','var(--cat-6)','var(--cat-7)','var(--cat-8)'];

  const pillars = [
    { id: 'workforce', name: 'Workforce', score: 78, prior: 74, color: cat[0] },
    { id: 'community', name: 'Community Partnerships', score: 64, prior: 58, color: cat[1] },
    { id: 'education', name: 'Education', score: 71, prior: 71, color: cat[3] },
    { id: 'research', name: 'Research Infrastructure', score: 52, prior: 57, color: cat[4] },
  ];

  // theme: prevalence share (% of that circle's segments touching theme)
  const themes = [
    { code: 'BARR-04', name: 'Transportation access', parent: 'Barriers', pillar: 'community', community: 41, internal: 22, leadership: 6, segments: 138, trend: [12,18,24,31,37,41], emerging: false },
    { code: 'BARR-11', name: 'Language & interpretation', parent: 'Barriers', pillar: 'community', community: 33, internal: 19, leadership: 9, segments: 96, trend: [8,11,15,22,28,33], emerging: true },
    { code: 'BARR-08', name: 'Childcare during care', parent: 'Barriers', pillar: 'community', community: 22, internal: 10, leadership: 4, segments: 61, trend: [4,6,9,14,19,22], emerging: true },
    { code: 'FAC-02', name: 'Trust in institutions', parent: 'Facilitators', pillar: 'community', community: 28, internal: 24, leadership: 12, segments: 102, trend: [20,22,24,25,27,28], emerging: false },
    { code: 'FAC-07', name: 'Promotores / CHW model', parent: 'Facilitators', pillar: 'community', community: 19, internal: 26, leadership: 17, segments: 74, trend: [9,12,15,16,18,19], emerging: false },
    { code: 'WORK-11', name: 'Workforce pipeline', parent: 'Workforce', pillar: 'workforce', community: 9, internal: 30, leadership: 34, segments: 121, trend: [22,25,28,30,32,34], emerging: false },
    { code: 'WORK-05', name: 'Burnout & retention', parent: 'Workforce', pillar: 'workforce', community: 6, internal: 28, leadership: 21, segments: 88, trend: [10,14,17,19,20,21], emerging: true },
    { code: 'EDU-07', name: 'Pipeline-to-practice training', parent: 'Education', pillar: 'education', community: 11, internal: 22, leadership: 24, segments: 79, trend: [18,19,21,22,23,24], emerging: false },
    { code: 'COMM-03', name: 'Community advisory boards', parent: 'Community Partnerships', pillar: 'community', community: 26, internal: 23, leadership: 18, segments: 84, trend: [12,15,16,17,18,18], emerging: false },
    { code: 'RES-01', name: 'Research infrastructure', parent: 'Research', pillar: 'research', community: 5, internal: 21, leadership: 29, segments: 90, trend: [24,26,27,28,29,29], emerging: false },
    { code: 'RES-04', name: 'Data sharing & governance', parent: 'Research', pillar: 'research', community: 4, internal: 18, leadership: 22, segments: 57, trend: [9,11,14,17,20,22], emerging: true },
    { code: 'EDU-12', name: 'Health literacy', parent: 'Education', pillar: 'education', community: 24, internal: 17, leadership: 13, segments: 70, trend: [14,16,18,20,22,24], emerging: false },
  ].map((t) => ({ ...t, gap: t.community - t.leadership, total: t.community + t.internal + t.leadership }));

  const stakeholders = [
    { role: 'Community member', circle: 1, n: 84, themes: 6.2 },
    { role: 'Patient advocate', circle: 1, n: 31, themes: 5.1 },
    { role: 'Promotor / CHW', circle: 2, n: 28, themes: 4.8 },
    { role: 'Program coordinator', circle: 2, n: 22, themes: 5.4 },
    { role: 'Faculty / physician', circle: 2, n: 34, themes: 4.2 },
    { role: 'Dean / executive', circle: 3, n: 18, themes: 3.6 },
    { role: 'Department chair', circle: 3, n: 14, themes: 3.9 },
  ];

  const programs = [
    { name: 'Mobile clinic', reach: 4200, quotes: 41, sentiment: 0.62, pillar: 'community' },
    { name: 'Promotores network', reach: 2600, quotes: 38, sentiment: 0.74, pillar: 'community' },
    { name: 'Telehealth access', reach: 5100, quotes: 27, sentiment: 0.41, pillar: 'workforce' },
    { name: 'Pipeline scholars', reach: 320, quotes: 22, sentiment: 0.68, pillar: 'education' },
    { name: 'Community advisory', reach: 180, quotes: 33, sentiment: 0.57, pillar: 'community' },
  ];

  // NJ regions (simplified tile map) value = readiness signal
  const geo = [
    { id: 'newark', name: 'Newark / Essex', x: 2, y: 0, value: 58, interviews: 42 },
    { id: 'jersey', name: 'Jersey City / Hudson', x: 3, y: 0, value: 63, interviews: 28 },
    { id: 'paterson', name: 'Paterson / Passaic', x: 2, y: 1, value: 49, interviews: 22 },
    { id: 'newbrunswick', name: 'New Brunswick / Middlesex', x: 1, y: 2, value: 74, interviews: 51 },
    { id: 'trenton', name: 'Trenton / Mercer', x: 1, y: 3, value: 61, interviews: 31 },
    { id: 'camden', name: 'Camden', x: 0, y: 4, value: 44, interviews: 26 },
    { id: 'atlantic', name: 'Atlantic City', x: 1, y: 5, value: 51, interviews: 18 },
    { id: 'ocean', name: 'Ocean County', x: 2, y: 4, value: 67, interviews: 15 },
  ];

  const months = ['Jan','Feb','Mar','Apr','May','Jun'];

  const recommendations = [
    { id: 'R1', title: 'Stand up a transportation-access task force', impact: 5, effort: 2, pillar: 'community', confidence: 0.91, evidence: 138, theme: 'BARR-04', tier: 'now' },
    { id: 'R2', title: 'Fund interpretation services at all clinic sites', impact: 5, effort: 3, pillar: 'community', confidence: 0.86, evidence: 96, theme: 'BARR-11', tier: 'now' },
    { id: 'R3', title: 'Add community seats to leadership review board', impact: 4, effort: 2, pillar: 'community', confidence: 0.79, evidence: 84, theme: 'COMM-03', tier: 'now' },
    { id: 'R4', title: 'Childcare vouchers for appointment adherence', impact: 4, effort: 3, pillar: 'community', confidence: 0.72, evidence: 61, theme: 'BARR-08', tier: 'next' },
    { id: 'R5', title: 'Expand promotores hiring pipeline', impact: 4, effort: 4, pillar: 'workforce', confidence: 0.77, evidence: 74, theme: 'FAC-07', tier: 'next' },
    { id: 'R6', title: 'Formalize data-sharing governance', impact: 3, effort: 4, pillar: 'research', confidence: 0.68, evidence: 57, theme: 'RES-04', tier: 'later' },
  ];

  const quotes = [
    { id: 'INT-2026-0142', text: "If I can't get a ride to the clinic, none of the rest matters. I've missed three appointments this year because the bus doesn't run on time out here.", circle: 1, role: 'Community member', program: 'Mobile clinic', region: 'camden', codes: ['BARR-04','BARR-08'], subs: ['Transportation','Scheduling'], sentiment: -0.6 },
    { id: 'INT-2026-0119', text: "We've stood up the workforce pipeline, but I'll be honest — I don't think we've heard enough from the neighborhoods we're trying to serve.", circle: 3, role: 'Dean', program: '—', region: 'newbrunswick', codes: ['WORK-11','FAC-02'], subs: ['Pipeline','Trust'], sentiment: 0.1 },
    { id: 'INT-2026-0131', text: "The promotores model works because people trust someone who looks like them and speaks their language. That trust took years to build.", circle: 2, role: 'Program coordinator', program: 'Promotores network', region: 'newark', codes: ['FAC-07','BARR-11'], subs: ['Trust','Language'], sentiment: 0.7 },
    { id: 'INT-2026-0156', text: "Nobody translated the intake forms. My mother filled them out wrong and they almost gave her the wrong medication.", circle: 1, role: 'Patient advocate', program: 'Telehealth access', region: 'paterson', codes: ['BARR-11'], subs: ['Language','Safety'], sentiment: -0.8 },
    { id: 'INT-2026-0162', text: "We have the data, but it lives in five different systems and no one owns governance. That's the bottleneck for research.", circle: 3, role: 'Department chair', program: '—', region: 'newbrunswick', codes: ['RES-04','RES-01'], subs: ['Governance','Data'], sentiment: -0.2 },
    { id: 'INT-2026-0174', text: "When the mobile clinic shows up at the church, people come. Meet us where we already are, and the trust is already there.", circle: 1, role: 'Community member', program: 'Mobile clinic', region: 'trenton', codes: ['FAC-02','BARR-04'], subs: ['Trust','Access'], sentiment: 0.8 },
  ];

  // ============================================================
  // REAL CODING MATRIX — 13 thematic domains + subcodes, plus the
  // case-level attributes (engagement circle, decision authority,
  // proximity) the HEART coding framework actually uses.
  // ============================================================
  const domains = [
    { id: 'D1',  code: 'HEU',  name: 'Health Equity Understanding', color: cat[0],
      subs: ['Structural / Systemic Definition','Individual / Behavioral Definition','Racial Equity','Social Determinants'] },
    { id: 'D2',  code: 'EFF',  name: 'Existing Efforts & Strategies', color: cat[1],
      subs: ['Formal Initiatives','Informal Practices','Policy Strategies','Practice Strategies','Target Populations'] },
    { id: 'D3',  code: 'AST',  name: "Assets & What's Working", color: cat[5],
      subs: ['Leadership Commitment','Institutional Culture','Staff Champions','Funding Resources','Partnerships'] },
    { id: 'D4',  code: 'MEAS', name: 'Defining & Measuring Progress', color: cat[7],
      subs: ['Existing Metrics','Data Sources','Measurement Gaps','Desired Outcomes'] },
    { id: 'D5',  code: 'BARR', name: 'Barriers to Advancing Health Equity', color: cat[2],
      subs: ['Structural Barriers','Resource Limitations','Institutional Resistance','Competing Priorities'] },
    { id: 'D6',  code: 'DIFF', name: 'What Could Be Done Differently', color: cat[3],
      subs: ['Missed Opportunities','Areas for Expansion','Desired Changes','Governance Shifts'] },
    { id: 'D7',  code: 'COMM', name: 'Defining Community', color: cat[4],
      subs: ['Geographic','Identity-Based','Institutional Communities','Impacted Communities','Excluded Communities'] },
    { id: 'D8',  code: 'EXP',  name: 'Community Experience', color: cat[6],
      subs: ['Trust','Mistrust','Credibility','Responsiveness'] },
    { id: 'D9',  code: 'REL',  name: 'Relationship Dynamics', color: cat[4],
      subs: ['Transactional Engagement','Relational Engagement','Power Sharing','Inclusion','Communication Quality'] },
    { id: 'D10', code: 'STK',  name: 'Stakeholders', color: cat[7],
      subs: ['Individuals','Organizations','Community Partners','Internal Stakeholders'] },
    { id: 'D11', code: 'BLU',  name: 'Blueprint Recommendations', color: cat[0],
      subs: ['Essential Considerations','Short-Term Priorities','Long-Term Priorities','Policy Recommendations','Practice Recommendations'] },
    { id: 'D12', code: 'BEN',  name: 'Benchmarks & Exemplars', color: cat[5],
      subs: ['Institutions','Practices','Success Factors','Transferability','Cautions'] },
    { id: 'D13', code: 'EMR',  name: 'Emergent Themes', color: cat[3],
      subs: ['Values','Risks','Hopes','Fears','Additional Insights'] },
  ];

  // Per-domain prevalence by circle (% of that circle's coded segments),
  // by decision authority, and by proximity. Drives matrix dashboards.
  // c1/c2/c3 = circles; hi/med/lo = authority; dir/ind = proximity.
  const domainStats = [
    { id: 'D5',  c1: 44, c2: 31, c3: 18, hi: 16, med: 29, lo: 47, dir: 46, ind: 19, segments: 612 },
    { id: 'D8',  c1: 38, c2: 24, c3: 14, hi: 13, med: 22, lo: 41, dir: 40, ind: 17, segments: 488 },
    { id: 'D1',  c1: 21, c2: 33, c3: 39, hi: 41, med: 30, lo: 18, dir: 22, ind: 34, segments: 540 },
    { id: 'D3',  c1: 19, c2: 34, c3: 31, hi: 33, med: 31, lo: 17, dir: 18, ind: 30, segments: 420 },
    { id: 'D9',  c1: 35, c2: 26, c3: 16, hi: 17, med: 27, lo: 36, dir: 34, ind: 19, segments: 396 },
    { id: 'D2',  c1: 14, c2: 30, c3: 33, hi: 35, med: 27, lo: 14, dir: 16, ind: 31, segments: 372 },
    { id: 'D7',  c1: 33, c2: 22, c3: 12, hi: 13, med: 21, lo: 34, dir: 32, ind: 15, segments: 318 },
    { id: 'D4',  c1: 9,  c2: 24, c3: 36, hi: 38, med: 23, lo: 11, dir: 12, ind: 30, segments: 354 },
    { id: 'D6',  c1: 27, c2: 25, c3: 24, hi: 25, med: 26, lo: 25, dir: 26, ind: 24, segments: 288 },
    { id: 'D11', c1: 18, c2: 28, c3: 34, hi: 36, med: 27, lo: 16, dir: 19, ind: 30, segments: 336 },
    { id: 'D10', c1: 24, c2: 29, c3: 27, hi: 28, med: 28, lo: 23, dir: 24, ind: 27, segments: 270 },
    { id: 'D12', c1: 6,  c2: 19, c3: 28, hi: 30, med: 19, lo: 8,  dir: 9,  ind: 25, segments: 198 },
    { id: 'D13', c1: 22, c2: 21, c3: 19, hi: 18, med: 21, lo: 23, dir: 23, ind: 18, segments: 174 },
  ].map((d) => ({
    ...d,
    domain: domains.find((x) => x.id === d.id),
    voiceGap: d.c1 - d.c3,            // community minus leadership
    authorityGap: d.lo - d.hi,        // low-authority minus high-authority
    proximityGap: d.dir - d.ind,      // directly minus indirectly affected
    blindspot: Math.round(((d.c1 - d.c3) + (d.lo - d.hi) + (d.dir - d.ind)) / 3),
  }));

  function domainById(id) { return domains.find((d) => d.id === id); }
  function domainStat(id) { return domainStats.find((d) => d.id === id); }

  // Domain co-occurrence — how often two domains are coded in the same
  // interview segment (% of the smaller domain's segments). Drives the
  // theme-connection network and the "strongest connections" ranking.
  const domainCooc = [
    { a: 'D5', b: 'D8', w: 58 }, { a: 'D7', b: 'D8', w: 49 }, { a: 'D8', b: 'D9', w: 52 },
    { a: 'D5', b: 'D7', w: 44 }, { a: 'D5', b: 'D9', w: 39 }, { a: 'D1', b: 'D2', w: 47 },
    { a: 'D2', b: 'D3', w: 41 }, { a: 'D3', b: 'D11', w: 36 }, { a: 'D4', b: 'D11', w: 43 },
    { a: 'D4', b: 'D2', w: 34 }, { a: 'D11', b: 'D12', w: 38 }, { a: 'D6', b: 'D11', w: 45 },
    { a: 'D9', b: 'D10', w: 40 }, { a: 'D13', b: 'D5', w: 28 }, { a: 'D1', b: 'D5', w: 31 },
    { a: 'D3', b: 'D8', w: 33 }, { a: 'D10', b: 'D3', w: 35 }, { a: 'D6', b: 'D4', w: 30 },
    { a: 'D1', b: 'D7', w: 26 }, { a: 'D11', b: 'D10', w: 32 }, { a: 'D12', b: 'D3', w: 24 },
    { a: 'D13', b: 'D8', w: 27 }, { a: 'D6', b: 'D5', w: 29 },
  ];
  function coocOf(id) {
    return domainCooc.filter((p) => p.a === id || p.b === id)
      .map((p) => ({ other: p.a === id ? p.b : p.a, w: p.w }))
      .sort((x, y) => y.w - x.w);
  }
  const coocPairs = [...domainCooc].sort((a, b) => b.w - a.w);

  const authority = {
    levels: [
      { id: 'hi',  label: 'High Authority',   sub: 'Deans · Chairs · VPs', color: 'var(--circle-leadership)', n: 32 },
      { id: 'med', label: 'Medium Authority', sub: 'Directors · Faculty leads', color: 'var(--circle-internal)', n: 58 },
      { id: 'lo',  label: 'Low Authority',    sub: 'Frontline · Community', color: 'var(--circle-community)', n: 121 },
    ],
    // what each authority level spends its coded segments on (share %)
    focus: [
      { topic: 'Raises barriers',        hi: 18, med: 31, lo: 51 },
      { topic: 'Proposes solutions',     hi: 44, med: 33, lo: 23 },
      { topic: 'Discusses trust',        hi: 15, med: 28, lo: 57 },
      { topic: 'Discusses measurement',  hi: 49, med: 32, lo: 19 },
      { topic: 'Names community assets',  hi: 22, med: 30, lo: 48 },
    ],
  };

  const proximity = {
    groups: [
      { id: 'dir', label: 'Directly Affected',   color: 'var(--circle-community)', n: 96, trust: 0.38 },
      { id: 'ind', label: 'Indirectly Affected', color: 'var(--circle-leadership)', n: 115, trust: 0.64 },
    ],
  };

  // Coding Matrix Explorer rows — interview → codes → subcodes → quote
  const matrixRows = [
    { interview: 'INT-2026-0142', circle: 1, role: 'Community member', authority: 'lo', proximity: 'dir', domain: 'D5', subs: ['Structural Barriers','Resource Limitations'], onehot: { D5:1, D8:1, D7:1, D1:0, D11:0 }, quote: 'INT-2026-0142' },
    { interview: 'INT-2026-0119', circle: 3, role: 'Dean', authority: 'hi', proximity: 'ind', domain: 'D2', subs: ['Formal Initiatives','Practice Strategies'], onehot: { D2:1, D1:1, D4:1, D5:0, D8:0 }, quote: 'INT-2026-0119' },
    { interview: 'INT-2026-0131', circle: 2, role: 'Program coordinator', authority: 'med', proximity: 'dir', domain: 'D8', subs: ['Trust','Credibility'], onehot: { D8:1, D9:1, D3:1, D5:0, D4:0 }, quote: 'INT-2026-0131' },
    { interview: 'INT-2026-0156', circle: 1, role: 'Patient advocate', authority: 'lo', proximity: 'dir', domain: 'D5', subs: ['Structural Barriers'], onehot: { D5:1, D8:1, D9:0, D11:0, D1:0 }, quote: 'INT-2026-0156' },
    { interview: 'INT-2026-0162', circle: 3, role: 'Department chair', authority: 'hi', proximity: 'ind', domain: 'D4', subs: ['Measurement Gaps','Data Sources'], onehot: { D4:1, D2:1, D11:1, D8:0, D5:0 }, quote: 'INT-2026-0162' },
    { interview: 'INT-2026-0174', circle: 1, role: 'Community member', authority: 'lo', proximity: 'dir', domain: 'D8', subs: ['Trust','Responsiveness'], onehot: { D8:1, D3:1, D5:1, D2:0, D4:0 }, quote: 'INT-2026-0174' },
  ];

  function pillarName(id) { const p = pillars.find((x) => x.id === id); return p ? p.name : id; }
  function themeByCode(code) { return themes.find((t) => t.code === code); }

  // ============================================================
  // REACTIVE LAYER — derive a filtered/scaled dataset from the
  // global filters {circle, domain, time}. Every dashboard reads
  // from this so the FilterBar genuinely changes what is shown.
  // ============================================================
  const timeMeta = {
    q2:  { label: 'Q2 2026',      scale: 1.00, trendEnd: 6, priorLabel: 'vs Q1' },
    q1:  { label: 'Q1 2026',      scale: 0.78, trendEnd: 5, priorLabel: 'vs Q4' },
    ytd: { label: 'Year to date', scale: 1.34, trendEnd: 6, priorLabel: 'vs 2025' },
    all: { label: 'All time',     scale: 1.62, trendEnd: 6, priorLabel: 'vs start' },
  };
  const circleShare = { 1: 0.49, 2: 0.31, 3: 0.20 };

  function valByCircle(d, circle) {
    if (circle === 1) return d.c1; if (circle === 2) return d.c2; if (circle === 3) return d.c3;
    return Math.round((d.c1 + d.c2 + d.c3) / 3);
  }

  function derive(filters) {
    const f = filters || {};
    const circle = f.circle == null ? 'all' : f.circle;
    const domain = f.domain || 'all';
    const tm = timeMeta[f.time] || timeMeta.q2;

    // corpus counts scale with timeframe, narrow with circle
    let interviews = Math.round(247 * tm.scale);
    let participants = Math.round(211 * tm.scale);
    let segments = Math.round(5840 * tm.scale);
    if (circle !== 'all') {
      interviews = Math.round(interviews * circleShare[circle]);
      participants = Math.round(participants * circleShare[circle]);
      segments = Math.round(segments * circleShare[circle]);
    }

    // domain stats — optionally narrowed to one domain
    let ds = domain === 'all' ? domainStats : domainStats.filter((d) => d.id === domain);

    // themes narrowed by circle relevance + domain (via parent mapping is loose; keep all unless domain set)
    let th = themes.slice();
    if (circle === 1) th = th.filter((t) => t.community >= t.leadership);
    else if (circle === 3) th = th.filter((t) => t.leadership >= t.community);

    // quotes narrowed by circle
    let qs = quotes.slice();
    if (circle !== 'all') qs = qs.filter((q) => q.circle === circle);

    // readiness shifts with timeframe + circle lens
    let composite = readiness.composite;
    if (f.time === 'q1') composite -= 5; else if (f.time === 'all') composite += 3;
    if (circle === 1) composite -= 9; else if (circle === 3) composite += 6;
    composite = Math.max(0, Math.min(100, composite));

    // human-readable summary of the active lens
    const parts = [];
    parts.push(circle === 'all' ? 'All circles' : circles[circle].label);
    if (domain !== 'all') parts.push(domainById(domain).name);
    parts.push(tm.label);

    return {
      circle, domain, time: f.time || 'q2', tm,
      interviews, participants, segments, composite,
      domainStats: ds, themes: th, quotes: qs,
      isFiltered: circle !== 'all' || domain !== 'all' || (f.time && f.time !== 'q2'),
      summary: parts.join(' · '),
      valByCircle: (d) => valByCircle(d, circle),
    };
  }

  const readiness = {
    composite: 67, prior: 62,
    drivers: [
      { label: 'Coverage breadth', value: 82, weight: 0.2 },
      { label: 'Coding agreement', value: 91, weight: 0.15 },
      { label: 'Community alignment', value: 49, weight: 0.3 },
      { label: 'Action follow-through', value: 58, weight: 0.2 },
      { label: 'Data infrastructure', value: 64, weight: 0.15 },
    ],
    history: [54, 57, 59, 61, 62, 67],
  };

  const coding = {
    agreement: 91, totalSegments: 5840, aiCoded: 5840, humanReviewed: 2106,
    confusion: [ // parent x parent agreement matrix (diag = self-agreement)
      [96, 4, 2, 1], [5, 92, 6, 2], [3, 7, 89, 4], [2, 3, 5, 94],
    ],
    parents: ['Barriers','Facilitators','Workforce','Research'],
    aiVsHuman: [
      { code: 'BARR-04', ai: 138, human: 134 },
      { code: 'FAC-02', ai: 102, human: 109 },
      { code: 'WORK-11', ai: 121, human: 118 },
      { code: 'RES-01', ai: 90, human: 86 },
      { code: 'EDU-12', ai: 70, human: 77 },
    ],
  };

  window.HEART_DATA = { circles, cat, pillars, themes, stakeholders, programs, geo, months, recommendations, quotes, readiness, coding, pillarName, themeByCode,
    domains, domainStats, domainById, domainStat, authority, proximity, matrixRows, derive, timeMeta,
    domainCooc, coocOf, coocPairs };
})();
