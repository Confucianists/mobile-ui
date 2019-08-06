import Map from '../../components/map/map.vue'

Map.install = function (Vue) {
  Vue.component(Map.name, Map)
}

export default Map