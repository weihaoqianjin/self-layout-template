import db from './db'

const data = Object.assign(db)

export default {
  getArray (key) {
    let items = data[key] || []
    return items
  },
  getMap (key) {
    let items = data[key] || null
    if (!items) return {}
    let map = {}
    for (let item of items) {
      map[item.value] = item.label
    }
    return map
  }
}
