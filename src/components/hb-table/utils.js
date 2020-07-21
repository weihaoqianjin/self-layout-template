function calcColumnWidth (columns, table) {
    let bodyWidth = table.$el.clientWidth - 24
    let tableWidth = 0
    let flexColumns = []
    flexColumns = columns.filter(column => {
        if (typeof column.originWidth !== 'string') return column
    })
    for (let column of columns) {
        column.width = column.originWidth || 80
        tableWidth += parseInt(column.width)
    }
    // 宽度有富余
    if (tableWidth < bodyWidth) {
        // 富余宽度
        let flexWidth = bodyWidth - tableWidth
        let flexSpaceWidth = parseInt(flexWidth / flexColumns.length)
        flexColumns[0].width += flexWidth - flexSpaceWidth * (flexColumns.length - 1)
        for (let i = 1; i < flexColumns.length; i++) {
            flexColumns[i].width += flexSpaceWidth
        }
        table.store.updateTableWidth(bodyWidth)
    } else {
        table.store.updateTableWidth(tableWidth)
    }
    return columns
}

export {calcColumnWidth}
