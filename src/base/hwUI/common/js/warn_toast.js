// warn组件的二次封装
var warn_toast = function (vm) {
  var hasInit = function (txt, cb, bol) {
    let r = new Promise((reslove, reject) => {
      vm.cubeui_correct_toast = vm.$createToast({
        txt: txt,
        time: 1500,
        type: 'txt',
        mask: !bol,
        onTimeout: () => {
          cb && cb()
        }
      })
      reslove(true)
    })
    return r
  }
  // 显示
  var show = function (txt, bol) {
    let r = new Promise((reslove, reject) => {
      hasInit(txt, reslove, bol)
        .then(r => {
          vm.cubeui_correct_toast.show()
        })
    })
    return r
  }
  // 隐藏
  var hide = function () {
    vm.cubeui_correct_toast.hide()
  }
  return {
    show: show,
    hide: hide
  }
}

export default warn_toast