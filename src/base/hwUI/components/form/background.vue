<template>
  <div class="background"></div>
</template>

<script>
  export default {
    name: 'hw-background'
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.background
  background-color $color-background
  height: 100%
  position: fixed
  width: 100%
  top 0
  left 0
  z-index -1
</style>
