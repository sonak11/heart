/* Lucide-style line icons (24px grid, 1.75 stroke) used across the HEART platform.
   Substitution note: these are hand-traced from the Lucide open-source set —
   swap for the official lucide CDN if preferred. */

function Svg({ children, size = 20, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', ...style }}>
      {children}
    </svg>
  );
}

const Icon = {
  gauge: (p) => <Svg {...p}><path d="M12 14l4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></Svg>,
  layers: (p) => <Svg {...p}><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></Svg>,
  network: (p) => <Svg {...p}><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="19" r="2.5" /><circle cx="19" cy="19" r="2.5" /><path d="M12 7.5v4M10 17l-3.2-3M14 17l3.2-3" /></Svg>,
  scale: (p) => <Svg {...p}><path d="M12 3v18M7 7l-4 7h8l-4-7ZM17 7l-4 7h8l-4-7Z" /><path d="M5 21h14" /></Svg>,
  users: (p) => <Svg {...p}><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5.5a3 3 0 0 1 0 5M21 20a6 6 0 0 0-4-5.6" /></Svg>,
  quote: (p) => <Svg {...p}><path d="M7 7H4v6h6V7c0 4-1 6-4 7M20 7h-3v6h6V7c0 4-1 6-4 7" /></Svg>,
  search: (p) => <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Svg>,
  file: (p) => <Svg {...p}><path d="M14 3v5h5" /><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-5Z" /><path d="M8 13h8M8 17h6" /></Svg>,
  flow: (p) => <Svg {...p}><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /><path d="M9 6h4a2 2 0 0 1 2 2v7" /></Svg>,
  settings: (p) => <Svg {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 4.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V1a2 2 0 0 1 4 0v.1A1.6 1.6 0 0 0 17 4.6a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H23a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" /></Svg>,
  download: (p) => <Svg {...p}><path d="M12 3v12M7 11l5 5 5-5" /><path d="M5 21h14" /></Svg>,
  bell: (p) => <Svg {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M10 19a2 2 0 0 0 4 0" /></Svg>,
  arrowRight: (p) => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>,
  arrowUpRight: (p) => <Svg {...p}><path d="M7 17 17 7M8 7h9v9" /></Svg>,
  alert: (p) => <Svg {...p}><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></Svg>,
  check: (p) => <Svg {...p}><path d="M20 6 9 17l-5-5" /></Svg>,
  chevronDown: (p) => <Svg {...p}><path d="m6 9 6 6 6-6" /></Svg>,
  filter: (p) => <Svg {...p}><path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z" /></Svg>,
  sparkle: (p) => <Svg {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /></Svg>,
  moon: (p) => <Svg {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></Svg>,
  sun: (p) => <Svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Svg>,
};

window.Icon = Icon;
