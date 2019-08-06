<template>
  <div class="weui-cells">
    <div v-for="(item, index) in parent" :key="index" class="box">
      <a class="weui-cell weui-cell_access big" href="javascript:void(0);" @click="item.show = !item.show">
        <div class="weui-cell__bd">
          <p>{{item.name}}</p>
        </div>
        <div class="weui-cell__icon">
          <!--向下的箭头-->
          <i v-if="item.show" class="cubeic-select"></i>
          <i v-else class="cubeic-arrow"></i>
        </div>
      </a>
      <!--子分类-->
      <transition>
        <div class="classify" v-if="item.show">
          <div class="weui-cells">
            <a v-for="(itemC, indexC) in item.children" :key="indexC" class="weui-cell weui-cell_access" @click="clikLi(itemC)" href="javascript:void(0);">
              <div class="weui-cell__bd">
                <p>{{itemC.name}}</p>
              </div>
              <div class="weui-cell__icon">
                <i class="cubeic-arrow"></i>
              </div>
            </a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'hw-two-list',
    props: ['parent'],
    data() {
      return {
        flag: false
      }
    },
    methods: {
      clikLi(r) {
        this.$emit('skip', r)
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.weui-cells
  margin-top 0
  .big
    z-index 10
    background #ffffff
  .box
    border-bottom 1px solid #e5e5e5
  .classify
    margin-left 15px
    z-index 1
  .weui-cell__icon
    position: relative;
    text-align: right;
    color: #999;
</style>