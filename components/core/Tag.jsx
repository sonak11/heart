import React from 'react';

/**
 * Monospace code chip — for parent/subcode IDs, interview IDs, pillar codes.
 */
export function Tag({ children, removable = false, onRemove, style = {}, ...rest }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: 'var(--font-mono)',
        fontWeight: 'var(--w-medium)',
        fontSize: '12px',
        lineHeight: 1,
        letterSpacing: '0.02em',
        padding: '5px 9px',
        borderRadius: 'var(--radius-xs)',
        background: 'var(--ink-100)',
        color: 'var(--ink-700)',
        border: '1px solid var(--border-divider)',
        ...style,
      }}
      {...rest}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove"
          style={{
            border: 'none', background: 'none', cursor: 'pointer', padding: 0,
            color: 'var(--ink-400)', fontSize: '14px', lineHeight: 1, fontFamily: 'var(--font-sans)',
          }}
        >×</button>
      )}
    </span>
  );
}
