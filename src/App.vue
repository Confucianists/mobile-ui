<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex'
  import '../static/js/api.js'
  export default {
    name: 'app',
    data(){
      return{
         transitionName:''
      }
    },
    mounted() {

    },
    computed:{
      ...mapGetters([
        'includePageNames'
      ])
    },
    watch: {
      $route(to, from) {
        // 切换效果
        if (to.path == '/home' || to.path == '/login' || to.path == '/personal' || from.path.indexOf('/personal') > -1) {
          this.transitionName = '';
        } else if (to.meta.index > from.meta.index) {//前进
          this.transitionName = 'slide-left';
        } else if (to.meta.index < from.meta.index) {
          this.transitionName = 'slide-right';
        } else {
          this.transitionName = '';
        }
      }
    },
    methods: {
      ...mapActions({
        saveInterport: 'SAVE_INTERPORT'
      })
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .cube-tab-bar-slider {
    background-color: rgb(29, 161, 242) !important;
  }
  .el-collapse-item__header {
    padding-left: 15px !important;
    height: 40px !important;
    line-height: 40px !important;
    font-weight: bold !important;
  }
  .el-collapse-item__content {
    padding-bottom: 0px !important;
  }
  .el-collapse-item__arrow {
    line-height: 40px !important;
  }
  .weui-switch-cp__input:checked~.weui-switch-cp__box, .weui-switch:checked{
    border-color: rgb(29, 161, 242);
    background-color: rgb(29, 161, 242);
  }
</style>
