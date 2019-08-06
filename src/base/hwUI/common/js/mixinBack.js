// commonOcn
export default {
  data() {
    return {
      ocn_back_flag: true,
      ocn_back_name: ''
    }
  },
  created() {
    this.ocn_back_flag = true
  },
  beforeRouteLeave(to, from, next) {
    // console.log(file_choose)
    if (to.name == this.ocn_back_name) {
      this.ocn_back_flag = false
      this.$route.meta.keepAlive = false
    }
    if (this.ocn_back_flag) {
      this.$route.meta.keepAlive = true
    }
    next()
  },
  methods: {
    // 初始化后退名称
    __init_back(n) {
      this.ocn_back_name = n
    }
  }
}