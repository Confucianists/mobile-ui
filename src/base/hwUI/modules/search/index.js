import Search from '../../components/search/search.vue'

Search.install = function (Vue) {
  Vue.component(Search.name, Search)
}

export default Search