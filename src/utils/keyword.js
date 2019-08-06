const KEYWORD_KEY = 'hejiagou_keyword'

export function setKeyword(keyword) {
  let keywords = localStorage.getItem(KEYWORD_KEY)
  if (keywords) {
    const list = keywords.split(',')
    if (list.indexOf(keyword) == -1) {
      localStorage.setItem(KEYWORD_KEY, keywords + ',' + keyword)
    }
  } else {
    localStorage.setItem(KEYWORD_KEY, keyword)
  }
}

export function getKeyword() {
  const keywords = localStorage.getItem(KEYWORD_KEY)
  if (keywords) {
    const list = keywords.split(',')
    return list
  } else {
    return []
  }
}

export function removeKeyword() {
  localStorage.removeItem(KEYWORD_KEY)
}
