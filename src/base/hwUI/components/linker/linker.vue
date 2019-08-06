<template>
    <div class="contact-wrapper">
        <router-link class="cur_mk" v-for="(item,index) in data" :key="index" :to="item.url">
            <div class="hed_cur">
                <div class="img"><img :src="item.img" /></div>
                <span>{{item.title}}</span>
            </div>
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'hw-linker',
        props: {
            data: {}
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
    .contact-wrapper {
        margin-top: 15px;
        text-align: left;
        overflow: hidden;
        background-color: white;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
    }
    #all_con {
        width: 100%;
        height: auto;
        border: 0px solid blue;
    }
    .change_header {
        width: 100%;
        height: 55px;
        background-color: white;
        border-top: 1px solid #F2F2F2;
        border-bottom: 1px solid #F2F2F2;
    }
    .cur_mk {
        width: 33.2%;
        height: 55px;
        float: left;
    }
    .active {
        border-bottom: 2px solid blue;
    }
    .hed_cur {
        width: 60px;
        height: 40px;
        font-size: 12px;
        text-align: center;
        margin: 6px auto;
        border: 0px solid blue;
    }
    .img {
        width: 25px;
        height: 25px;
        margin: 0 auto;
        margin-bottom: 3px;
    }
    .img img {
        width: 25px;
        height: 25px;
    }
    .hui_d {
        width: 100%;
        height: 10px;
        background-color: #F6F6F6;
    }
    .nei_con {
        width: 100%;
        height: 400px;
        border: 1px solid red;
    }
</style>
