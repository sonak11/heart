import React from 'react';

const tones = {
  neutral:  { bg: 'var(--ink-100)', fg: 'var(--ink-700)', bd: 'var(--border-default)' },
  brand:    { bg: 'var(--scarlet-100)', fg: 'var(--scarlet-700)', bd: 'var(--scarlet-100)' },
  positive: { bg: 'var(--positive-100)', fg: 'var(--positive-600)', bd: 'var(--positive-100)' },
  caution:  { bg: 'var(--caution-100)', fg: 'var(--caution-600)', bd: 'var(--caution-100)' },
  critical: { bg: 'var(--critical-100)', fg: 'var(--critical-600)', bd: 'var(--critical-100)' },
  info:     { bg: 'var(--info-100)', fg: 'var(--info-600)', bd: 'var(--info-100)' },
};

/**
 * Small status / category label.
 */
export function Badge({ children, tone = 'neutral', dot = false, style = {}, ...rest }) {
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--w-semibold)',
        fontSize: '12px',
        lineHeight: 1.4,
        padding: '3px 9px',
        borderRadius: 'var(--radius-pill)',
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.bd}`,
        ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: t.fg }} />}
      {children}
    </span>
  );
}
