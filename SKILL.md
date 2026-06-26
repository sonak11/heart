---
name: heart-design
description: Use this skill to generate well-branded interfaces and assets for HEART (Health Equity Readiness), a Rutgers medical-school qualitative-analytics platform, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation
- **What HEART is:** an "intelligence briefing" analytics platform — dashboards, a quote/evidence explorer, executive reporting — for Rutgers leadership analyzing health-equity interviews. Calm, evidence-led, non-blaming. Not a clinical tool, not a marketing site.
- **Tokens:** link `styles.css`; author against semantic aliases (`--text-body`, `--surface-card`, `--brand`, `--border-divider`, circle + categorical + heat colors).
- **Type signature:** big numbers and headlines in Newsreader (serif); all UI in Public Sans; codes/IDs/eyebrows in IBM Plex Mono. Sentence case everywhere; UPPERCASE only mono eyebrows.
- **The engagement-circle spine:** Circle 1 Community Voice = clay, Circle 2 Internal = teal, Circle 3 Leadership = deep blue. Attribute every quote/metric to a circle.
- **Components:** `window.HEARTDesignSystem_d7d056` — Button, Badge, Tag, CircleBadge, KpiCard, Panel, Input, Select, Tabs. Load `_ds_bundle.js`.
- **Don'ts:** no emoji, no gradients (except the single slate authority banner), no bubbly radii, no decorative motion, no participant names. Keep scarlet for brand/primary action only; alerts use the distinct critical red.
