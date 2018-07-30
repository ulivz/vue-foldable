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
import 'vue-foldable/dist/vue-foldable.css'

Vue.component('foldable', VueFoldable)
```

``` vue
<foldable>
  <!-- Your content -->
</foldable>
```


## Showcase

### Infinite mode

<br>
<details>
<summary><b>Source</b></summary>

``` vue
<foldable class="infinite-demo" height="100">
  <vue-intro/>
</foldable>
```

</details>
<br>

<foldable class="infinite-demo" height="100">
  <vue-intro/>
</foldable>

### Transition

<br>
<details>
<summary><b>Source</b></summary>

``` vue
<foldable class="transition-demo" height="100">
  <vue-intro/>
</foldable>
```
<br>

</details>

<foldable class="transition-demo" height="100">
  <vue-intro/>
</foldable>


### Once mode

<br>
<details>
<summary><b>Source</b></summary>

``` vue
<foldable class="once-demo" height="%50" once>
  <vue-intro/>
</foldable>
```

</details>
<br>

<foldable class="once-demo" height="%50" once>
  <vue-intro/>
</foldable>

### Asynchronous content

<br>
<details>
<summary><b>Source</b></summary>

``` vue
<foldable class="async-demo transition-demo" height="%50" async>
  <p align="center">
    <img src="https://vuejs.org/images/logo.png"/>
  </p>
</foldable>
```

</details>
<br>

<foldable class="async-demo transition-demo" height="%50" async>
  <p align="center">
    <img src="https://vuejs.org/images/logo.png"/>
  </p>
</foldable>


## Custom UI

`vue-foldable` provides some `slots` and gives you the ability to customize the UI. Before that, you need to know the following knowledge:

- [Vue > Named Slots](https://vuejs.org/v2/guide/components-slots.html#Named-Slots)
- [Vue > Default Slot Content](https://vuejs.org/v2/guide/components-slots.html#Default-Slot-Content)
- [Vue > Scoped Slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots)

A simple wrapper component would be like this:

<<< @/docs/.vuepress/components/my-foldable.vue

<my-foldable>
  <p align="center">
    <img src="https://vuejs.org/images/logo.png"/>
  </p>
</my-foldable>


## Components

Here are some official custom components:

- [@vue-foldable/weibo](https://github.com/ulivz/vue-foldable/tree/master/packages/vue-foldable-weibo)
- [@vue-foldable/csdn](https://github.com/ulivz/vue-foldable/tree/master/packages/vue-foldable-csdn)
- [@vue-foldable/baidu](https://github.com/ulivz/vue-foldable/tree/master/packages/vue-foldable-baidu)

For a complete list of components, please step to [packages](https://github.com/ulivz/vue-foldable/tree/master/packages).

- Install: 

``` bash
npm install @vue-foldable/${name} -S
```

- Usage:

``` js
import comp from '@vue-foldable/${name}'
import '@vue-foldable/${name}/dist/${name}.css'

Vue.component('${name}-foldable', comp)
```

::: tip
  Replace `${name}` with your expected target component sub name.
:::

### @vue-foldable/weibo

<weibo-foldable>
  <p align="center">
    <img src="https://vuejs.org/images/logo.png"/>
  </p>
</weibo-foldable>

### @vue-foldable/csdn

<csdn-foldable>
  <p align="center">
    <img src="https://vuejs.org/images/logo.png"/>
  </p>
</csdn-foldable>

### @vue-foldable/baidu

<baidu-foldable>
  <p align="center">
    <img src="https://vuejs.org/images/logo.png"/>
  </p>
</baidu-foldable>

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
  transition: max-height 0.3s;
}

.vue-foldable-mask {
  transition: opacity 3s;
}
```

## noMask

- Type: `boolean`
- Default: `false`

whether to display the transparency gradient mask, defaults to.

<foldable no-mask>
  <vue-intro/>
</foldable>


## License

MIT &copy; ULIVZ
