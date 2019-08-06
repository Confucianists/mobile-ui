<template>
  <div class="ipport">
    <transition name="fade">
      <div class="mask" v-if="visible" @click="close" style="z-index: 100;"></div>
    </transition>
    <transition name="slideSmllYStart">
      <div class="mutliSelect" v-if="visible">
        <div class="title">提交</div>
        <div class="weui-cells weui-cells_form">
          <!--填写意见-->
          <div class="weui-cell" v-if="opinions">
            <div class="weui-cell__bd">
              <textarea class="weui-textarea" placeholder="请输入意见" rows="3" v-model="opinion"></textarea>
              <div class="weui-textarea-counter"><span>{{opinion.length}}</span></div>
            </div>
          </div>
          <!--文件上传组件-->
          <hw-file  v-show="files" title="文件上传" ref="ocnFile"></hw-file>
          <!--下一步执行人-->
          <a class="weui-cell weui-cell_access" href="javascript:void(0);" @click="showPicker">
            <div class="weui-cell__bd">
              <p>下一步执行人</p>
            </div>
            <div class="weui-cell__bd">
              <input v-model="name" disabled="disabled" placeholder="请选择" class="weui-input">
            </div>
            <div class="weui-cell__ft"></div>
          </a>
        </div>
        <div class="two-button flex">
          <div class="flex-item left" @click="close">取消</div>
          <div class="flex-item" @click="sure">确定</div>
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
    name: 'hw-form-process',
    props: {
      visible: {
        type: Boolean
      },
      opinions: {
        type: Boolean,
        default: false
      },
      files: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 意见
        opinion: '',
        picker2Data: null,
        name: ''
      }
    },
    methods: {
      showPicker() {
        this.picker.show()
      },
      // 初始化
      __init(data) {
        this.picker = this.$createPicker({
          title: '选择部门',
          data: [data],
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            this.$emit('choose', data[selectedIndex])
          },
          onCancel: () => {}
        })
      },
      // 初始化
      __init_picker(data) {
        this.picker2 = this.$createPicker({
          title: '选择人员',
          data: [data],
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            this.picker2Data = data[selectedIndex]
            this.name = selectedText[0]
          },
          onCancel: () => {
            if (this.name == '') {
              return false
            }
          }
        })
        this.picker2.show()
      },
      // 确定提交
      sure() {
        this.$refs.ocnFile.getfiles()
          .then(files => {
            console.log(files.length + 'sd')
            this.$emit('sure', {
              data: this.picker2Data,
              files: files,
              opinion: this.opinion
            })
          })
      },
      // 关闭弹出层
      close() {
        this.$emit('update:visible', false);
        this.name = ''
        this.opinion = ''
      }
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
    z-index 100
    left 5%
    radius()
    .weui-cells
      margin 0
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
</style>