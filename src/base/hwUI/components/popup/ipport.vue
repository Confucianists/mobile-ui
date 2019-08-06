<template>
  <div class="ipport">
    <transition name="fade">
      <div class="mask" v-if="visible" @click="close" style="z-index: 2;"></div>
    </transition>
    <transition name="slideSmllYStart">
      <div class="mutliSelect" v-if="visible"  style="z-index: 3;">
        <div class="title">
          接口设置
          <div class="seting" style="position: absolute;right:15px;top:0;color: #999;"  @click="choose"><i class="cubeic-setting"></i></div>
        </div>
        <cube-input class="ipInput" v-model="ip" placeholder="请输入ip">
        </cube-input>
        <cube-input class="ipInput" v-model="port" type="number" placeholder="请输入端口号">
        </cube-input>
        <div class="two-button flex"> 
          <div class="flex-item left" @click="close">取消</div>
          <div class="flex-item" @click="setService">确定</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {
    mapActions
  } from 'vuex'
  export default {
    name: 'hw-ip-port',
    props: {
      visible: {
        type: Boolean
      }
    },
    data() {
      return {
        ip: this.$store.state.interport.ip,
        port: this.$store.state.interport.port,
        host: this.$store.state.interport.host,
        picker: null
      }
    },
    methods: {
      // 初始化
      __init() {
        this.ip = this.$store.state.interport.ip;
        this.port = this.$store.state.interport.port;
        this.host = this.$store.state.interport.host;
      },
      // 更新接口信息
      setService: function() {
        // 配置信息
        if (this.ip && this.port) {
          let cacheipArr = []
          if (window.localStorage.getItem('cacheip')) {
            cacheipArr = JSON.parse(window.localStorage.getItem('cacheip'))
          }
          let host = 'http://' + this.ip + ':' + this.port + '/';
          let arrport = {
            ip: this.ip,
            port: this.port,
            host: host
          }
          let flagcache = true
          cacheipArr.forEach(element => {
            if (element.ip == arrport.ip) {
              flagcache = false
              element.port = arrport.port
              element.host = arrport.host
            }
          });
          if (flagcache) {
            cacheipArr.push(arrport)
          }
          window.localStorage.setItem('cacheip', JSON.stringify(cacheipArr))
          this.saveInterport(arrport);
          this.close()
        } else {
          window.api && api.toast({
            msg: '请完善信息',
            duration: 2000,
            location: 'bottom'
          });
        }
      },
      choose() {
        // window.localStorage.removeItem('cacheip')
        // alert(JSON.stringify(window.localStorage.getItem('cacheip')))
        this.picker && this.picker.hide()
        let cacheipArr = []
        if (window.localStorage.getItem('cacheip')) {
          cacheipArr = JSON.parse(window.localStorage.getItem('cacheip'))
        }
        cacheipArr.forEach(e => {
          e.text = e.ip
          e.value = e.ip
        })
        if (cacheipArr.length > 0) {
          this.picker = this.$createPicker({
            title: '选择接口',
            data: [cacheipArr],
            onSelect: (selectedVal, selectedIndex, selectedText) => {
              this.ip = cacheipArr[selectedIndex].ip
              this.port = cacheipArr[selectedIndex].port
              this.host = cacheipArr[selectedIndex].host
            },
            onCancel: () => {
              
            }
          }).show()
        }
      },
      // 关闭弹出层
      close() {
        this.picker && this.picker.hide()
        this.$emit('update:visible', false);
      },
      ...mapActions({
        saveInterport: 'SAVE_INTERPORT'
      })
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.ipport
  position absolute
  top 0
  width 100%
  .mutliSelect
    position fixed
    background #fff
    top 100px
    width 90%
    z-index 1001
    height 216px
    left 5%
    radius()
    .title
      // border 1px solid #000000
      line-height 45px
      position relative
      text-align center
      &:after
        setBottomLine(#ccc)
    .ipInput
      margin 15px
      // border 1px solid #cccccc
      radius()
    .two-button
      line-height 45px
      position relative
      text-align center
      &:before
        setTopLine(#ccc)
      .left
        position relative
        &:after
          setRightLine(#ccc)
  .seting
    extend-click()
</style>