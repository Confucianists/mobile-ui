<template>
  <div>
    <transition name="fade">
      <div class="mask" v-if="visible" @click="close"></div>
    </transition>
    <transition name="slidY">
      <div class="mutliSelect" v-if="visible">
        <div class="flex m_top">
          <div class="cancle" @click="close">取消</div>
          <div class="flex-item title">请选择</div>
          <div class="sure" @click="sure">确定</div>
        </div>
        <div class="btn">
          <cube-button :inline="true" class="btnSmall" @click="totalSelect">全选</cube-button>
          <cube-button :inline="true" class="btnSmall" @click="emptyOptions">清空选项</cube-button>
        </div>
        <div class="m_body">
          <cube-checkbox-group v-model="checkList" :options="options" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'hw-multi-picker',
    props: {
      visible: {
        type: Boolean
      }
    },
    data() {
      return {
        checkList: [],
        options: []
      }
    },
    methods: {
      // 更新数据
      updata(d){
        this.checkList = d.checkList;
        this.options = d.options
      },
      // 关闭弹出层
      close() {
        this.$emit('update:visible', false);
      },
      // 清空选项
      emptyOptions() {
        this.checkList = [];
      },
      // 全选
      totalSelect() {
        this.emptyOptions()
        this.options.forEach(e => {
          this.checkList.push(e.value)
        })
      },
      // 确定按钮
      sure() {
        let r = {
          optionsArray: [],
          valueArray: this.checkList,
          optionsString: '',
          valueString: ''
        }
        this.checkList.forEach(v => {
          this.options.forEach(e => {
            if (v === e.value) {
              r.optionsArray.push(e);
              if (r.optionsString) {
                r.optionsString = r.optionsString + ',' + e.label;
              } else {
                r.optionsString = e.label;
              }
              if (r.valueString) {
                r.valueString = r.valueString + ',' + e.value;
              } else {
                r.valueString = e.value;
              }
            }
          })
        });
        this.$emit('sure', {
          data: r,
          type: true
        });
        this.close();
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.mutliSelect
  position fixed
  background #fff
  bottom 0
  width 100%
  z-index 1001
  // 头部
  .m_top
    line-height 60px
    position relative
    &:after
      setBottomLine(#ebebeb)
    .cancle, .sure
      padding 0 16px 0 16px
    .title
      text-align center
  // 按钮
  .btn
    padding-top 16px
    padding-left 16px
    .btnSmall
      border-radius 4px
  // 身体
  .m_body
    height 173px
    width 100%
    padding 16px
    overflow-y auto
</style>