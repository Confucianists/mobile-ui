<template>
    <div class="personal-wrapper">
        <div class="temp_cur" v-for="(item,index) in data" :key="index" :style="item.style" @click="item.url && $router.push(item.url)">
            <div class="me_small_img"><img :src="item.img" /></div>
            <div class="me_cata_wen">
                <label>{{item.title}}</label>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "hw-item",
        props: {
            data: {}
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
    .personal-wrapper 
        margin-top: 15px;
        text-align: left;
        overflow: hidden;
        background-color: none;
    
    .mec_content 
        width: 100%;
        height: auto;
        float: left;
        border: 0px solid blue;
    
    .temp_my 
        width: 100%;
        height: 50px;
        line-height: 50px;
        margin-bottom: 10px;
        background-color: white;
        label 
            margin-left: 15px;
            font-size: 15px;
    
    .temp_cur 
        width: 100%;
        height: 35px;
        font-size: 14px;
        border-bottom: 1px solid #e5e5e5;
        background-color: white;
        padding: 8px 15px;
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center
        .me_cata_wen 
            width: 75%;
            height: 30px;
            line-height: 30px;
            float: left;
            margin-left: 15px;
            margin-top: 2px;
        .me_small_img 
            width: 25px;
            height: 25px;
            float: left;
            margin-left: 0px;
            margin-top: 2px;
            img 
                width: 25px;
                height: 25px;
    
</style>
