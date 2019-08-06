<template>
  <div class="btn-primary">
    <a href="javascript:;" :class="className" @click="btnClick" :style="'background:'+bgColor+';'">
      <i class="weui-loading" v-if="btnState === 3"></i>
      <i class="weui-icon-success" v-if="btnState === 4"></i> {{title}}
    </a>
    <!-- <a href="javascript:;" class="weui-btn  ">页面主操作 Disabled</a> -->
  </div>
</template>

<script>
  export default {
    name: 'hw-button',
    data() {
      return {}
    },
    props: {
      // 按钮标题
      title: {
        type: String,
        default: ''
      },
      // 按钮状态 1 是primary 2 是disabled 3是loading 4是success
      btnState: {
        type: Number,
        default: 1
      },
      // 选中的背景色 btnPrimaryColor 是选中的颜色，btnDisabledColor 是disabled颜色，btnLoadingColor 是loading颜色
      btnColor: {
        type: Object,
        default: null
      }
    },
    computed: {
      // 计算按钮属性
      className() {
        let className = 'weui-btn weui-btn_primary ';
        if (this.btnState === 3) {
          className = className + 'weui-btn_loading ';
        }
        if (this.btnState === 2) {
          className = className + 'weui-btn_disabled ';
        }
        return className;
      },
      // 计算背景色
      bgColor() {
        let color = this.btnColor.btnPrimaryColor;
        if (this.btnState === 3) {
          color = this.btnColor.btnLoadingColor;
        }
        if (this.btnState === 2) {
          color = this.btnColor.btnDisabledColor;
        }
        return color;
      }
    },
    methods: {
      // 推送点击事件
      btnClick() {
        (this.btnState === 1) && this.$emit('onClick');
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
</style>
