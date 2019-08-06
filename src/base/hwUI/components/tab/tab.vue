<template>
  <!-- <div> -->
    <div class="tab aboveLine" ref="tab">
      <router-link v-for="(item, index) in tabBar.list" :key="index" tag="div" class="tab-item" :to="item.pagePath" replace>
        <div class="icon">
          <i class="iconfont" :class="$route.path == item.pagePath? item.iconName+' cur' :item.iconName "></i>
          <span v-if="index==2&&count>0" class="count">{{count}}</span>
        </div>
        <span class="tab-link" :style="'color:'+tabBar.color+';'">{{item.text}}</span>
      </router-link>
    </div>
    <!-- <div class="h"></div> -->
  <!-- </div> -->
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'hw-tab',
    props: {
      tabBar: {
        type: Object
      },
      count:{
        type:[String,Number],
        default:0
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.tab
  background #fff
  display: flex
  height: vw(100)
  position fixed
  left 0
  top 0
  width 100%
  margin-top calc(100vh - 13.6vw)//解决position fixed与transition冲突，fixed 为 0 0
  z-index 2
  border-top vw(2) solid #eeeeee
  .tab-item
    flex: 1
    text-align: center
    .icon
      margin 0 auto
      margin-top vw(18)
      margin-bottom vw(8)
      position relative
      .count
        display block
        position absolute
        top vw(-12)
        right vw(40)
        font-size:vw(17)
        font-weight:500;
        color:rgba(244,75,75,1);
        border:vw(2) solid rgba(244,75,75,1);
        background:rgba(255,255,255,1);
        border-radius:vw(100)
        width:vw(38)
        height:vw(26)
        line-height:vw(28)
        text-align center
      i
        font-size vw(36)
        &.cur
          color #fff
          background:linear-gradient(24deg,rgba(255,97,97,1),rgba(244,75,75,1));
          border-radius 50%
          padding vw(10);
    .tab-link
      font-size vw(20)
      font-weight:500;
.h
  height vw(100)
</style>