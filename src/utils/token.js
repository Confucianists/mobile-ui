const TOKEN_KEY = 'hejiagou_token'

/**
 * 存储token
 * @param token
 */
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * 获得某个token
 * @returns {*}
 */
export function getToken() {
  let token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    return token
  } else {
    return ''
  }
}

/**
 * 移除token
 */
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}
