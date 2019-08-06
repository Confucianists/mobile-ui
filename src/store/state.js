import { loadData } from '@/common/js/catch'
import Color from './color'
import Config from './config'
let ipport = {"ip":"","port":"18088","host":"http://:18088/"}
const state = {
  // 用户信息
  userinfo: loadData('userinfo'),
  login: loadData('login'),
  step: loadData('step'),
  // 项目色系
  color: Color,
  // 基础信息配置
  config: Config,
  // ip和端口，接口设置,
  interport: loadData('interport'),
  // 查询结果
  search:{},
  // 页面缓存
  includePageNames:[],
  // 附件存储
  files: [],
  settleAccounts: {
    condition: 1,
    type: 'abc',
  },
}
export default state
