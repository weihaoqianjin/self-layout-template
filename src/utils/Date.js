/**
 * [new时间对象兼容方法]
 * @param  {[type]} s [description]
 * @return {[type]}   [description]
 */
function newDate (s) {
  return new Date(s.replace(/\s/, 'T'))
}

/**
 * [获取最近几天日期]
 * @param  {[type]} day   [description]
 */
function getDay (day) {
  var today = new Date()
  var targetdayMilliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
  today.setTime(targetdayMilliseconds)
  var tYear = today.getFullYear()
  var tMonth = today.getMonth()
  var tDate = today.getDate()
  tMonth = doHandleMonth(tMonth + 1)
  tDate = doHandleMonth(tDate)
  return tYear + '-' + tMonth + '-' + tDate
}
function doHandleMonth (month) {
  var m = month
  if (month.toString().length === 1) {
     m = '0' + month
  }
  return m
}

/**
 * [获取相差几天]
 * @param  {[type]} day   [description]
 */
function getDifferDay (day1, day2) {
  let date1 = new Date(day1)
  let date2 = new Date(day2)
  let date = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)
  return parseInt(date)
}

/**
 * [时间格式化]
 * @param  {[type]} d   [description]
 * @param  {[type]} fmt [description]
 * @return {[type]}     [description]
 */
function format (d, fmt) {
  if (!(d instanceof Date)) {
    throw new Error('is not Date')
  }
  var o = {
    'M+': d.getMonth() + 1, // 月份
    'd+': d.getDate(), // 日
    'H+': d.getHours(), // 小时
    'm+': d.getMinutes(), // 分
    's+': d.getSeconds(), // 秒
    'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
    'S': d.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

export {
  newDate,
  format,
  getDay,
  getDifferDay
}
