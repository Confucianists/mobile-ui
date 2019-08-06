import storage from 'good-storage'

// 获取对象的数据
export function loadData(n) {
    let m = storage.get(n, {})
    return m
}

// 存储更新对象的数据
export function saveData(r, n) {
    let dataOld = storage.get(n, {})
    let dataNew = Object.assign(dataOld, r)
    storage.set(n, dataNew)
    return dataNew
}