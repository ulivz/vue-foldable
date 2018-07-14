<template>
  <VueFoldable class="weibo-foldable" height="%50" async>
    <!-- default slot -->
    <slot></slot>

    <!-- named slot -->
    <template slot="view-more" slot-scope="{ toggle, collapsed }">
      <div @click="toggle"
           class="weibo-view-more"
           :class="{ 'collapsed': collapsed }">
        {{ collapsed ? '关注作者，查看全文' : '取消关注' }}
        <svg class="icon-weibo-down" viewBox="0 0 1048 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M565.514 752.186c0.393-0.394 0.491-0.935 0.861-1.326l431.062-392.233c23.201-23.692 23.471-61.882 0.566-85.254-22.906-23.374-60.284-23.126-83.511 0.589l-390.168 355.025-390.933-355.739c-23.224-23.691-60.826-23.716-84.025-0.049-23.174 23.692-23.151 62.079 0.049 85.795l432.096 393.168c23.199 23.692 60.827 23.714 84.001 0.024z"
            fill="#FF7D00"></path>
        </svg>
      </div>
    </template>
  </VueFoldable>
</template>

<script>
  import VueFoldable from 'vue-foldable/src'
  export default {
    name: 'weibo-foldable',
    components: { VueFoldable }
  }
</script>

<style lang="stylus">
  .vue-foldable.weibo-foldable /* greater priority */
  {
    .vue-foldable-container {
      transition: max-height 0.3s;
    }

    .vue-foldable-mask {
      transition: opacity 3s;
      bottom: 32px;
    }

    .weibo-view-more {
      width: 170px;
      margin: 10px auto;
      background-color: #fff;
      transition: background-color .1s ease-in-out;
      color: #FF7D00;
      border-color: #FF7D00;
      border-width: 1px;
      border-style: solid;
      border-radius 17px;
      padding: 0 20px;
      font-size: 14px;
      text-align: center;
      height: 30px;
      line-height: 30px;
      min-width: 72px;
      cursor: pointer;
      .icon-weibo-down {
        width: 15px;
        vertical-align: middle;
        display: none;
      }
      &.collapsed {
        .icon-weibo-down {
          display: inline-block;
        }
      }
      &:hover {
        background-color: #fde3e4;
      }
    }
  }
</style>
