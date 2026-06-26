import React from 'react';

/**
 * Generic content panel with optional header (title + eyebrow + action slot).
 */
export function Panel({ title, eyebrow, action = null, children, padded = true, style = {}, bodyStyle = {} }) {
  return (
    <section
      style={{
        background: 'var(--surface-card)',
        border: 'var(--border-card)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {(title || eyebrow || action) && (
        <header
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-divider)',
          }}
        >
          <div>
            {eyebrow && <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>{eyebrow}</div>}
            {title && <h3 style={{ font: 'var(--type-title)', color: 'var(--text-display)', margin: 0 }}>{title}</h3>}
          </div>
          {action && <div style={{ flex: 'none' }}>{action}</div>}
        </header>
      )}
      <div style={{ padding: padded ? '20px' : 0, ...bodyStyle }}>{children}</div>
    </section>
  );
}
