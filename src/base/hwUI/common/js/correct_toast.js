// toast组件的二次封装
var correct_toast = function (vm) {
  var hasInit = function (txt, cb) {
    let r = new Promise((reslove, reject) => {
      vm.cubeui_correct_toast = vm.$createToast({
        txt: txt,
        time: 1500,
        type: 'txt',
        mask: true,
        onTimeout: () => {
          cb && cb()
        }
      })
      reslove(true)
    })
    return r
  }
  // 显示
  var show = function (txt) {
    let r = new Promise((reslove, reject) => {
      hasInit(txt, reslove)
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

export default correct_toast