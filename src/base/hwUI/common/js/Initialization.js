function returnback() {
  var file_choose = document.getElementsByClassName("ocn-file-choose")[0];
  var photo_choose = document.getElementsByClassName("ocn-photo-choose")[0];
  var video_choose = document.getElementsByClassName("ocn-video-choose")[0];
  var file_del = document.getElementsByClassName("ocn-file-del")[0];
  if (window.location.href.split('#')[1] == '/Login' || window.location.href.split('#')[1] == '/Work' || window.location.href.split('#')[1] == '/Map' || window.location.href.split('#')[1] == '/Personal' || window.location.href.split('#')[1] == '/Contacts') {
    api.closeWidget({
      id: window.widgetId,
      retData: {
        name: 'closeWidget'
      },
      animation: {
        type: 'flip',
        subType: 'from_bottom',
        duration: 500
      }
    });
  } else if (file_choose || photo_choose || video_choose || file_del) {
    api.toast({
      msg: '请先关闭弹层',
      duration: 2000,
      location: 'bottom'
    });
  } else {
    window.history.back()
  }
}

// 监听返回按键
function listenBack() {
  api.addEventListener({
    name: 'keyback'
  }, function (ret, err) {
    var hearf = window.location.href;
    var sub0 = hearf.indexOf('#');
    var sub1 = hearf.indexOf('?') != '-1' ? hearf.indexOf('?') : hearf.length;
    var string = hearf.substring(sub0, sub1);
    var canUrl = string.split('/');
    var can = canUrl[canUrl.length - 1];
    // 返回数据
    if (window.returnbtn[can]) {
      window.returnbtn[can]();
    } else {
      returnback();
    }
  });
}

// 获取当前xml数据的信息
function getXmlData() {
  var trans = api.require('trans');
  trans.parse({
    path: 'widget://config.xml'
  }, function (ret, err) {
    if (ret) {
      window.widgetId = ret.widget.id;
    } else {
      alert(JSON.stringify(err));
    }
  });
}

// 设置端口
function setIp(vm) {
  // 设置端口
  if (!window.localStorage.getItem('cacheip')) {
    // http://61.160.70.170:18088/cm_emergency_event/list_page
    window.localStorage.setItem('cacheip', JSON.stringify([{
      "ip": "61.116.45.130",
      "port": "8391",
      "host": "http://61.166.75.130:8391/"
    },{
      "ip": "61.164.71.130",
      "port": "8391",
      "host": "http://61.162.71.110:8391/"
    }, {
      "ip": "61.181.22.70",
      "port": "58588",
      "host": "http://61.111.42.60:5858/"
    }]))
  }
  if (!vm.$store.state.interport.host) {
    vm.saveInterport(vm.$store.state.config.window.interPort)
  }
}

// 设置nw
function __pc_top() {
  window.nw && (() => {
    var win = nw.Window.get();
    win.setAlwaysOnTop(true);
  })();
}

function __init(vm, widgetId, cb) {
  setIp(vm)
  __pc_top()
  window.widgetId = widgetId || 'A6073898887690';
  window.backSecond = 0
  window.returnbtn = {}
  window.apiready = function () {
    listenBack()
    getXmlData()
    cb && cb()
  }
}

export default __init
