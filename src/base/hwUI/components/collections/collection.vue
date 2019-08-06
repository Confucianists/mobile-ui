<template>
  <div class="work-wrapper">
    <div class="theme" v-for="(item, index) in data" :key="index">
      <div class="main-title">{{item.title}}</div>
      <div class="grids weui-grids">
        <div class="weui-grid grid" 
          v-for="(GItem, GIndex) in item.content" 
          :key="GIndex" 
          @click="skip(GItem)">
          <div class="weui-grid__icon">
            <img :src="GItem.img">
          </div>
          <p class="weui-grid__label">{{GItem.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "hw-collection",
    props: {
      data: {
        type: Array
      }
    },
    methods:{
      skip(GItem){
        if(GItem.callback){
          GItem.callback()
        }else{
          this.$router.push(GItem.url)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.work-wrapper
  margin-top 15px
  text-align left
  overflow hidden
  .theme
    background-color #ffffff
    margin-bottom 15px
    .main-title
      padding-left 15px
      line-height 30px
</style>
