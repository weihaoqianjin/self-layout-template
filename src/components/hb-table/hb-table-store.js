export default class HbTableStore {
    constructor (tableId) {
        this.storeId = 'store-' + tableId
        this.columns = []
        this.columnLabelMap = {}
        this.realTableWidth = 0
    }
    insertColumn (column) {
        this.columns.push(column)
        this.columnLabelMap[column.columnId] = column.label
    }
    getColumns () {
        return this.columns
    }
    updateTableWidth (width) {
        this.realTableWidth = width
    }
    getTableWidth () {
        return this.realTableWidth
    }
}
