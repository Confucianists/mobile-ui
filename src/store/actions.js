import { saveData } from '@/common/js/catch'

export const SAVE_USER_INFO = function ({ commit }, userInfo) {
    commit('SET_USER_INFO', saveData(userInfo, 'userinfo'))
}

export const SAVE_INTERPORT = function ({ commit }, interport) {
    commit('SET_INTERPORT', saveData(interport, 'interport'))
}

export const SAVE_LOGIN = function ({ commit }, login) {
    commit('SET_LOGIN', saveData(login, 'login'))
}
export const SAVE_STEP = function ({ commit }, step) {
  commit('SET_STEP', saveData(step, 'step'))
}
export const SAVE_SEARCH = function ({ commit }, search) {
    commit('SET_SEARCH', saveData(search, 'search'))
}

export const SETTLE_BUY_NOW = function ({ commit }, list) {
  commit('SETTLE_BUY_NOW', list)
}

export const SETTLE_BUY_CART = function ({ commit }, list) {
  commit('SETTLE_BUY_CART', list)
}

export const SETTLE_IS_MEMBER = function ({ commit }, list) {
  commit('SETTLE_IS_MEMBER', list)
}
