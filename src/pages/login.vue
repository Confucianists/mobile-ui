<template>
  <div class="wrap">
    <div class="head">
      <i class="iconfont icon-fanhui1" @click="$router.go(-1)"></i>
      <span v-if="type === 1">登录</span>
      <span v-if="type === 0">密码登录</span>
      <a v-if="type === 1" @click="toggleType(0)">密码登录</a>
      <a v-if="type === 0" @click="toggleType(1)">免密码登录</a>
    </div>
    <div class="contain">
      <div class="logo">
        <img src="" alt>
      </div>
      <div class="form">
        <div class="phone">
          <input type="number" v-model="phone" maxlength="11" placeholder="手机号">
        </div>
        <div class="yzm" v-if="type === 1">
          <input type="number" v-model="messageCode" maxlength="6" placeholder="验证码">
          <a @click="getSmsCode()" v-if="!isCountDown">获取验证码</a>
          <a style="color:#999;" v-else>重新获取{{countDownTime}}s</a>
        </div>
        <div class="pwd" v-if="type === 0">
          <input :type="showPwd?'text':'password'" v-model="password" maxlength="16" placeholder="登录密码">
          <i class="iconfont icon-biyan" v-show="!showPwd" @click="showPwd=!showPwd"></i>
          <i class="iconfont icon-zhengyan" v-show="showPwd" @click="showPwd=!showPwd"></i>
          <a @click="$router.push('/')">忘记密码</a>
        </div>

        <div v-if="type == 0" :class="inputValue?'login noopacity':'login'" @click="handleSubmit()">登录</div>

        <div v-if="type == 1" :class="yzmValue?'login noopacity':'login'" @click="handleSubmit()">登录</div>

      </div>
      <div class="bottom">
        <p class="tip" v-if="type === 1">手机号首次登录，享新人好礼</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { setToken } from '../utils/token'
  import { setMember } from '../utils/member'
  import validate from '../utils/validate'

  export default {
    data() {
      return {
        phone: '',
        password: '',
        messageCode: '',
        smsId: '',
        type: 1,
        showPwd:false,
        isCountDown: false,
        countDownTime: 60,
      }
    },
    computed: {
      verifyForm: function () {
        if (!validate.phone(this.phone)) {
          return {"flag": false, "msg": '请输入11位有效的手机号'}
        }
        if (this.type === 0) {
          if (!validate.password(this.password, 6, 16)) {
            return {"flag": false, "msg": '请输入6-16位有效的密码'}
          }
        } else {
          if (this.smsId == '') {
            return {"flag": false, "msg": '请点击获取验证码'}
          }
          if (!validate.smsCode(this.messageCode)) {
            return {"flag": false, "msg": '请输入6位有效的验证码'}
          }
        }

        return {"flag": true, "msg": 'ok'}
      },
      inputValue(){
          if(this.phone!==''&&this.password!==''){
            return true
          }else{
            return false
          }

      },
      yzmValue(){
          if(this.phone!==''&&this.messageCode!==''){
            return true
          }else{
            return false
          }
      }

    },
    methods: {
      toggleType(type) {
        this.type = type
        this.phone = ''
        this.password = ''
        this.messageCode = ''
      },

      getSmsCode() {
        if (!validate.phone(this.phone)) {
          this.$createToast({
            txt: '请输入11位有效的手机号',
            type: 'txt',
            time: 1500
          }).show()
          return false
        }

        this.get('getPhoneCode', {
          phone: this.phone
        }).then(res => {
          this.countDownEvent()
          this.smsId = res.data.smsId
          this.$createToast({
            txt: '获取验证码成功',
            type: 'txt',
            time: 1500
          }).show()
        }).catch(err => {
          console.log(err)
        })
      },

      handleSubmit() {
        if (!this.verifyForm.flag) {
          this.$createToast({
            txt: this.verifyForm.msg,
            type: 'txt',
            time: 1500
          }).show()
          return false
        }

        this.post('login', {
          phone: this.phone,
          password: this.password,
          messageCode: this.messageCode,
          messageId: this.smsId,
          type: this.type
        }).then(res => {
          const token = res.data.token
          setToken(token)
          this.checkMember()
          this.$router.replace('/personal')
        }).catch(err => {
          console.log(err)
        })
      },

      countDownEvent() {
        this.isCountDown = true
        this.countDownTime = 60
        let timer = ''
        timer = setInterval(() => {
          if (--this.countDownTime > 0) {
            //
          } else {
            this.isCountDown = false
            clearInterval(timer)
          }
        }, 1000)
      },

      // 是否会员
      checkMember() {
        this.get("userVipList").then(res => {
          if (res.data.length > 0) {
            setMember(1)
          } else {
            setMember(0)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable';
@import '~@/common/stylus/mixin';

.wrap {
  height: 100%;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}

.head {
  height: vw(142);
  width: vw(750);
  position: fixed;
  top: 0;
  background-color: #F4F4F4;
  text-align: center;
  border-bottom: vw(2) solid #E9E9E9;

  span {
    display: block;
    margin-top: vw(77);
    font-size: vw(31);
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }

  i {
    position: absolute;
    top: vw(74);
    left: vw(39);
    font-size: vw(46);
    color: #444444;
  }

  a {
    display: block;
    position: absolute;
    right: vw(22);
    top: vw(77);
    font-size: vw(28);
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
}

.contain {
  position: fixed;
  top: vw(142);
  width: vw(750);
}

.logo {
  height: vw(169);
  margin-top: vw(55);
  text-align: center;

  img {
    height: vw(169);
    width: vw(169);
  }
}

.form {
  height: vw(395);
  padding: 0 vw(60);
  .phone {
      height vw(120)
      input{
        height vw(76)
        border-bottom vw(2) solid #E3E3E3
        font-size:vw(31);
        margin-top vw(44)
        color:rgba(51,51,51,1);
      }
  }

  .yzm {
       height vw(120)
       position relative
       input{
        height vw(76)
        border-bottom vw(2) solid #E3E3E3
        font-size:vw(31);
        margin-top vw(44)
        color:rgba(51,51,51,1);
      }
      a{
          font-size:vw(28);
          font-weight:500;
          color:rgba(246,82,79,1);
          position absolute
          right 0
          top vw(65)
      }
  }
  .pwd{
       height vw(120)
       position relative
       input{
        height vw(76)
        border-bottom vw(2) solid #E3E3E3
        font-size:vw(31);
        margin-top vw(44)
        color:rgba(51,51,51,1);
      }
      a{
        display block
        font-size:vw(28);
        font-weight:500;
        color:rgba(68,68,68,1);
        border-left vw(2) solid #E0E0E0
        padding vw(5) vw(30)
        position absolute
        right 0
        top vw(62)
      }
      i{
        font-size vw(48)
        color #9E9E9E
        position absolute
        right vw(205)
        top vw(60)
      }
  }
  .login {
    width: vw(629);
    height: vw(85);
    background: #F6524F;
    opacity: 0.5;
    border-radius: vw(42);
    text-align center
    line-height: vw(85);
    margin  0 auto
    font-size:vw(28);
    font-weight:500;
    color:rgba(255,255,255,1);
    margin-top: vw(73)
  }
  .noopacity{
    opacity: 1 !important
  }
}

.bottom {
  height: vw(390);
  padding-top vw(35)
  .tip{
    font-size:vw(28);
    font-weight:500;
    color:rgba(246,140,14,1);
    text-align center
  }
  .fenge {
    margin 0 auto
    margin-top: vw(154);
    height: vw(0);
    border-bottom: vw(2) solid #f5efef;
    position: relative;
    width 84%

    span {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0 vw(23);
      background: #fff;
      font-size:vw(28);
      color:rgba(166,166,166,1);
      line-height:9px;
    }
  }

  .sanfang {
      height vw(85)
      width vw(750)
      font-size 0
      margin-top vw(60)
    .left{
        display inline-block
        width vw(375)
        text-align right
        padding-right vw(30)
        .item-wx {
            display inline-block
            width: vw(85);
            height: vw(85);
            border: vw(2) solid rgba(70, 187, 54, 1);
            border-radius: 50%;
            position relative
            i{
                color rgba(70, 187, 54, 1);
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size vw(48)
            }
        }
    }
    .right{
        display inline-block
        width vw(375)
        text-align left
        padding-left vw(30)
        .item-qq {
            display inline-block
            width: vw(85);
            height: vw(85);
            border: vw(2) solid rgba(29,178,237,1);
            border-radius: 50%;
            position relative
            i{
                color rgba(29,178,237,1)
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size vw(48)
            }
        }
    }

  }
}

>>>.cube-switch .cube-switch-input:checked + .cube-switch-ui {
  border-color: #1CC11D;
  background-color: #1CC11D;
}

/* placeholder */
input::-webkit-input-placeholder {
  font-size: vw(31);
  font-weight: 500;
  color: rgba(179, 179, 179, 1);
}

textarea::-webkit-textarea-placeholder {
  font-size: vw(28);
  font-weight: 500;
  color: rgba(179, 179, 179, 1);
}

/* ******滚动条****** */
::-webkit-scrollbar {
  width: 0;
  height: 1px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
</style>
