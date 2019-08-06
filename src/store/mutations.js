const mutations = {
  ['SET_USER_INFO'](state, userinfo) {
    state.userinfo = userinfo
  },
  ['SET_INTERPORT'](state, interport) {
    state.interport = interport
  },
  ['SET_LOGIN'](state, login) {
    state.login = login
  },
  ['SET_STEP'](state, step) {
    state.step = step
  },
  ['SET_ACQADDROOM'](state, acqAddRoom) {
    state.acqAddRoom = acqAddRoom
  },
  ['SET_PROPERTYINFOR'](state, propertyInfor) {
    state.propertyInfor = propertyInfor
  },
  ['SET_ADDMEMBERS'](state, addMembers) {
    state.addMembers = addMembers
  },
  ['SET_SEARCH'](state, search) {
    state.search = search
  },
  ['SET_FILES'](state, files) {
    state.files = files
  },
  ['SET_INCLUDEPAGENAMES'](state, includePageNames) {
    state.includePageNames = includePageNames
  },
  ['SETTLE_BUY_NOW'](state, list) {
    state.settleBuyNow = list
  },
  ['SETTLE_BUY_CART'](state, list) {
    state.settleBuyCart = list
  },
  ['SETTLE_IS_MEMBER'](state, list) {
    state.settleIsMember = list
  },
}

export default mutations
