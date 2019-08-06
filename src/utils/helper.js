import { getMember } from '../utils/member'

/**
 * 解析url参数
 * @example ?id=1&name=man
 * @return Object {id:1,name:man}
 */
export function urlParse() {
  let url = window.location.href
  console.log(url)
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}

/**
 * 深拷贝
 * @param obj
 * @returns {any}
 */
export function deepClone(obj) {
  let _obj = JSON.stringify(obj)
  return JSON.parse(_obj)
}

/**
 * 处理价格
 */
export function processPrice(activityPrice, memberPrice, price) {
  if (activityPrice && activityPrice > 0) {
    return activityPrice
  }
  
  const isMember = getMember()
  
  if (isMember == 1 && memberPrice && memberPrice > 0) {
    return memberPrice
  }
  return price
}

export function showPrice(activityPrice, memberPrice) {
  if (activityPrice && activityPrice > 0) {
    return 1
  }
  if (memberPrice && memberPrice > 0) {
    return 1
  }
  return 0
}
