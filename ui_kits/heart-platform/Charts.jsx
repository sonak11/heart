/* Reusable tokenized SVG chart primitives. window.Charts */
(function () {
  const INK = 'var(--ink-400)';
  const GRID = 'var(--border-divider)';
  const mono = { fontFamily: 'var(--font-mono)', fontSize: 10 };

  function heat(v) { // 0..100 -> heat token
    const i = Math.min(5, Math.max(0, Math.round((v / 100) * 5)));
    return ['var(--heat-0)','var(--heat-1)','var(--heat-2)','var(--heat-3)','var(--heat-4)','var(--heat-5)'][i];
  }

  // --- Sparkline -----------------------------------------------------------
  function Sparkline({ values, color = 'var(--circle-internal)', w = 80, h = 24, fill = true }) {
    const max = Math.max(...values), min = Math.min(...values);
    const rng = max - min || 1;
    const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - ((v - min) / rng) * (h - 4) - 2]);
    const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    return (
      <svg width={w} height={h} style={{ display: 'block', overflow: 'visible' }}>
        {fill && <path d={`${d} L${w},${h} L0,${h} Z`} fill={color} opacity="0.1" />}
        <path d={d} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="2.5" fill={color} />
      </svg>
    );
  }

  // --- Multi-line trend chart with optional scrubber -----------------------
  function TrendChart({ series, labels, w = 640, h = 220, scrub = null, onScrub }) {
    const pad = { l: 34, r: 12, t: 14, b: 24 };
    const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
    const all = series.flatMap((s) => s.values);
    const max = Math.max(...all) * 1.1, min = 0;
    const x = (i) => pad.l + (i / (labels.length - 1)) * iw;
    const y = (v) => pad.t + ih - ((v - min) / (max - min)) * ih;
    const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(max * f));
    return (
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }} onMouseMove={(e) => {
        if (!onScrub) return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = ((e.clientX - r.left) / r.width) * w;
        const idx = Math.round(((px - pad.l) / iw) * (labels.length - 1));
        onScrub(Math.max(0, Math.min(labels.length - 1, idx)));
      }}>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={pad.l} x2={w - pad.r} y1={y(t)} y2={y(t)} stroke={GRID} />
            <text x={pad.l - 6} y={y(t) + 3} textAnchor="end" style={mono} fill={INK}>{t}</text>
          </g>
        ))}
        {labels.map((l, i) => <text key={l} x={x(i)} y={h - 6} textAnchor="middle" style={mono} fill={INK}>{l}</text>)}
        {scrub != null && <line x1={x(scrub)} x2={x(scrub)} y1={pad.t} y2={pad.t + ih} stroke="var(--ink-300)" strokeDasharray="3 3" />}
        {series.map((s) => {
          const d = s.values.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ',' + y(v).toFixed(1)).join(' ');
          return <g key={s.label}>
            <path d={d} fill="none" stroke={s.color} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
            {scrub != null && <circle cx={x(scrub)} cy={y(s.values[scrub])} r="3.5" fill={s.color} stroke="#fff" strokeWidth="1.5" />}
          </g>;
        })}
      </svg>
    );
  }

  // --- Horizontal bars -----------------------------------------------------
  function HBars({ items, max, color, w = 100 }) { // items: {label, value, color?}
    const mx = max || Math.max(...items.map((i) => i.value));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it) => (
          <div key={it.label} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 40px', alignItems: 'center', gap: 10 }}>
            <span style={{ font: 'var(--type-sm)', color: 'var(--ink-700)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.label}</span>
            <div style={{ height: 14, background: 'var(--ink-100)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: (it.value / mx) * 100 + '%', height: '100%', background: it.color || color || 'var(--circle-internal)', borderRadius: 3 }} />
            </div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 600, color: 'var(--ink-800)', textAlign: 'right' }}>{it.value}</span>
          </div>
        ))}
      </div>
    );
  }

  // --- Heatmap matrix ------------------------------------------------------
  function Heatmap({ rows, cols, matrix, onCell, fmt = (v) => v, colorFn = heat }) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: `120px repeat(${cols.length}, 1fr)`, gap: 4, alignItems: 'center' }}>
        <div />
        {cols.map((c) => <div key={c} style={{ ...mono, color: INK, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{c}</div>)}
        {rows.map((r, ri) => (
          <React.Fragment key={r}>
            <div style={{ font: 'var(--type-sm)', color: 'var(--ink-700)', textAlign: 'right', paddingRight: 8 }}>{r}</div>
            {cols.map((c, ci) => {
              const v = matrix[ri][ci];
              const dark = v > 55;
              return <button key={c} type="button" onClick={() => onCell && onCell(ri, ci, v)} style={{ aspectRatio: '1.6', border: 'none', borderRadius: 4, cursor: onCell ? 'pointer' : 'default', background: colorFn(v), color: dark ? '#fff' : 'var(--ink-700)', fontFamily: 'var(--font-serif)', fontSize: 13, fontWeight: 600 }}>{fmt(v)}</button>;
            })}
          </React.Fragment>
        ))}
      </div>
    );
  }

  // --- Gauge (semicircle) --------------------------------------------------
  function Gauge({ value, max = 100, size = 200, color = 'var(--circle-internal)', label }) {
    const r = size / 2 - 16, cx = size / 2, cy = size / 2;
    const a = Math.PI * (1 - value / max);
    const x2 = cx + r * Math.cos(a), y2 = cy - r * Math.sin(a);
    const arc = (frac) => { const ang = Math.PI * (1 - frac); return [cx + r * Math.cos(ang), cy - r * Math.sin(ang)]; };
    const [sx, sy] = arc(0);
    return (
      <svg width={size} height={size / 1.7} viewBox={`0 0 ${size} ${size / 1.7}`}>
        <path d={`M${sx},${sy} A${r},${r} 0 0 1 ${cx + r},${cy}`} fill="none" stroke="var(--ink-150)" strokeWidth="14" strokeLinecap="round" />
        <path d={`M${sx},${sy} A${r},${r} 0 ${value/max > 0.5 ? 1 : 0} 1 ${x2},${y2}`} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" />
        <text x={cx} y={cy - 4} textAnchor="middle" style={{ fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 600, fill: 'var(--ink-900)' }}>{value}</text>
        {label && <text x={cx} y={cy + 16} textAnchor="middle" style={{ ...mono, fill: INK, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</text>}
      </svg>
    );
  }

  // --- Scatter (impact vs effort) -----------------------------------------
  function Scatter({ points, w = 380, h = 300, xLabel = 'Effort', yLabel = 'Impact', onPoint }) {
    const pad = 36;
    const x = (v) => pad + ((v - 1) / 4) * (w - pad * 1.5);
    const y = (v) => h - pad - ((v - 1) / 4) * (h - pad * 1.5);
    return (
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
        <line x1={pad} y1={pad/2} x2={pad} y2={h - pad} stroke={GRID} />
        <line x1={pad} y1={h - pad} x2={w - pad/2} y2={h - pad} stroke={GRID} />
        <text x={w/2} y={h - 6} textAnchor="middle" style={mono} fill={INK}>{xLabel} →</text>
        <text x={12} y={h/2} textAnchor="middle" transform={`rotate(-90 12 ${h/2})`} style={mono} fill={INK}>{yLabel} →</text>
        <text x={pad + 6} y={pad/2 + 4} style={{ ...mono }} fill="var(--positive-600)">quick wins</text>
        {points.map((p) => (
          <g key={p.id} style={{ cursor: onPoint ? 'pointer' : 'default' }} onClick={() => onPoint && onPoint(p)}>
            <circle cx={x(p.effort)} cy={y(p.impact)} r={6 + p.confidence * 6} fill={p.color || 'var(--circle-community)'} opacity="0.85" />
            <text x={x(p.effort)} y={y(p.impact) - 12 - p.confidence * 6} textAnchor="middle" style={{ ...mono, fontWeight: 600 }} fill="var(--ink-700)">{p.id}</text>
          </g>
        ))}
      </svg>
    );
  }

  // --- Network (static radial layout) -------------------------------------
  function Network({ nodes, links, w = 560, h = 360, onNode }) {
    const cx = w / 2, cy = h / 2;
    const pos = {};
    const center = nodes.filter((n) => n.center);
    const ring = nodes.filter((n) => !n.center);
    center.forEach((n) => { pos[n.id] = [cx, cy]; });
    ring.forEach((n, i) => {
      const a = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
      pos[n.id] = [cx + Math.cos(a) * (w * 0.36), cy + Math.sin(a) * (h * 0.38)];
    });
    return (
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
        {links.map((l, i) => { const a = pos[l.s], b = pos[l.t]; return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="var(--ink-300)" strokeWidth={1 + l.w * 3} opacity="0.5" />; })}
        {nodes.map((n) => { const p = pos[n.id]; const rr = n.center ? 30 : 8 + (n.size || 1) * 5; return (
          <g key={n.id} style={{ cursor: onNode ? 'pointer' : 'default' }} onClick={() => onNode && onNode(n)}>
            <circle cx={p[0]} cy={p[1]} r={rr} fill={n.color} opacity={n.center ? 1 : 0.9} />
            <text x={p[0]} y={n.center ? p[1] + 4 : p[1] + rr + 13} textAnchor="middle" style={{ fontFamily: n.center ? 'var(--font-sans)' : 'var(--font-mono)', fontSize: n.center ? 13 : 10, fontWeight: 600, fill: n.center ? '#fff' : 'var(--ink-600)' }}>{n.label}</text>
          </g>
        ); })}
      </svg>
    );
  }

  // --- NJ region tile map --------------------------------------------------
  function RegionMap({ regions, onRegion, active }) {
    const cols = 4, cell = 92, gap = 8;
    return (
      <svg width="100%" viewBox={`0 0 ${cols * (cell + gap)} ${6 * (cell * 0.7 + gap)}`} style={{ display: 'block' }}>
        {regions.map((r) => {
          const x = r.x * (cell + gap), y = r.y * (cell * 0.7 + gap);
          const on = active === r.id;
          return (
            <g key={r.id} style={{ cursor: 'pointer' }} onClick={() => onRegion && onRegion(r)}>
              <rect x={x} y={y} width={cell} height={cell * 0.7} rx="6" fill={heat(r.value)} stroke={on ? 'var(--ink-900)' : '#fff'} strokeWidth={on ? 2.5 : 1.5} />
              <text x={x + 8} y={y + 18} style={{ fontFamily: 'var(--font-sans)', fontSize: 9.5, fontWeight: 600, fill: r.value > 55 ? '#fff' : 'var(--ink-800)' }}>{r.name.split(' / ')[0]}</text>
              <text x={x + 8} y={y + cell * 0.7 - 8} style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 600, fill: r.value > 55 ? '#fff' : 'var(--ink-800)' }}>{r.value}</text>
            </g>
          );
        })}
      </svg>
    );
  }

  // --- Radar / spider chart ------------------------------------------------
  function Radar({ axes, series, size = 320, max = 50 }) {
    // axes: [{label}], series: [{label,color,values:[...]}]
    const cx = size / 2, cy = size / 2, r = size / 2 - 46;
    const n = axes.length;
    const pt = (i, frac) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      return [cx + Math.cos(a) * r * frac, cy + Math.sin(a) * r * frac];
    };
    const rings = [0.25, 0.5, 0.75, 1];
    return (
      <svg width="100%" viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', overflow: 'visible' }}>
        {rings.map((f, ri) => (
          <polygon key={ri} points={axes.map((_, i) => pt(i, f).join(',')).join(' ')} fill="none" stroke={GRID} strokeWidth="1" />
        ))}
        {axes.map((ax, i) => {
          const [x, y] = pt(i, 1);
          const [lx, ly] = pt(i, 1.18);
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke={GRID} strokeWidth="1" />
              <text x={lx} y={ly + 3} textAnchor={Math.abs(lx - cx) < 8 ? 'middle' : lx > cx ? 'start' : 'end'} style={{ ...mono, fontSize: 9.5 }} fill={INK}>{ax.label}</text>
            </g>
          );
        })}
        {series.map((s) => {
          const poly = s.values.map((v, i) => pt(i, Math.min(1, v / max)).join(',')).join(' ');
          return (
            <g key={s.label}>
              <polygon points={poly} fill={s.color} fillOpacity="0.14" stroke={s.color} strokeWidth="2" strokeLinejoin="round" />
              {s.values.map((v, i) => { const [x, y] = pt(i, Math.min(1, v / max)); return <circle key={i} cx={x} cy={y} r="3" fill={s.color} />; })}
            </g>
          );
        })}
      </svg>
    );
  }

  // --- Stacked horizontal bar (100% composition) ---------------------------
  function StackedBars({ items, segs }) {
    // items: [{label, parts:{key:value}}]; segs: [{key,label,color}]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((it) => {
          const total = segs.reduce((s, g) => s + (it.parts[g.key] || 0), 0) || 1;
          return (
            <div key={it.label} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', gap: 12 }}>
              <span style={{ font: 'var(--type-sm)', color: 'var(--ink-700)' }}>{it.label}</span>
              <div style={{ display: 'flex', height: 18, borderRadius: 4, overflow: 'hidden', background: 'var(--ink-100)' }}>
                {segs.map((g) => {
                  const w = ((it.parts[g.key] || 0) / total) * 100;
                  return w > 0 ? <div key={g.key} title={`${g.label}: ${it.parts[g.key]}%`} style={{ width: w + '%', background: g.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {w > 12 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: '#fff', fontWeight: 600 }}>{it.parts[g.key]}</span>}
                  </div> : null;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  window.Charts = { Sparkline, TrendChart, HBars, Heatmap, Gauge, Scatter, Network, RegionMap, Radar, StackedBars, heat };
})();
