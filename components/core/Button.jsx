import React from 'react';

const sizes = {
  sm: { padding: '6px 12px', font: '13px', radius: 'var(--radius-sm)', gap: '6px' },
  md: { padding: '9px 16px', font: '14px', radius: 'var(--radius-sm)', gap: '8px' },
  lg: { padding: '12px 22px', font: '15px', radius: 'var(--radius-md)', gap: '8px' },
};

const variants = {
  primary: {
    base: { background: 'var(--brand)', color: 'var(--text-on-brand)', border: '1px solid var(--brand)' },
    hover: { background: 'var(--brand-hover)', borderColor: 'var(--brand-hover)' },
  },
  secondary: {
    base: { background: 'var(--white)', color: 'var(--ink-800)', border: '1px solid var(--border-strong)' },
    hover: { background: 'var(--ink-100)' },
  },
  ghost: {
    base: { background: 'transparent', color: 'var(--ink-700)', border: '1px solid transparent' },
    hover: { background: 'var(--ink-100)' },
  },
  authority: {
    base: { background: 'var(--slate-800)', color: 'var(--slate-100)', border: '1px solid var(--slate-700)' },
    hover: { background: 'var(--slate-700)' },
  },
  danger: {
    base: { background: 'var(--critical-500)', color: 'var(--white)', border: '1px solid var(--critical-500)' },
    hover: { background: 'var(--critical-600)', borderColor: 'var(--critical-600)' },
  },
};

/**
 * HEART primary action button. Civic, square-ish, restrained.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  fullWidth = false,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const sz = sizes[size] || sizes.md;
  const vr = variants[variant] || variants.primary;

  const composed = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sz.gap,
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--w-semibold)',
    fontSize: sz.font,
    lineHeight: 1,
    padding: sz.padding,
    borderRadius: sz.radius,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    width: fullWidth ? '100%' : 'auto',
    transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
    transform: hover && !disabled ? 'translateY(-1px)' : 'none',
    whiteSpace: 'nowrap',
    ...vr.base,
    ...(hover && !disabled ? vr.hover : null),
    ...style,
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={composed}
      {...rest}
    >
      {iconLeft && <span style={{ display: 'inline-flex' }}>{iconLeft}</span>}
      {children}
      {iconRight && <span style={{ display: 'inline-flex' }}>{iconRight}</span>}
    </button>
  );
}
