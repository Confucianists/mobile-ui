const MEMBER_KEY = 'hejiagou_member'

export function setMember(isMember) {
  localStorage.setItem(MEMBER_KEY, isMember)
}

export function getMember() {
  let isMember = localStorage.getItem(MEMBER_KEY)
  if (isMember) {
    return Number(isMember)
  }  else {
    return 0
  }
}

export function removeMember() {
  localStorage.removeItem(MEMBER_KEY)
}
