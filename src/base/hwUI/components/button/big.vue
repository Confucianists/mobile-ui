<template>
  <div class="btn" @click="click">
    <a href="javascript:void(0);" class="weui-btn">{{title}}</a>
  </div>
</template>

<script>
  export default {
    name: 'hw-button-big',
    data() {
      return {}
    },
    props: {
      // 按钮标题
      title: {
        type: String,
        default: ''
      }
    },
    methods:{
      click(){
        this.$emit('click')
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.btn
  margin 15px 15px 30px 15px
  .weui-btn
    background $color-main-btn
</style>
