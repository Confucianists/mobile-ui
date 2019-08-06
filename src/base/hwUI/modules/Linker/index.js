import Linker from '../../components/linker/linker.vue'

Linker.install = function (Vue) {
  Vue.component(Linker.name, Linker)
}

export default Linker