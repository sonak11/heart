import React from 'react';

/**
 * Native select styled to the HEART system.
 */
export function Select({ label, value, onChange, options = [], style = {}, ...rest }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-sans)', ...style }}>
      {label && <span style={{ fontSize: '13px', fontWeight: 'var(--w-semibold)', color: 'var(--ink-700)' }}>{label}</span>}
      <span style={{ position: 'relative', display: 'inline-flex' }}>
        <select
          value={value}
          onChange={onChange}
          style={{
            appearance: 'none', WebkitAppearance: 'none',
            font: 'var(--type-body)', color: 'var(--ink-800)',
            background: 'var(--white)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-sm)',
            padding: '9px 34px 9px 12px',
            width: '100%', cursor: 'pointer', outline: 'none',
          }}
          {...rest}
        >
          {options.map((o) => {
            const v = typeof o === 'string' ? o : o.value;
            const l = typeof o === 'string' ? o : o.label;
            return <option key={v} value={v}>{l}</option>;
          })}
        </select>
        <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--ink-400)', fontSize: '11px' }}>▾</span>
      </span>
    </label>
  );
}
