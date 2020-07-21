import * as LDate from './Date'
import * as LNumber from './Number'

const prefix = '_'

/* eslint-disable */
Object.entries(LDate).forEach((v) => {
  Date.prototype[prefix + v[0]] = function () {
    return v[1].call(this, this, ...arguments)
  }
})
Object.entries(LNumber).forEach((v) => {
  Math[prefix + v[0]] = function () {
    return v[1].call(this,...arguments)
  }
  Number.prototype[prefix + v[0]] = function () {
    return v[1].call(this, this, ...arguments)
  }
})
