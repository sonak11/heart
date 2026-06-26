import React from 'react';

const circles = {
  1: { label: 'Community Voice', color: 'var(--circle-community)', soft: 'var(--circle-community-soft)', n: 'Circle 1' },
  2: { label: 'Internal Stakeholders', color: 'var(--circle-internal)', soft: 'var(--circle-internal-soft)', n: 'Circle 2' },
  3: { label: 'Leadership', color: 'var(--circle-leadership)', soft: 'var(--circle-leadership-soft)', n: 'Circle 3' },
};

/**
 * Engagement-circle identity pill — the analytic spine of HEART.
 */
export function CircleBadge({ circle = 1, showLabel = true, size = 'md', style = {}, ...rest }) {
  const c = circles[circle] || circles[1];
  const small = size === 'sm';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: small ? '6px' : '8px',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--w-semibold)',
        fontSize: small ? '12px' : '13px',
        lineHeight: 1.3,
        padding: small ? '3px 9px 3px 7px' : '5px 12px 5px 9px',
        borderRadius: 'var(--radius-pill)',
        background: c.soft,
        color: c.color,
        ...style,
      }}
      {...rest}
    >
      <span style={{ width: small ? 8 : 10, height: small ? 8 : 10, borderRadius: 999, background: c.color, flex: 'none' }} />
      {showLabel ? c.label : c.n}
    </span>
  );
}
