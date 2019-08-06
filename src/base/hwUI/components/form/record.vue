<template>
  <div>
    <transition name="fade">
      <div class="mask" v-if="visible"></div>
    </transition>
    <transition name="slidY">
      <div class="recode" v-if="visible">
        <div class="flex" v-if="!state">
          <div class="flex-item">
            <div class="start" @click="start">开始录音</div>
          </div>
          <div class="flex-item">
            <div class="start" @click="close">取消录音</div>
          </div>
        </div>
        <div class="flex" v-else>
          <div class="flex-item">
            <div class="start" @click="end(true)">结束录音</div>
          </div>
          <div class="flex-item">
            <div class="start" @click="end(false)">取消录音</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'hw-file-record',
    props: {
      visible: {
        type: Boolean
      }
    },
    data() {
      return {
        state: false
      }
    },
    methods: {
      // 关闭组件
      close() {
        this.$emit('update:visible', false)
      },
      // 开始录音
      start() {
        this.state = true
        api.showProgress({
          title: '录音中...',
          modal: false
        })
        const timestamp = (new Date()).valueOf()
        api.startRecord({
          path: 'fs://' + timestamp + '.amr'
        })
      },
      // 结束录音
      end(bol) {
        var vm = this
        api.stopRecord(function(ret, err) {
          if (ret) {
            api.hideProgress();
            if (bol) {
              vm.$emit('getrecoed', ret.path)
            }
            vm.state = false
            vm.close()
          }
        });
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.recode
  position fixed
  background #fff
  bottom 0
  width 100%
  z-index 1001
  height 100px
  .start
    width 80px !important
    height 80px
    margin 10px auto
    line-height 80px
    background $color-main-btn
    border-radius 50%
    text-align center
    color #ffffff
    font-size 14px
    box-shadow 2px 2px 5px #333333
</style>