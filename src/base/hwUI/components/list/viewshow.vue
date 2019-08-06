<template>
  <div class="viewshow">
    <div class="flex">
      <div class="title">
        <slot name="t1"></slot>
      </div>
      <div class="tip">
        <slot name="t2"></slot>
      </div>
    </div>
    <div class="flex litop">
      <div class="flex-item lili" style="margin-right: 5px;">
        <slot name="t3"></slot>
      </div>
      <div class="flex-item lili">
        <slot name="t4"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hw-view-show',
    data() {
      return {
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.viewshow
  // border 1px solid #000
  width 200px
  overflow hidden
  .title
    font-size 13px
    overDots()
    span
      font-weight bold
  .tip
    font-size 12px
    color #cccccc
    margin-left 5px
    overDots()
  .litop
    margin-top 10px
    .lili
      font-size 12px
      overDots()
</style>