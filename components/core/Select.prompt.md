Styled native select for dashboard filters and forms.

```jsx
<Select label="Engagement circle" value={c} onChange={e=>setC(e.target.value)}
  options={[{value:'all',label:'All circles'},{value:'1',label:'Community Voice'}]} />
```

Options may be strings or `{value,label}` objects.
