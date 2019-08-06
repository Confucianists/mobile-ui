<template>
  <div class="weui-loadmore weui-loadmore_line">
    <span class="weui-loadmore__tips">暂无数据</span>
  </div>
</template>

<script>
  export default {
    name: 'hw-no-data'
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.weui-loadmore_line .weui-loadmore__tips
  background $color-background
</style>