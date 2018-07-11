<template>
  <foldable class="my-foldable" height="%50" async>
    <!-- default slot -->
    <slot></slot>

    <!-- named slot -->
    <p align="center" class="my-foldable"
       slot="view-more" slot-scope="{ toggle, collapsed }" @click="toggle">
      {{ collapsed ? 'See more' : 'Fold it!' }}
    </p>
  </foldable>
</template>

<style lang="stylus">
  .vue-foldable {
    &.my { /* override */
      .vue-foldable-mask {
        /* tweak the mask's postion according to your view more's height */
        bottom: 36px
      }
    }
  }
</style>
