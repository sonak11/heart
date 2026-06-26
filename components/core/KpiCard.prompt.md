Headline metric card — big Newsreader-serif number with a mono eyebrow and optional trend. The signature data primitive of HEART dashboards.

```jsx
<KpiCard label="Interviews coded" value="247" trend="up" trendValue="+18" caption="across 3 circles" />
<KpiCard label="Voice–Authority gap" value="31" unit="%" accent="var(--critical-600)" trend="down" trendValue="-4 pts" />
```

`trend`: up/down/flat sets color + glyph. `accent` recolors the number (use circle/semantic tokens).
