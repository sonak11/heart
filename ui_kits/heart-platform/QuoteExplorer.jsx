/* Quote Explorer — semantic search, AI summary, similar quotes, collections, compare. */
function QuoteExplorer({ onNavigate }) {
  const { Panel, Badge, CircleBadge, Tag, Input, Button } = window.HEARTDesignSystem_d7d056;
  const K = window.Kit, D = window.HEART_DATA;
  const [mode, setMode] = React.useState('semantic');
  const [q, setQ] = React.useState('');
  const [circle, setCircle] = React.useState('all');
  const [collection, setCollection] = React.useState([]);
  const [compare, setCompare] = React.useState([]);
  const [expanded, setExpanded] = React.useState(null);
  const [summary, setSummary] = React.useState(false);

  const circleColor = (c) => D.circles[c].color;
  let results = D.quotes.filter((x) => circle === 'all' || x.circle === +circle);
  if (q) results = results.filter((x) => (x.text + x.codes.join() + x.role).toLowerCase().includes(q.toLowerCase()));

  function toggleCollect(id) { setCollection((c) => c.includes(id) ? c.filter((x) => x !== id) : [...c, id]); window.pushToast(collection.includes(id) ? 'Removed from collection' : 'Added to collection', 'positive'); }
  function toggleCompare(id) { setCompare((c) => c.includes(id) ? c.filter((x) => x !== id) : c.length < 2 ? [...c, id] : [c[1], id]); }
  function similar(qq) { return D.quotes.filter((x) => x.id !== qq.id && x.codes.some((c) => qq.codes.includes(c))); }

  const cmpQuotes = compare.map((id) => D.quotes.find((x) => x.id === id));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24, alignItems: 'start' }}>
      {/* Filter rail */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 124 }}>
        <Panel padded={true}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14, color: 'var(--ink-700)' }}><window.Icon.filter size={16} /><span style={{ font: 'var(--type-title)' }}>Refine</span></div>
          <div style={{ font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-400)', marginBottom: 8 }}>Engagement circle</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[['all', 'All circles'], [1, 'Community Voice'], [2, 'Internal'], [3, 'Leadership']].map(([v, l]) => (
              <button key={v} type="button" onClick={() => setCircle(v)} style={{ display: 'flex', alignItems: 'center', gap: 8, border: 'none', background: circle === v ? 'var(--ink-100)' : 'transparent', borderRadius: 'var(--radius-sm)', padding: '7px 9px', cursor: 'pointer', font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-700)', textAlign: 'left' }}>
                {v !== 'all' && <span style={{ width: 8, height: 8, borderRadius: 999, background: circleColor(v) }} />}{l}
              </button>
            ))}
          </div>
        </Panel>
        {collection.length > 0 && (
          <Panel eyebrow="Collection" title={`${collection.length} saved`} action={<button type="button" onClick={() => window.pushToast('Citation bundle exported', 'positive')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--scarlet-600)' }}><window.Icon.download size={16} /></button>}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{collection.map((id) => <Tag key={id} removable onRemove={() => toggleCollect(id)}>{id.replace('INT-2026-', '#')}</Tag>)}</div>
            <Button variant="secondary" size="sm" fullWidth style={{ marginTop: 12 }} iconLeft={<window.Icon.file size={14} />}>Build citation</Button>
          </Panel>
        )}
      </div>

      {/* Results */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-flex', background: 'var(--ink-100)', borderRadius: 'var(--radius-sm)', padding: 3, gap: 2, marginBottom: 8 }}>
              {[['semantic', 'Semantic'], ['exact', 'Exact'], ['theme', 'By theme']].map(([v, l]) => (
                <button key={v} type="button" onClick={() => setMode(v)} style={{ border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-xs)', padding: '4px 10px', font: 'var(--type-sm)', fontWeight: 600, background: mode === v ? 'var(--white)' : 'transparent', color: mode === v ? 'var(--scarlet-700)' : 'var(--ink-500)', boxShadow: mode === v ? 'var(--shadow-xs)' : 'none' }}>{l}</button>
              ))}
            </div>
            <Input iconLeft={<window.Icon.search size={16} />} placeholder={mode === 'semantic' ? 'Describe what you\u2019re looking for — e.g. \u201Cpeople struggling to reach care\u201D' : 'Search exact words'} value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Button onClick={() => setSummary(true)} iconLeft={<window.Icon.sparkle size={15} />}>Summarize {results.length}</Button>
          <Button variant={compare.length ? 'primary' : 'secondary'} onClick={() => setCompare(compare.length ? [] : compare)} iconLeft={<window.Icon.scale size={15} />}>{compare.length ? `Comparing ${compare.length}` : 'Compare'}</Button>
        </div>

        {mode === 'semantic' && q && <div style={{ font: 'var(--type-meta)', color: 'var(--ink-400)' }}>Semantic match · ranked by meaning, not keywords</div>}

        {summary && (
          <K.AIInsight title={`Summary of ${results.length} quotes`} actions={[<Button key="c" size="sm" variant="ghost" onClick={() => setSummary(false)}>Dismiss</Button>]}>
            These quotes converge on <strong>access friction</strong>: transportation, language, and trust recur across community voices, while leadership quotes acknowledge the pipeline but admit limited community input. Sentiment is <strong>net-negative for community</strong> ({Math.round(results.filter((r) => r.circle === 1).reduce((a, b) => a + b.sentiment, 0) / Math.max(1, results.filter((r) => r.circle === 1).length) * 100)}%) and neutral for leadership.
          </K.AIInsight>
        )}

        {cmpQuotes.length === 2 && (
          <Panel eyebrow="Compare" title="Side by side" action={<button type="button" onClick={() => setCompare([])} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ink-400)', fontSize: 18 }}>×</button>}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {cmpQuotes.map((c) => (
                <div key={c.id} style={{ borderLeft: `3px solid ${circleColor(c.circle)}`, paddingLeft: 14 }}>
                  <CircleBadge circle={c.circle} size="sm" />
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.5, color: 'var(--ink-900)', margin: '10px 0' }}>{c.text}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{c.codes.map((cd) => <Badge key={cd} tone="neutral">{cd}</Badge>)}</div>
                </div>
              ))}
            </div>
          </Panel>
        )}

        <div style={{ font: 'var(--type-sm)', color: 'var(--ink-500)' }}><strong style={{ color: 'var(--ink-800)' }}>{results.length}</strong> quotes{circle !== 'all' ? ` · ${D.circles[circle].label}` : ''}</div>

        {results.map((qq) => (
          <article key={qq.id} style={{ background: 'var(--white)', border: 'var(--border-card)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', padding: '20px 24px', borderLeft: `3px solid ${circleColor(qq.circle)}` }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 19, lineHeight: 1.5, color: 'var(--ink-900)', margin: '0 0 16px', textWrap: 'pretty' }}>
              <span style={{ color: 'var(--ink-300)', fontSize: 24 }}>“</span>{qq.text}<span style={{ color: 'var(--ink-300)', fontSize: 24 }}>”</span>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <CircleBadge circle={qq.circle} size="sm" />
              <Badge tone="neutral">{qq.role}</Badge>
              {qq.program !== '—' && <Badge tone="neutral">{qq.program}</Badge>}
              <Badge tone={qq.sentiment > 0.2 ? 'positive' : qq.sentiment < -0.2 ? 'critical' : 'neutral'} dot>{qq.sentiment > 0.2 ? 'positive' : qq.sentiment < -0.2 ? 'negative' : 'neutral'}</Badge>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, paddingTop: 14, borderTop: '1px solid var(--border-divider)' }}>
              <span style={{ font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-400)' }}>Codes</span>
              {qq.codes.map((c) => <Badge key={c} tone="brand">{c}</Badge>)}
              {qq.subs.map((s) => <Tag key={s}>{s}</Tag>)}
              <span style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
                <button type="button" onClick={() => toggleCompare(qq.id)} title="Compare" style={{ width: 30, height: 30, border: `1px solid ${compare.includes(qq.id) ? 'var(--scarlet-500)' : 'var(--border-default)'}`, background: compare.includes(qq.id) ? 'var(--scarlet-050)' : 'var(--white)', color: compare.includes(qq.id) ? 'var(--scarlet-600)' : 'var(--ink-400)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><window.Icon.scale size={14} /></button>
                <button type="button" onClick={() => toggleCollect(qq.id)} title="Save" style={{ width: 30, height: 30, border: `1px solid ${collection.includes(qq.id) ? 'var(--scarlet-500)' : 'var(--border-default)'}`, background: collection.includes(qq.id) ? 'var(--scarlet-050)' : 'var(--white)', color: collection.includes(qq.id) ? 'var(--scarlet-600)' : 'var(--ink-400)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><window.Icon.check size={14} /></button>
                <button type="button" onClick={() => setExpanded(expanded === qq.id ? null : qq.id)} style={{ border: '1px solid var(--border-default)', background: 'var(--white)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', cursor: 'pointer', font: 'var(--type-sm)', fontWeight: 600, color: 'var(--ink-600)', fontFamily: 'var(--font-mono)' }}>{qq.id}</button>
              </span>
            </div>
            {expanded === qq.id && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed var(--border-strong)' }}>
                <div style={{ font: 'var(--type-eyebrow)', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-400)', marginBottom: 10 }}>Similar quotes · evidence chain</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {similar(qq).map((s) => (
                    <div key={s.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 12px', background: 'var(--ink-100)', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ width: 6, height: 6, borderRadius: 999, background: circleColor(s.circle), marginTop: 7, flex: 'none' }} />
                      <span style={{ font: 'var(--type-sm)', color: 'var(--ink-600)', lineHeight: 1.5 }}>{s.text.slice(0, 110)}… <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-400)' }}>{s.id}</span></span>
                    </div>
                  ))}
                  {similar(qq).length === 0 && <div style={{ font: 'var(--type-sm)', color: 'var(--ink-400)' }}>No similar quotes in the current corpus.</div>}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

window.QuoteExplorer = QuoteExplorer;
