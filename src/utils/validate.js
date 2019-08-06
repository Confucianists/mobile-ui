export default {
  /**
   * 验证密码
   * @param str
   */
  password(str, min, max) {
    if (str.length < min || str.length > max) {
      return false
    }

    const regExp = /^[0-9A-Za-z!@#$%^&*]+$/
    if (!regExp.test(str)) {
      return false
    }

    return true
  },

  /**
   * 验证密码强度
   * @param str
   */
  passwordStrength(str) {
    let strength = 0
    let number = 0
    let lower = 0
    let upper = 0
    let special = 0
    if (str.trim().length == 0) {
      return strength
    }

    if (/[0-9]+/.test(str)) {
      number = 1
    }
    if (/[a-z]+/.test(str)) {
      lower = 1
    }
    if (/[A-Z]+/.test(str)) {
      upper = 1
    }
    if (/[!@#$%^&*]+/.test(str)) {
      special = 2
    }
    let total = number + lower + upper + special

    if (total > 3) {
      strength = 3
    } else if (total > 2) {
      strength = 2
    } else {
      if (special == 2) {
        strength = 2
      } else {
        strength = 1
      }
    }

    return strength
  },

  /**
   * 验证邮箱
   * @param str
   */
  email(str) {
    const regExp = /^(\w-*\.*)+@(\w-?)+(\.\w{1,})+$/
    if (regExp.test(str)) {
      return true
    } else {
      return false
    }
  },

  /**
   * 验证手机
   * @param str
   */
  phone(str) {
    const regExp = /^1[2|3|4|5|6|7|8][0-9]{9}$/
    if (regExp.test(str)) {
      return true
    } else {
      return false
    }
  },

  /**
   * 验证QQ
   * @param str
   */
  qq(str) {
    const regExp = /^[1-9][0-9]{5,10}$/
    if (regExp.test(str)) {
      return true
    } else {
      return false
    }
  },
  
  /**
   * 验证短信验证码
   * @param str
   */
  smsCode(str) {
    const regExp = /^[0-9]{6}$/
    if (regExp.test(str)) {
      return true
    } else {
      return false
    }
  },
  
  /**
   * 验证微信
   * 1、可以使用6-20个子母、数字、下划线和减号
   * 2、必须以字母开头（字母不区分大小写）
   * 3、不能设置中文
   * @param str
   */
  wechat(str) {
    const regExp = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
    if (regExp.test(str)) {
      return true
    } else {
      return false
    }
  },
  
  /**
   * 验证姓名
   * @param str
   */
  truename(str) {
    const regExp = /^[\u4e00-\u9fa5]{2,4}$/
    if (regExp.test(str)) {
      return true
    } else {
      return false
    }
  },
  
  /**
   * 验证身份证
   * @param str
   */
  identityCard(str) {
    const regExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (regExp.test(str)) {
      return true
    } else {
      return false
    }
  },
}
