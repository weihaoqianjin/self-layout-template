import Constant from '@/constants'
import * as UNumber from '@/utils/Number'

export function constant (n, key, nullStr = '--') {
  const map = Constant.getMap(key)
  return map[n] || nullStr
}

export const $c = constant

export function formatMoney (v, n = 2) {
  if (!v) return Number('0').toFixed(n)
  return UNumber.thousands(v, n)
}

export function formatMoney2 (v, n = 2, output = '0.00') {
  let ret = v ? v.toString() : output
  return Number(ret).toFixed(n)
}

export function formatDate (n, fm = 'yyyy-MM-dd HH:mm:ss') {
  if (!n) return ''
  let d
  if (n instanceof Date) {
    d = n
  } else if (typeof n === 'string') {
    if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('Mac')) {
      let str = n.replace('.000', '').replace(/-/g, '/')
      d = new Date(str)
    } else {
      d = new Date(n)
    }
  }
  return d._format(fm)
}

export function desensitize (v, type = 'phone') {
  switch (type) {
    case 'phone':
      let reg = /(\d{3})(\d{4})/
      return v.replace(reg, '$1****')
    case 'pwd':
      return '********'
    default:
      return ''
  }
}

export function handleNullValue (value) {
  let line = null
  value ? line = value : line = '-'
  return line
}
