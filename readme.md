# HEART Design System

Design system for **HEART — Health Equity Readiness**, a Rutgers medical-school intelligence platform that turns hundreds of coded qualitative interviews (focus groups + 1:1s) into actionable insight for deans, physicians, and AWS partners. The product surface is an analytics platform — dashboards, a quote/evidence explorer, executive reporting — not a clinical tool and not a marketing site.

> **Provenance.** This system was built from a written product brief; **no existing codebase, Figma file, brand book, or logo was provided.** The visual identity below (logo wordmark, palette anchored on Rutgers scarlet, type pairing) is an original proposal for HEART and should be validated against any official Rutgers / HEART brand assets before production use.

---

## Brand idea — "Intelligence briefing"
HEART reads like a **trusted civic intelligence report**, not a SaaS dashboard. Warm-paper neutrals (humanism of health equity) carry an editorial serif for headlines and big metrics; a civic sans (Public Sans, the USWDS face) runs the interface; mono labels handle codes and metadata. Authority surfaces go deep slate for leadership moments. The analytic spine is the **engagement circle** — every quote, theme, and metric is attributable to Circle 1 Community Voice, Circle 2 Internal Stakeholders, or Circle 3 Leadership, each with a fixed color.

---

## CONTENT FUNDAMENTALS
How HEART writes.

- **Register:** calm, declarative, evidence-led. It states what the data shows and what decision follows — never hype. *"Community-raised barriers remain under-acknowledged by leadership in 3 of 4 pillars."*
- **Voice:** institutional but human. Third person about the data ("the community raises…"), direct second person for actions ("Review the gap below"). Avoid first-person "we" except in participant quotes.
- **Casing:** Sentence case for headings and body. UPPERCASE only for mono eyebrows/overlines and code IDs. Never title-case marketing headlines.
- **Numbers lead.** Headlines pair a serif number with a short clause. Always attribute and scope a metric ("+5 vs Q1", "across 3 circles"). Show the calculation when a metric is derived (the Voice–Authority gap formula is printed on its dashboard).
- **Codes are first-class.** Theme codes (`BARR-04`), interview IDs (`INT-2026-0142`), and subcodes appear in mono, verbatim, never prettified.
- **Tone toward findings:** non-blaming. A leadership blind spot is framed as a "gap" or "under-recognition," not a failure.
- **No emoji.** Status is carried by color + dot badges and line icons, never emoji. No exclamation marks in UI copy.
- **Quotes are sacred:** participant quotes are shown verbatim in serif, with attribution limited to role + circle + program — never names.

---

## VISUAL FOUNDATIONS
- **Color:** Warm-paper background (`--paper #FBF9F5`), white surfaces. **Rutgers scarlet `#CC0033`** is the brand mark and primary action — used sparingly. Deep **slate** (`--slate-900`) for authority/leadership chrome (exec banner). Engagement-circle trio: **clay** (Community), **teal** (Internal), **deep blue** (Leadership). An 8-hue categorical palette drives theme/pillar series; a 6-step **heat ramp** (paper → clay → burnt) encodes gap intensity. Critical alerts use a dedicated `--critical-500 #C61F3D`, deliberately distinct from the scarlet brand so "danger" never reads as "brand."
- **Type:** Display serif **Newsreader** (headlines + big KPI numbers — editorial gravitas + warmth). UI sans **Public Sans** (all chrome, tables, body — civic-trust register). Mono **IBM Plex Mono** (codes, IDs, eyebrows, axis labels). Big numbers are always serif; that serif/number signature is the most recognizable HEART move.
- **Spacing:** 4px base grid. Generous panel padding (20px). Content max-width 1320px.
- **Backgrounds:** flat warm paper. **No gradients** except the single deep-slate authority banner (solid, not gradient). No imagery/illustration in chrome — this is a data product; the "imagery" is the charts and the verbatim quotes.
- **Corners:** restrained. Cards `--radius-md 8px`; chips/code tags `--radius-xs 3px`; pills for badges/circle identity. Nothing bubbly.
- **Cards:** white, **hairline border first, soft shadow second** (`--shadow-sm`). Warm-tinted shadows (based on ink, not pure black). Quote cards add a 3px left border in the source circle's color.
- **Borders:** 1px, warm ink (`--border-divider`/`--border-default`). Tables divide with `--border-divider`.
- **Elevation:** xs→lg soft warm shadows; `--shadow-pop` only over the slate authority surface.
- **Motion:** restrained. `--dur-fast 120ms` / `--dur-base 200ms`, `--ease-out`. Buttons lift 1px on hover; tabs/links shift color. No bounces, no infinite loops, no decorative motion.
- **Hover/press:** primary darkens (scarlet-500 → 600) + 1px lift; secondary/ghost fill with `--ink-100`. Focus shows a scarlet ring (`--ring-focus`).
- **Transparency/blur:** the sticky top bar uses a translucent paper fill + 8px backdrop blur. Otherwise surfaces are opaque.

---

## ICONOGRAPHY
- **System:** **Lucide** line icons — 24px grid, **1.75 stroke**, round caps/joins, `currentColor`. They sit at 18px in nav, 16–20px inline. This matches the civic, precise tone (no filled or duotone icons).
- **Implementation:** `ui_kits/heart-platform/Icons.jsx` ships a hand-traced subset (gauge, layers, network, scale, users, quote, search, file, flow, settings, download, bell, alert, filter, sparkle, arrows). **Substitution flag:** these are traced from the open-source Lucide set; swap for the official `lucide` package/CDN in production for the full library.
- **Status semantics:** carried by color + dot badges, not icon shape. `alert` (triangle) marks blind spots; `scale` marks the Voice-vs-Authority flagship.
- **Emoji / unicode:** never used as iconography. The only non-icon glyphs are typographic quote marks in quote cards and `▾` on native selects.
- **Logo:** there is no official mark; the system uses a scarlet "H" tile + "HEART / HEALTH EQUITY READINESS" wordmark (see `AppShell.jsx`) as a placeholder. **Replace with the official Rutgers/HEART logo when available.**

---

## INDEX — what's in this project
**Root**
- `styles.css` — global entry (consumers link this). `@import` list only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `elevation.css`.
- `readme.md` (this file) · `SKILL.md` (Agent-Skill manifest).

**Foundations — `guidelines/`** (specimen cards on the Design System tab)
- Colors: brand, neutrals, engagement circles, categorical, semantic, heat.
- Type: display serif, UI sans, mono.
- Spacing: scale, radii, elevation.

**Components — `components/core/`** (`window.HEARTDesignSystem_d7d056`)
- `Button`, `Badge`, `Tag`, `CircleBadge`, `KpiCard`, `Panel`, `Input`, `Select`, `Tabs`. Each has `.jsx` + `.d.ts` + `.prompt.md`; `components/core/core.card.html` is the specimen.

**UI kit — `ui_kits/heart-platform/`**
- `index.html` interactive harness; screens: Executive Overview, Voice vs Authority (flagship), Quote Explorer; `AppShell.jsx`, `Icons.jsx`. See its `README.md`.

**Generated (do not edit):** `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`.

---

## Open questions for the project lead
1. **Fonts** — confirm Newsreader / Public Sans / IBM Plex Mono, or provide official faces.
2. **Logo & brand** — is there an official HEART/Rutgers mark and palette to anchor to? Scarlet `#CC0033` is assumed.
3. **Scope** — the kit builds 3 flagship dashboards; confirm which of the remaining IA surfaces (Pillar/Theme Intelligence, Stakeholder, Cross-Pillar Flow, Reports, Admin) to build next.
