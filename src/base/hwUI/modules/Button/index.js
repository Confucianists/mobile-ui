import Button from '../../components/button/btnPrimary.vue'

Button.install = function (Vue) {
  Vue.component(Button.name, Button)
}

export default Button