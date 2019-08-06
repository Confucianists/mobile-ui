import Hw from './common/js'
import {
    Style,
    Button,
    Tab,
    Collection,
    Item,
    Header,
    Form,
    Map,
    Maphot,
    Popup,
    TwoList,
    ListView,
    BigButton,
    File,
    Background,
    Process,
    Opines,
    ListTipBottom,
    Search,
    Listwrapper,
    ViewShow,
    NumberGrow,
    PanelList,
    NoData,
    ScrollTop
  }from './moudle'
  const components = [
    Button,
    Tab,
    Collection,
    Item,
    Header,
    Form,
    Map,
    Maphot,
    Popup,
    TwoList,
    ListView,
    BigButton,
    File,
    Background,
    Process,
    Opines,
    ListTipBottom,
    Search,
    Listwrapper,
    ViewShow,
    NumberGrow,
    PanelList,
    NoData,
    ScrollTop
  ]
  
  function install(Vue) {
    if (install.installed) {
      return
    }
    install.installed = true
    Vue.prototype.hw = Hw
    components.forEach((Component) => {
      Component.install(Vue)
    })

  }
  
  const Bp = {
    /* eslint-disable no-undef */
    version: '0.0.1',
    install
  }
  
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(install)
  }
  
  export default Bp
  