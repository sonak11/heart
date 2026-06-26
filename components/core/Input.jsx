import React from 'react';

/**
 * Text input with label + helper. Civic, square corners, scarlet focus ring.
 */
export function Input({ label, helper, error, iconLeft = null, value, onChange, placeholder, type = 'text', style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? 'var(--critical-500)' : focus ? 'var(--brand)' : 'var(--border-strong)';
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-sans)', ...style }}>
      {label && <span style={{ fontSize: '13px', fontWeight: 'var(--w-semibold)', color: 'var(--ink-700)' }}>{label}</span>}
      <span
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'var(--white)',
          border: `1px solid ${borderColor}`,
          borderRadius: 'var(--radius-sm)',
          padding: '0 12px',
          boxShadow: focus ? 'var(--ring-focus)' : 'none',
          transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
        }}
      >
        {iconLeft && <span style={{ display: 'inline-flex', color: 'var(--ink-400)' }}>{iconLeft}</span>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            border: 'none', outline: 'none', background: 'transparent',
            font: 'var(--type-body)', color: 'var(--ink-800)',
            padding: '9px 0', width: '100%',
          }}
          {...rest}
        />
      </span>
      {(helper || error) && (
        <span style={{ fontSize: '12px', color: error ? 'var(--critical-600)' : 'var(--text-muted)' }}>{error || helper}</span>
      )}
    </label>
  );
}
