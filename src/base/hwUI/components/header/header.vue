<template>
  <div>
    <div class="header flex" :style="'background:' + backgroundColor + ';color:'+textColor+';'">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="title2" v-if="center">{{title}}</div>
      <div class="title" v-else>{{title}}</div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="h"></div>
  </div>
</template>

<script>
  export default {
    name: "hw-header",
    props: {
      title: {
        type: String
      },
      center:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        backgroundColor: this.$store.state.config.window.backgroundColor,
        textColor: this.$store.state.config.window.textColor
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.header
  height 40px
  position fixed
  width 100%
  line-height 40px
  text-align left
  background #ffffff
  z-index 100
  .title
    padding-left 15px
  .title2
    width 200px
    text-align center
    position absolute
    left 50%
    margin-left -100px
    overDots()
  .left
    justify-content: space-between;
  .right
    position absolute
    right 20px
.h
  height 40px
</style>
