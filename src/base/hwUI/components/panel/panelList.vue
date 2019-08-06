<template>
  <div class="weui-panel">
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_small-appmsg">
        <div class="weui-cells">
          <div v-for="(item, index) in items" :key="index" class="weui-cell weui-cell_access" @click="clickItem(item)">
            <div class="weui-cell__hd">
              <img :src="item.img" style="width:20px;margin-right:5px;display:block">
            </div>
            <div class="weui-cell__bd weui-cell_primary">
              <p>{{item.title}}</p>
            </div>
            <!-- <span class="weui-cell__ft"></span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hw-panel-list',
    props: ['items'],
    methods: {
      clickItem(item) {
        var that = this;
        if (item.callback) {
          item.callback()
        } else {
          this.$router.push(item.url);
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.weui-panel
  .weui-cells
    font-size 12px
    .weui-cell:before
      right 15px
</style>
