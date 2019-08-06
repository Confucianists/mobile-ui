/**
 * 基础信息配置
 */

export default {
  // 配置信息
  window:{
    navigationBarBackgroundColor: "#33ae1b",
    navigationBarTextStyle: "#fff",
    navigationBarTitleText: "XX",
    backgroundColor: "#1da1f2",
    textColor: "#fff",
    interPort: {
      ip: '',
      port: 30000,
      host:''
    },
  },
  // 配置底部导航信息
  tabBar: {
    list: [{
      text: '首页',
      pagePath: '/home',
      iconName:'icon-shouyex',
    }, {
      text: '分类',
      pagePath: '/category',
      iconName:'icon-classify_icon',
    }, {
      text: '购物车',
      pagePath: '/cart',
      iconName:'icon-gouwuche1',
    }, {
      text: '我的',
      pagePath: '/personal',
      iconName:'icon-wode',
    }],
    color: "rgba(51,51,51,1)",
    selectedColor: "#29adff"
  }
};
