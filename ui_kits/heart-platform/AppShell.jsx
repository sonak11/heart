/* HEART platform application shell — sidebar + topbar + content frame.
   Responsive: on phones the sidebar becomes an off-canvas drawer and the
   top bar condenses to icon actions. */

const NAV = [
  { section: 'Intelligence', items: [
    { id: 'overview', label: 'Executive Command Center', icon: 'gauge' },
    { id: 'readiness', label: 'Readiness Score', icon: 'gauge' },
    { id: 'voice', label: 'Voice vs Authority', icon: 'scale', flag: true },
    { id: 'theme', label: 'Theme Intelligence', icon: 'network' },
    { id: 'circle', label: 'Engagement & Stakeholders', icon: 'users' },
    { id: 'gap', label: 'Gaps & Barriers', icon: 'alert' },
  ]},
  { section: 'Evidence', items: [
    { id: 'quotes', label: 'Quote Explorer', icon: 'quote' },
    { id: 'matrix', label: 'Coding Matrix Explorer', icon: 'file' },
    { id: 'patterns', label: 'Connections, Trends & Geography', icon: 'network' },
    { id: 'coding', label: 'Coding Quality', icon: 'file' },
  ]},
  { section: 'Pipeline & Delivery', items: [
    { id: 'recommend', label: 'Programs & Blueprint', icon: 'sparkle' },
    { id: 'operations', label: 'Pipeline Operations', icon: 'flow' },
  ]},
];

// Small media-query hook so the shell can restructure on phones.
function useMedia(query) {
  const get = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false);
  const [match, setMatch] = React.useState(get);
  React.useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener ? m.addEventListener('change', on) : m.addListener(on);
    return () => { m.removeEventListener ? m.removeEventListener('change', on) : m.removeListener(on); };
  }, [query]);
  return match;
}

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        width: 34, height: 34, borderRadius: 'var(--radius-sm)', flex: 'none',
        background: 'var(--scarlet-500)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 19, letterSpacing: '-0.02em',
      }}>H</div>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16, color: 'var(--ink-900)', letterSpacing: '0.04em' }}>HEART</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--ink-400)', letterSpacing: '0.04em', marginTop: 3 }}>HEALTH EQUITY READINESS</div>
      </div>
    </div>
  );
}

function NavList({ active, onNavigate }) {
  return (
    <nav style={{ padding: '14px 12px', overflowY: 'auto', flex: 1 }}>
      {NAV.map((grp) => (
        <div key={grp.section} style={{ marginBottom: 18 }}>
          <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)', padding: '0 10px', marginBottom: 8 }}>{grp.section}</div>
          {grp.items.map((it) => {
            const on = active === it.id;
            const Glyph = window.Icon[it.icon];
            return (
              <button key={it.id} type="button" onClick={() => onNavigate(it.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '10px 10px', marginBottom: 2, border: 'none', cursor: 'pointer',
                  borderRadius: 'var(--radius-sm)', textAlign: 'left',
                  background: on ? 'var(--scarlet-050)' : 'transparent',
                  color: on ? 'var(--scarlet-700)' : 'var(--ink-600)',
                  fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: on ? 600 : 500,
                  transition: 'background var(--dur-fast)',
                }}>
                <span style={{ color: on ? 'var(--scarlet-500)' : 'var(--ink-400)', display: 'inline-flex' }}><Glyph size={18} /></span>
                <span style={{ flex: 1 }}>{it.label}</span>
                {it.flag && <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--scarlet-500)' }} />}
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

function UserCard() {
  return (
    <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-divider)', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 30, height: 30, borderRadius: 999, background: 'var(--circle-leadership)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12 }}>RA</div>
      <div style={{ lineHeight: 1.3 }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--ink-800)' }}>Research Author</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-400)' }}>QuickSight · Author</div>
      </div>
    </div>
  );
}

/* Desktop sticky sidebar */
function Sidebar({ active, onNavigate }) {
  return (
    <aside style={{
      width: 'var(--sidebar-w)', flex: 'none', background: 'var(--white)',
      borderRight: '1px solid var(--border-divider)', height: '100vh',
      position: 'sticky', top: 0, display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border-divider)' }}><Logo /></div>
      <NavList active={active} onNavigate={onNavigate} />
      <UserCard />
    </aside>
  );
}

/* Mobile off-canvas drawer */
function Drawer({ open, onClose, active, onNavigate, onExec, theme, onToggleTheme }) {
  const ThemeIcon = window.Icon[theme === 'dark' ? 'sun' : 'moon'];
  return (
    <React.Fragment>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(20,18,15,0.42)', zIndex: 40,
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity var(--dur-base) var(--ease-out)',
      }} />
      <aside style={{
        position: 'fixed', top: 0, left: 0, height: '100dvh', width: 'min(86vw, 320px)', zIndex: 41,
        background: 'var(--white)', borderRight: '1px solid var(--border-divider)',
        display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-lg)',
        transform: open ? 'translateX(0)' : 'translateX(-102%)',
        transition: 'transform var(--dur-base) var(--ease-out)',
      }}>
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border-divider)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo />
          <button type="button" onClick={onClose} aria-label="Close menu" style={{ width: 36, height: 36, flex: 'none', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)', background: 'var(--white)', color: 'var(--ink-600)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>×</button>
        </div>
        <NavList active={active} onNavigate={(id) => { onNavigate(id); onClose(); }} />
        <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border-divider)', display: 'flex', gap: 8 }}>
          <button type="button" onClick={() => { onToggleTheme(); }} style={{ flex: 1, height: 40, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)', background: 'var(--white)', color: 'var(--ink-700)', cursor: 'pointer', font: 'var(--type-sm)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}><ThemeIcon size={16} />{theme === 'dark' ? 'Light' : 'Dark'}</button>
          <button type="button" onClick={() => { onExec(); onClose(); }} style={{ flex: 1, height: 40, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)', background: 'var(--white)', color: 'var(--ink-700)', cursor: 'pointer', font: 'var(--type-sm)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}><window.Icon.gauge size={16} />Executive</button>
        </div>
        <UserCard />
      </aside>
    </React.Fragment>
  );
}

function IconBtn({ onClick, label, children }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} title={label} style={{ width: 38, height: 38, flex: 'none', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)', background: 'var(--white)', color: 'var(--ink-600)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{children}</button>
  );
}

function TopBar({ title, eyebrow, children, onOpenPalette, onOpenCopilot, onExec, theme, onToggleTheme, mobile, onOpenMenu }) {
  const ThemeIcon = window.Icon[theme === 'dark' ? 'sun' : 'moon'];

  if (mobile) {
    return (
      <header style={{
        minHeight: 'var(--topbar-h)', borderBottom: '1px solid var(--border-divider)',
        background: 'var(--bg-topbar)', backdropFilter: 'blur(8px)',
        position: 'sticky', top: 0, zIndex: 7,
        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
      }}>
        <button type="button" onClick={onOpenMenu} aria-label="Open menu" style={{ width: 38, height: 38, flex: 'none', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)', background: 'var(--white)', color: 'var(--ink-700)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          {eyebrow && <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{eyebrow}</div>}
          <h1 style={{ font: 'var(--type-h3)', color: 'var(--ink-900)', margin: 0, letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</h1>
        </div>
        <IconBtn onClick={onOpenPalette} label="Search"><window.Icon.search size={17} /></IconBtn>
        <button type="button" onClick={onOpenCopilot} aria-label="Copilot" title="Copilot" style={{ width: 38, height: 38, flex: 'none', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--slate-800)', color: '#fff', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><window.Icon.sparkle size={17} /></button>
      </header>
    );
  }

  return (
    <header style={{
      height: 'var(--topbar-h)', borderBottom: '1px solid var(--border-divider)',
      background: 'var(--bg-topbar)', backdropFilter: 'blur(8px)',
      position: 'sticky', top: 0, zIndex: 7,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px',
    }}>
      <div>
        {eyebrow && <div style={{ font: 'var(--type-eyebrow)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' }}>{eyebrow}</div>}
        <h1 style={{ font: 'var(--type-h2)', color: 'var(--ink-900)', margin: 0, letterSpacing: '-0.01em' }}>{title}</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button type="button" onClick={onOpenPalette} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 36, padding: '0 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)', background: 'var(--white)', color: 'var(--ink-400)', cursor: 'pointer', font: 'var(--type-sm)' }}>
          <window.Icon.search size={15} /><span>Search…</span>
          <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 10, border: '1px solid var(--border-default)', borderRadius: 4, padding: '1px 5px', color: 'var(--ink-400)' }}>⌘K</kbd>
        </button>
        {children}
        <button type="button" onClick={onToggleTheme} title="Toggle light / dark" style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)', background: 'var(--white)', color: 'var(--ink-600)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><ThemeIcon size={17} /></button>
        <button type="button" onClick={onExec} style={{ height: 36, padding: '0 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)', background: 'var(--white)', color: 'var(--ink-600)', cursor: 'pointer', font: 'var(--type-sm)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 7 }}><window.Icon.gauge size={16} />Executive Mode</button>
        <button type="button" onClick={onOpenCopilot} style={{ height: 36, padding: '0 14px', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--slate-800)', color: '#fff', cursor: 'pointer', font: 'var(--type-sm)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 7 }}><window.Icon.sparkle size={16} />Copilot</button>
      </div>
    </header>
  );
}

function AppShell({ active, onNavigate, title, eyebrow, onOpenPalette, onOpenCopilot, onExec, filterBar, children, theme, onToggleTheme }) {
  const mobile = useMedia('(max-width: 860px)');
  const [drawer, setDrawer] = React.useState(false);
  React.useEffect(() => { if (!mobile) setDrawer(false); }, [mobile]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--paper)' }}>
      {!mobile && <Sidebar active={active} onNavigate={onNavigate} />}
      {mobile && (
        <Drawer open={drawer} onClose={() => setDrawer(false)} active={active} onNavigate={onNavigate} onExec={onExec} theme={theme} onToggleTheme={onToggleTheme} />
      )}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <TopBar title={title} eyebrow={eyebrow} onOpenPalette={onOpenPalette} onOpenCopilot={onOpenCopilot} onExec={onExec} theme={theme} onToggleTheme={onToggleTheme} mobile={mobile} onOpenMenu={() => setDrawer(true)} />
        {filterBar}
        <main style={{ flex: 1, padding: mobile ? '16px' : '28px', maxWidth: 'var(--content-max)', width: '100%', boxSizing: 'border-box' }}>{children}</main>
      </div>
    </div>
  );
}

window.AppShell = AppShell;
