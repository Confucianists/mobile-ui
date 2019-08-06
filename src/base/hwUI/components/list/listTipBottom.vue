<template>
  <div>
    <div class="tipbottom flex">
      <div class="flex-item">
        <img src="../../common/images/smIcon/1.png" alt="">
        <div>超时</div>
      </div>
      <div class="flex-item">
        <img src="../../common/images/smIcon/2.png" alt="">
        <div>预警</div>
      </div>
      <div class="flex-item">
        <img src="../../common/images/smIcon/3.png" alt="">
        <div>正常</div>
      </div>
      <!-- <div class="flex-item">
        <img src="../../common/images/smIcon/flag_red.png" alt="">
        <div>督办</div>
      </div> -->
    </div>
    <div style="height: 40px;"></div>
  </div>
</template>
<script>
  export default {
    name: "hw-list-tip-bottom",
    props: {
      data: {}
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.tipbottom
  height 40px
  position fixed
  z-index 888
  bottom 0
  width 100%
  background #ffffff
  &:before
    setTopLine(#ccc)
  .flex-item
    text-align center
    img
      height 20px
      width 20px
      margin-top 3px
    div
      font-size 12px
</style>
