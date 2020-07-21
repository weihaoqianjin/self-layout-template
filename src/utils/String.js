/**
 * [capitalizeEveryWord 首字母转大写]
 * @param  {String} str [description]
 * @return {String}     [description]
 */
function capitalizeEveryWord (str) {
  return str.replace(/\b[a-z]/g, char => char.toUpperCase())
}

/**
 * [snake2Camel 蛇形转驼峰]
 * @param  {String} str      [description]
 * @param  {Boolean} capLower [description]
 * @return {String}          [description]
 */
function snake2Camel (str, capLower) {
  let s = str.replace(/[-_](\w)/g, function (x) {
    return x.slice(1).toUpperCase()
  })
  s = s.replace(/^\w/, function (x) {
    return capLower ? x.toLowerCase() : x.toUpperCase()
  })
  return s
}

/**
 * [camel2Snake 驼峰转蛇形]
 * @param  {String} str [description]
 * @return {String}     [description]
 */
function camel2Snake (str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * [randomNumber 生成随机字符串]
 * @param  {Number} count [description]
 * @return {String}       [description]
 */
function randomNumber (count) {
  return Math.random().toString(count).substring(2)
}

/**
 * [trim 去空格]
 * @param  {String} str  [description]
 * @param  {Number} type [1-所有空格  2-前后空格  3-前空格 4-后空格（默认1）]
 * @return {String}      [description]
 */
function trim (str, type = 1) {
  switch (type) {
    case 1:return str.replace(/\s+/g, '')
    case 2:return str.replace(/(^\s*)|(\s*$)/g, '')
    case 3:return str.replace(/(^\s*)/g, '')
    case 4:return str.replace(/(\s*$)/g, '')
    default:return str
  }
}

/**
 * [getExtension 获取文件后缀名]
 * @param  {String} str [description]
 * @return {String}     [description]
 */
function getExtension (str) {
  /* eslint-disable no-useless-escape */
  let v = str.match(/\.[^\.]*$/g)
  return v && v.length ? v[0] : ''
}

/**
 * [bitOperation 二进制字符串位运算]
 * @param  {String} v1        [description]
 * @param  {String} v2        [description]
 * @param  {String} operators [description]
 * @return {String}           [description]
 */
function bitOperation (v1, v2, operators) {
  let len = Math.max(v1.length, v2.length)
  let arr1 = v1.split('').reverse()
  let arr2 = v2.split('').reverse()
  function and (n1, n2) {
    return n1 + '' + n2 === '11' ? '1' : '0'
  }
  let res = []
  let fn = null
  switch (operators) {
    case '&':
      fn = and
      break
    default:
      // statements_def
      break
  }
  if (!fn) {
    return
  }
  for (let i = 0; i < len; i++) {
    res.unshift(fn(arr1[i], arr2[i]))
  }
  return res.join('')
}

/**
 * [isEmail 是否邮箱]
 * @param  {String}  str [description]
 * @return {Boolean}     [description]
 */
function isEmail (str) {
  if (!str) return false
  if (str.length > 254) return false
  /* eslint-disable no-useless-escape */
  const reg = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
  if (!reg.test(str)) return false
  const parts = str.split('@')
  if (parts[0].length > 64) return false
  const domainParts = parts[1].split('.')
  if (domainParts.some(function (part) { return part.length > 63 })) return false
  return true
}

export {
  capitalizeEveryWord,
  snake2Camel,
  camel2Snake,
  randomNumber,
  trim,
  getExtension,
  isEmail,
  bitOperation
}
