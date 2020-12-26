export default {
  methods: {
    formatterYMD (row, column, cellValue, index) {
      if (cellValue === undefined || cellValue === '') return '-'
      let d
      let n = row[column.property]
      if (n instanceof Date) {
        d = n
      } else if (typeof n === 'string') {
        if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('Mac')) {
          let str = n.replace('.000', '').replace(/-/g, '/')
          d = new Date(str)
        } else {
          d = new Date(n)
        }
      } else {
        return ''
      }
      return d._format('yyyy-MM-dd')
    },
    formatterYMDHM (row, column, cellValue, index) {
      if (cellValue === undefined || cellValue === '') return '-'
      let d
      let n = row[column.property]
      if (n instanceof Date) {
        d = n
      } else if (typeof n === 'string') {
        if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('Mac')) {
          let str = n.replace('.000', '').replace(/-/g, '/')
          d = new Date(str)
        } else {
          d = new Date(n)
        }
      } else {
        return ''
      }
      return d._format('yyyy-MM-dd HH:mm')
    },
    formatterYMDHMS (row, column, cellValue, index) {
      if (cellValue === undefined || cellValue === '') return '-'
      let d
      let n = row[column.property]
      if (n instanceof Date) {
        d = n
      } else if (typeof n === 'string') {
        if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('Mac')) {
          let str = n.replace('.000', '').replace(/-/g, '/')
          d = new Date(str)
        } else {
          d = new Date(n)
        }
      } else {
        return ''
      }
      if (d) {
        return d._format('yyyy-MM-dd HH:mm:ss')
      }
    },
    formatterHMS (row, column, cellValue, index) {
      if (cellValue === undefined || cellValue === '') return '-'
      let d
      let n = row[column.property]
      if (n instanceof Date) {
        d = n
      } else if (typeof n === 'string') {
        if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('Mac')) {
        let str = n.replace('.000', '').replace(/-/g, '/')
        d = new Date(str)
      } else {
        d = new Date(n)
      }
      } else {
        return ''
      }
      return d._format('HH:mm:ss')
    },
    formatterMoney (row, column, cellValue, index) {
      let v = row[column.property]
      return Number(v).toFixed(2)
    },
    formatterPlaceholder (row, column, cellValue, index) {
      return (cellValue === undefined || cellValue === '') ? '-' : cellValue
    },
    findObjByProp (objs, prop, value, type = 'boolean') {
      let ret = {}
      let flag = false
      objs.map(v => {
        if (v[prop] === value) {
          flag = true
          ret = v
        }
      })
      if (type === 'obj') return ret
      return flag
    },
    toPrecision (value, num, ret = '') {
      if (value) {
        return (value / Math.pow(10, num)).toFixed(num)
      } else if (value === 0) {
        return (0 / Math.pow(10, num)).toFixed(num)
      } else {
        return ret
      }
    }
  }
}
