---
sidebar: auto
---

## Getting Started

### Install

``` bash
yarn add vue-foldable -S
# or
npm install vue-foldable -S
```

### Usage

``` js
import VueFoldable from 'vue-foldable'
Vue.component('foldable', VueFoldable)
```

``` vue
<foldable>
  <!-- Your content -->
</foldable>
```

## Showcase

### Infinite mode

<foldable class="infinite-demo" height="100">
  <vue-intro/>
</foldable>

### Transition

<foldable class="transition-demo" height="100">
  <vue-intro/>
</foldable>

<style>
  .transition-demo .vue-foldable-container {
    transition: max-height 0.3s
  }
  
  .transition-demo .view-more-mask {
    transition: opacity .3s;
  }
</style> 

### Once mode

<foldable class="once-demo" height="%50" once>
  <vue-intro/>
</foldable>

### Asynchronous content

<foldable class="async-demo" height="%50" async>

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

### async

- Type: `boolean`
- Default: `false`

`vue-foldable` will try to inspect whether the content's height meet the threshold for the display of `view more` at `mounted` hook, but sometimes, if content contains [replaced element](https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element), e.g. `<img>`, the height of content will be possible to change. 

In this case, you can set `async` to `true` and `vue-foldable` will watch the content height change and re-initialize when the height changes. 

## Transition

By default, vue-foldable don't have any transition preset, you can customize transition via CSS:

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
