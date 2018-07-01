---
sidebar: auto
---

## Getting Started

### Infinite mode

<foldable class="demo" height="%50" async>

<p align="center">
  <img src="https://vuejs.org/images/logo.png"/>
</p>

</foldable>

### Once mode

<foldable class="demo" height="%50" async once>

<p align="center">
  <img src="https://vuejs.org/images/logo.png"/>
</p>

</foldable>



## Props

### height

- Type: `string | number`
- Default: `100`

Set the value of initial visual height. percentage string is also support, e.g. `20%`, `50%` ——  When folded, the visible height will be proportional to the total height of the content.

::: tip
 Note that `view more` part will never be displayed when the height of the content doesn't reach the threshold.
:::

### minHeight

- Type: `number`
- Default: `100`

When you use percentage, the calculated height based on the dynamic elements may be very small, you can use this option to set a minimum height.

### once

- Type: `boolean`
- Default: `false`

By default, when you expand the content, you can also fold it again. You can make the expansion operation running only once via setting this option to `true`.

## Transition

By default, vue-foldable don't have any transition preset, you can add transition via CSS:

``` css
.vue-foldable-container {
  transition: max-height 0.3s
}

.view-more-mask {
  transition: opacity .3s;
}
```


## License

MIT &copy; ULIVZ
