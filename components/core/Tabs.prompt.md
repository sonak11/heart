Underline tab navigation. Use for switching dashboard views or content sections.

```jsx
<Tabs value={tab} onChange={setTab}
  tabs={[{value:'overview',label:'Overview'},{value:'themes',label:'Themes',count:7}]} />
```

Tabs may be plain strings or `{value,label,count}` objects.
