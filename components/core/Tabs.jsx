import React from 'react';

/**
 * Underline tab navigation.
 */
export function Tabs({ tabs = [], value, onChange, style = {} }) {
  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        gap: '4px',
        borderBottom: '1px solid var(--border-divider)',
        ...style,
      }}
    >
      {tabs.map((t) => {
        const key = typeof t === 'string' ? t : t.value;
        const label = typeof t === 'string' ? t : t.label;
        const count = typeof t === 'object' ? t.count : undefined;
        const active = key === value;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange && onChange(key)}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              fontWeight: 'var(--w-semibold)',
              fontSize: '14px',
              color: active ? 'var(--ink-900)' : 'var(--ink-500)',
              padding: '11px 12px',
              marginBottom: '-1px',
              borderBottom: `2px solid ${active ? 'var(--brand)' : 'transparent'}`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              transition: 'color var(--dur-fast)',
            }}
          >
            {label}
            {count != null && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'var(--w-medium)',
                background: active ? 'var(--scarlet-100)' : 'var(--ink-100)',
                color: active ? 'var(--scarlet-700)' : 'var(--ink-500)',
                padding: '1px 6px', borderRadius: 'var(--radius-pill)',
              }}>{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
