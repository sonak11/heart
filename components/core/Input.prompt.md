Labeled text input with helper/error states and a scarlet focus ring.

```jsx
<Input label="Search quotes" iconLeft={<SearchIcon/>} placeholder="e.g. transportation" value={q} onChange={e=>setQ(e.target.value)} />
<Input label="Email" error="Required" />
```

Pass `error` to switch to the critical state. `iconLeft` for a leading glyph.
