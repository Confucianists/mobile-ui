<template>
  <div>
    <div class="tab flex">
      <div :class="tabIndex === 0? 'flex-item checked': 'flex-item'" @click="switchTab(0)" ref="tab0"><i class="cubeic-edit"></i></div>
      <div :class="tabIndex === 1? 'flex-item checked': 'flex-item'" @click="switchTab(1)" ref="tab1"><i class="cubeic-eye-visible"></i></div>
      <div :class="tabIndex === 2? 'flex-item checked': 'flex-item'" @click="switchTab(2)" ref="tab2"><i class="cubeic-person"></i></div>
      <!-- <div :class="tabIndex === 3? 'flex-item checked': 'flex-item'" @click="switchTab(3)" ref="tab3">人物<span></span></div> -->
      <!-- <div :class="tabIndex === 4? 'flex-item checked': 'flex-item'" @click="switchTab(4)" ref="tab4">设定<span></span></div> -->
      <!-- <div :class="tabIndex === 5? 'flex-item checked': 'flex-item'" @click="switchTab(5)" ref="tab5">科四</div> -->
      <span class="line" ref="tabLine"></span>
    </div>
  </div>
</template>

<script>
  import animations from 'create-keyframe-animation'
  export default {
    name: 'hw-navbar',
    props: {
      tabIndex: Number
    },
    data() {
      return {
        lineLeft: 0,
        lineLeft0: 0,
        lineLeft1: 0,
        lineLeft2: 0,
        lineLeft3: 0,
        // lineLeft4: 0,
        // lineLeft5: 0,
        nextLeft: 0
      }
    },
    methods: {
      // 初始化tab数据
      _initTabData() {
        let lineWidth = this.$refs.tabLine.offsetWidth
        let tabWidth0 = this.$refs.tab0.offsetWidth
        let tabWidth1 = this.$refs.tab1.offsetWidth
        let tabWidth2 = this.$refs.tab2.offsetWidth
        // let tabWidth3 = this.$refs.tab3.offsetWidth
        // let tabWidth4 = this.$refs.tab4.offsetWidth
        // let tabWidth5 = this.$refs.tab5.offsetWidth
        this.lineLeft0 = (+tabWidth0 - lineWidth) / 2
        this.lineLeft1 = (+tabWidth1 - lineWidth) / 2 + tabWidth0
        this.lineLeft2 = (+tabWidth2 - lineWidth) / 2 + tabWidth0 + tabWidth1
        // this.lineLeft3 = (+tabWidth3 - lineWidth) / 2 + tabWidth0 + tabWidth1 + tabWidth2
        // this.lineLeft4 = (+tabWidth4 - lineWidth) / 2 + tabWidth0 + tabWidth1 + tabWidth2 + tabWidth3
        // this.lineLeft5 = (+  tabWidth5 - lineWidth) / 2 + tabWidth0 + tabWidth1 + tabWidth2 + tabWidth3 + tabWidth4
        this.lineLeft = (+tabWidth0) / 2
      },
      // 切换tab
      switchTab(i, flag) {
        this.lineLeft = this.nextLeft
        this.nextLeft = this['lineLeft' + i]
        console.log(this.nextLeft)
        let animation = {
          0: {
            left: this.lineLeft + 'px'
          },
          100: {
            left: this.nextLeft + 'px'
          }
        }
        animations.registerAnimation({
          name: 'move' + i,
          animation,
          presets: {
            duration: 300,
            easing: 'ease'
          }
        })
        if (!flag) {
          this.$emit('checked', i)
        }
        if (i != this.tabIndex) {
          this.$emit('update:tabIndex', i)
        }

        animations.runAnimation(this.$refs.tabLine, 'move' + i, () => {
          if (i != this.tabIndex) {
            this.$emit('update:tabIndex', i)
          }
        })
      }
    },
    mounted() {
      this.$nextTick(function() {
        this._initTabData()
        console.log(this.tabIndex)
        this.switchTab(this.tabIndex)
      })
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '~@/common/stylus/mixin'
.tab
  height 50px;
  line-height 50px;
  font-size 30px
  color $color-hui
  position relative
  background #ffffff
  &:after
    setBottomLine($color-bg-hui)
  .Selected
    width cp(190)
  .toBeSolved
    width cp(170)
  .checked
    color $color-blue
    position relative
    span
      height cp(4)
      background $color-blue
      border-radius cp(2)
      display block
      width cp(82)
      margin 0 auto
      position relative
      bottom cp(4)
  .line
    // display none
    position absolute
    width 80px
    height 4px
    background $color-blue
    border-radius cp(2)
    bottom 0
    left 0 
</style>
