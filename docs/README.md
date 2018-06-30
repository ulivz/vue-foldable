---
sidebar: auto
---

## Getting Started

- Input:

```
<foldable initial-height="%20">

<<< @/src/vue-foldable.js

</foldable>
```

- Output:

<foldable height="%20">

<<< @/src/vue-foldable.js

</foldable>


## Props

### height

- Type: `string | number`
- Default: `100`

Set the value of initial visual height. percentage string is also support, e.g. `20%`, `50%` ——  When folded, the visible height will be proportional to the total height of the content.

::: tip
 Note that `view more` part will never be displayed when the height of the content does not reach the threshold.
:::

### minHeight

- Type: `number`
- Default: `100`

When you use percentages, the calculated height based on the dynamic elements may be very small, you can use this option to set a minimum height.

## License

MIT &copy; ULIVZ
