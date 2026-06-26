import React from 'react';

const trendColor = { up: 'var(--positive-600)', down: 'var(--critical-600)', flat: 'var(--ink-500)' };
const trendGlyph = { up: '▲', down: '▼', flat: '—' };

/**
 * Headline metric card — big serif number, mono eyebrow, optional trend.
 */
export function KpiCard({ label, value, unit = '', trend = null, trendValue = '', caption = '', accent = 'var(--scarlet-600)', style = {} }) {
  return (
    <div
      style={{
        background: 'var(--surface-card)',
        border: 'var(--border-card)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        padding: 'var(--space-5) var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>
        {trend && (
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--w-semibold)', fontSize: '12px', color: trendColor[trend], display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ fontSize: '9px' }}>{trendGlyph[trend]}</span>{trendValue}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 'var(--w-semibold)', fontSize: 'var(--fs-kpi)', lineHeight: 'var(--lh-kpi)', color: accent, letterSpacing: 'var(--tracking-tight)' }}>{value}</span>
        {unit && <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--ink-400)' }}>{unit}</span>}
      </div>
      {caption && <div style={{ font: 'var(--type-sm)', color: 'var(--text-secondary)' }}>{caption}</div>}
    </div>
  );
}
