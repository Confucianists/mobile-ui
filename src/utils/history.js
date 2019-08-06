const MENU_KEY = 'hejiagou_menu'

export function setMenu(menu) {
  localStorage.setItem(MENU_KEY, menu)
}

export function getMenu() {
  const menu = localStorage.getItem(MENU_KEY)
  if (menu) {
    return menu
  } else {
    return ''
  }
}

export function removeMenu() {
  localStorage.removeItem(MENU_KEY)
}
