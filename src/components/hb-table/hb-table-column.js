let columnIdSeed = 0
export default {
    name: 'hb-table-column',
    computed: {
        tableColumnId () {
            return 'columnId-' + (columnIdSeed++)
        },
        table () {
            return this.$parent
        }
    },
    props: {
        label: String,
        prop: String,
        width: String,
        align: String,
        type: String,
        formatter: Function
    },
    methods: {
        renderCell (data, column, index) {
            let curIndex = index + 1
            if (this.type === 'index') {
                return curIndex
            }
            if (this.prop) {
                let content = column.formatter ? column.formatter(data, column) : data[this.prop]
                return content
            }
            return this.$scopedSlots.default({
                $index: curIndex,
                row: data
            })
        }
    },
    created () {
        let column = {
            tableId: this.table.tableId,
            columnId: this.tableColumnId,
            label: this.label,
            prop: this.prop,
            originWidth: this.width,
            width: 0,
            slots: this.$slots.default,
            align: this.align,
            renderCell: this.renderCell,
            type: this.type,
            formatter: this.formatter,
            property: this.prop
        }
        this.table.store.insertColumn(column)
    },
    render (h) {
        return h('div', this.$slots.default)
    }
}
