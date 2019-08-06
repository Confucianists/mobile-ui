// loading组件的二次封装
var loading = function (vm) {
  // 初始化
  var hasInit = function (txt) {
    let r = new Promise((reslove, reject) => {
      vm.cubeui_loading = vm.$createToast({
        txt: txt,
        time: 90000,
        mask: true
      })
      reslove()
    })
    return r
  }
  // 显示
  var show = function (txt) {
    hasInit(txt)
      .then(r => {
        vm.cubeui_loading.show()
      })
  }
  // 隐藏
  var hide = function () {
    vm.cubeui_loading.hide()
  }
  return {
    show: show,
    hide: hide
  }
}

export default loading