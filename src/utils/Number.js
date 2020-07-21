/**
 * [浮点数加法计算]
 * @param  {Number} v1 [description]
 * @param  {Number} v2 [description]
 * @return {[type]}    [description]
 */
function mul (v1, v2) {
  let decimal = 0
  let m1 = v1.toString()
  let m2 = v2.toString()
  try {
    decimal += (m1.split('.')[1] || '').length
    decimal += (m2.split('.')[1] || '').length
  } catch (e) {
    console.log(e)
  }
  return Number(m1.replace('.', '')) * Number(m2.replace('.', '')) / Math.pow(10, decimal)
}

/**
 * [浮点数除法计算]
 * @param  {Number} v1 [description]
 * @param  {Number} v2 [description]
 * @return {[type]}    [description]
 */
function div (v1, v2) {
  let decimal = 0
  let m1 = v1.toString()
  let m2 = v2.toString()
  decimal = (m2.split('.')[1] || '').length - (m1.split('.')[1] || '').length
  return Number(m1.replace('.', '')) / Number(m2.replace('.', '')) * Math.pow(10, decimal)
}

/**
 * [浮点数加法计算]
 * @param  {Number} v1 [description]
 * @param  {Number} v2 [description]
 * @return {[type]}    [description]
 */
function add (v1, v2) {
  let decimal = 0
  let m1 = v1.toString()
  let m2 = v2.toString()
  decimal = Math.pow(10, Math.max((m1.split('.')[1] || '').length, (m2.split('.')[1] || '').length))
  return (mul(Number(v1), decimal) + mul(Number(v2), decimal)) / decimal
}

/**
 * [浮点数减法计算]
 * @param  {Number} v1 [description]
 * @param  {Number} v2 [description]
 * @return {[type]}    [description]
 */
function sub (v1, v2) {
  let decimal = 0
  let m1 = v1.toString()
  let m2 = v2.toString()
  decimal = Math.pow(10, Math.max((m1.split('.')[1] || '').length, (m2.split('.')[1] || '').length))
  return (mul(Number(v1), decimal) - mul(Number(v2), decimal)) / decimal
}

/**
 * [是否偶数]
 * @param  {[type]}  v [description]
 * @return {Boolean}   [description]
 */
function isEven (v) {
  return v % 2 === 0
}

/**
 * [校验数字是否越界]
 * @param  {[type]} v [description]
 * @return {[type]}     [description]
 */
function checkBoundary (v) {
  if (v > Number.MAX_SAFE_INTEGER || v < Number.MIN_SAFE_INTEGER) {
    console.warn(`${v} is beyond boundary when transfer to integer, the results may not be accurate`)
    return true
  }
  return false
}

/**
 * [四舍五入]
 * @param  {[type]} v   [description]
 * @param  {[type]} ratio [description]
 * @return {[type]}       [description]
 */
// function round (v, ratio) {
//   const base = Math.pow(10, ratio);
//   return divide(Math.round(times(v, base)), base);
// }

/**
 * [截取小数位]
 * @param  {[type]} v       [description]
 * @param  {[type]} decimal [description]
 * @return {[type]}         [description]
 */
function toFixed (v, decimal) {
  return Number(v).toFixed(decimal)
}

/**
 * [千分位格式化]
 * @param  {Number|String} v [description]
 * @param  {Number} n [保留小数点后几位]
 * @return {String}   [description]
 */
function thousands (v, n) {
  v = Number(v).toFixed(n) + ''
  let s = ('' + v).split('.')
  let d = n > 0 ? `.${s[1]}` : ''
  return s[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + d
}

/**
 * [矫正浮点数误差]
 * @param  {Number} v       [需要矫正的数]
 * @param  {Number} precision [精度]
 * @return {[type]}           [description]
 */
function strip (v, precision = 2) {
  return +parseFloat(v.toPrecision(precision))
}

/**
 * TODO 有问题
 * [upDigit 数字大写]
 * @param  {[type]} v [description]
 * @return {[type]}   [description]
 */
function capital (v) {
  const fraction = ['角', '分', '厘']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
  v = Math.abs(v)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(v * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  v = Math.floor(v)
  for (let i = 0; i < unit[0].length && v > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && v > 0; j++) {
      p = digit[v % 10] + unit[1][j] + p
      v = Math.floor(v / 10)
    }
    s = p + unit[0][i] + s
  }
  return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
}

/**
 * [randomNumber 随机返回指定范围内的整数]
 * @param  {Number} min [最小值,只有一个参数时该参数为最大值，最小值为0]
 * @param  {Number} max [最大值]
 * @return {Number}    [指定范围内的整数]
 */
function randomNumber (min = 0, max = 255) {
  if (arguments.length === 1) {
    return Math.round(Math.random() * min)
  } else {
    return Math.round(min + Math.random() * (max - min))
  }
}

/**
 * [numberFormatter 数字格式化]
 * @param  {[type]} num    [description]
 * @param  {[type]} digits [description]
 * @return {[type]}        [description]
 */
function numberFormatter (num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

// TODO 字符串二进制位运算与或

export { mul, div, add, sub, isEven, checkBoundary, toFixed, strip, capital, randomNumber, thousands, numberFormatter }
