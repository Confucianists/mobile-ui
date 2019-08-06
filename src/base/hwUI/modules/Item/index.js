import Item from '../../components/item/item.vue'

Item.install = function (Vue) {
  Vue.component(Item.name, Item)
}

export default Item
