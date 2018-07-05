<template>
  <foldable class="csdn-foldable" height="%50" async>

    <slot></slot>

    <!-- named slot -->
    <template slot="view-more" slot-scope="{ toggle, collapsed }">
      <div @click="toggle"
           class="csdn-view-more"
           :class="{ 'collapsed': collapsed }">
        {{ collapsed ? '查看全文' : '收起' }}
      </div>
    </template>
  </foldable>
</template>

<style lang="stylus">
  .csdn-foldable {
    .csdn-view-more {
      margin: 10px auto;
      width: 121px;
      background-color: #fff;
      transition: background-color .1s ease-in-out;
      color: #ca0c16;
      border-color: #ca0c16;
      border-width: 1px;
      border-style: solid;
      padding: 0 8px;
      font-size: 14px;
      border-radius: 4px;
      text-align: center;
      height: 34px;
      line-height: 32px;
      min-width: 72px;
      cursor: pointer;
      &:hover {
        background-color: #fde3e4;
      }
    }
  }
</style>
