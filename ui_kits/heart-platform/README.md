# HEART Platform — UI Kit (V10)

High-fidelity recreation of the **Health Equity Readiness (HEART)** analytics platform — a full healthcare-intelligence product surface for Rutgers leadership. Built entirely on the HEART design system; no visual identity was changed in the expansion.

## Run it
Open `index.html`. Navigate via the sidebar or **⌘K / Ctrl-K** command palette. Toggle the **Copilot** (top-right) and **Executive Mode** anywhere.

## Product chrome (every screen)
- **⌘K Command Palette** — search pages, themes, quotes, and actions (`CommandPalette.jsx`).
- **AI Copilot** drawer — contextual prompts + streamed canned answers grounded in the coding matrix (`Copilot.jsx`).
- **Global Filter Bar** — engagement-circle segmented filter, pillar + timeframe, **Compare mode**, **Saved views**, **Snapshot** (`FilterBar.jsx`).
- **Toasts** for action feedback; **Executive Mode** full-screen Dean briefing (`ExecutiveMode.jsx`).

## Screens
`AppShell.jsx` (sidebar + topbar + filter bar) wraps:

| Group | Screens |
|---|---|
| Intelligence | Executive Overview · **Readiness Score** (gauge + weighted drivers) · **Theme Intelligence** (drill-down) · **Emerging Themes** · **Voice vs Authority** (flagship) · **Gap Analysis** (heatmap) · **Stakeholder Intelligence** |
| Evidence | **Quote Explorer** (semantic search, AI summary, similar quotes, collections, compare) · **Cross-Pillar Network** · **Trends & Timeline** (scrubber) · **Geographic** (NJ region map) · **Coding Quality** (AI-vs-human, confusion matrix, coverage, recruitment) |
| Delivery | **Program Impact** · **Recommendation Intelligence** (impact/effort scatter) · Executive Reports* · Admin & Agents* |

\* IA placeholders — every other surface is fully interactive.

## Files
- `DataModel.jsx` — shared mock corpus (themes, circles, pillars, stakeholders, programs, geo, trends, recommendations, quotes, coding stats).
- `Charts.jsx` — tokenized SVG primitives: Sparkline, TrendChart, HBars, Heatmap, Gauge, Scatter, Network, RegionMap.
- `Kit.jsx` — AIInsight callout, Tooltip, Section, Grid.
- `Icons.jsx` — Lucide-style line icons.
- `DashboardsA–D.jsx` — the analytics screens.

## How it composes the system
All chrome and cards use the compiled primitives from `window.HEARTDesignSystem_<hash>` (Button, Panel, KpiCard, Badge, CircleBadge, Tag, Input, Select, Tabs). Charts are hand-built on the token system — no charting library. Engagement-circle color coding (Community = clay, Internal = teal, Leadership = deep blue) is consistent across every screen. All "AI" responses are deterministic canned content for demo purposes.
