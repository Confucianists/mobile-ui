<template>
  <div>
    <transition name="fade">
      <div class="mask" v-if="visible" @click="close" style="z-index: 1;"></div>
    </transition>
    <transition name="slideYDown">
      <div class="mutliSelect" v-if="visible">
         <hw-form :isEdit="false" ref="ocnform" @submit="submit"></hw-form>
         <hw-button-big title="搜索" class="button"  @click="submit(false)" />
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'hw-list-search',
    props: {
      visible: {
        type: Boolean
      }
    },
    methods: {
      // 关闭弹出层
      close() {
        this.$emit('update:visible', false);
      },
      __initform(form){
        this.$nextTick(() => {
          this.$refs.ocnform.init(form)
        })
      },
      submit(r){
        if (!r) {
          this.$refs.ocnform.validate();
        } else {
          this.$emit('search', r)
          this.close()
        }
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
  top 40px
  width 100%
  z-index 2
  .button
    margin-bottom 15px
</style>