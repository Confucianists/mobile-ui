<template>
  <div class="list">
    <ul class="list-wrapper" v-if="data.length > 0">
      <li v-for="(item, index) in data" :class="border ? 'list-item flex li2': 'list-item flex li1'" :key="index" @click="clickli(item)">
        <div class="icon"><img :src="isOutTime(item.isTimeOut, item.nodeLimitTime)"></div>
        <div class="flex-item">{{item.eventTitle}}</div>
        <div class="tip is-grey">
          <div>{{item.sponsorName}}</div>
          <div>{{item.reportTime}}</div>
        </div>
      </li>
    </ul>
    <!-- <div v-else class="nodata">暂无数据</div> -->
    <hw-no-data v-else />
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'hw-list-wrapper',
    props:['data', 'border'],
    methods:{
      // 判断事件有没有超时
      isOutTime(isTimeOut, nodeLimitTime) {
        if (isTimeOut == '1') {
          // 超时
          return require('../../common/images/smIcon/1.png')
        } else if (+nodeLimitTime >= 24) {
          // 正常
          return require('../../common/images/smIcon/3.png')
        } else {
          return require('../../common/images/smIcon/2.png')
        }
      },
      // 点击事件
      clickli(item){
        this.$emit('clickli', item)
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.list-wrapper
  overflow: hidden
  li
    // margin-top: 10px
    text-align: left
    background-color: white
    font-size: 14px
    color: #000
    white-space: normal
    padding 15px
    position relative
    .is-black
      color: black
    .is-grey
      color: #999
    .is-bold
      font-weight: bold
    .icon
      width 15px
      margin-right 15px
      img
        width 100%
    .tip
      margin-left 15px
  .li1
    &:after
      setTopLine(#ccc)
  .li2
    &:after
      setBottomLine(#ccc)
.nodata
  text-align center
  margin-top 30px
</style>