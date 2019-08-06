<template>
  <!--transition标签 按钮出现附带动画-->
  <transition name="el-fade-in">
    <div class="backtop" @click="scrollToTop" v-show="toTopShow">
      <i class="iconfont icon-zhiding"></i>
    </div>
  </transition>
</template>

<script>
  export default {
      name: 'hw-scroll-top',
    data() {
      return {
        toTopShow: false,
      }
    },
    methods: {
      handleScroll() {
          
        //id scroll-cont是自己在组件上添加的，为了方便获取dom
         this.scrollTop = document.getElementsByClassName("cube-scroll-wrapper")[0].scrollTop
        if (this.scrollTop > 100) {
          this.toTopShow = true;
        }else {
          this.toTopShow = false;
        }
      },
      scrollToTop() {
        let timer = null, _that = this
        //动画，使用requestAnimationFrame代替setInterval
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn() {
          if (_that.scrollTop > 0) {
            _that.scrollTop -= 100;
            document.getElementsByClassName("cube-scroll-wrapper")[0].scrollTop = _that.scrollTop
            timer = requestAnimationFrame(fn);
          } else {
            cancelAnimationFrame(timer);
            _that.toTopShow = false;
          }
        })
      }
    },
    mounted() {
　　　　//$nextTick 避免dom未加载
      this.$nextTick(function () {
        let targetScroll = document.getElementsByClassName("cube-scroll-wrapper")[0];
        targetScroll.addEventListener('scroll', this.handleScroll);
      });
    },
    destroyed() {
      let targetScroll = document.getElementsByClassName("cube-scroll-wrapper")[0]
      targetScroll.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .backtop{
    background:rgba(15,14,13,1);
    opacity:0.64;
    position: fixed;
    right vw(27)
    bottom vw(133)
    height vw(56)
    width vw(56)
    transition: .3s;
    z-index: 1;
    border-radius:vw(10);
    text-align center
    i{
      color: #fff;
      line-height vw(56)
    }
    p{
      display: none;
      text-align: center;
      color: #fff;
    }
    &:hover{
      opacity: .8;
    }
  }



</style>