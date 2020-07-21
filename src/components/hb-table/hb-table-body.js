export default {
    name: 'hb-table-body',
    computed: {
        table () {
            return this.$parent
        }
    },
    props: {
        store: {
            require: true
        }
    },
    methods: {
        getBodyCellStyle (column) {
            return {
                width: column.width + 'px',
                'text-align': column.align
            }
        }
    },
    render (h) {
        let tableData = this.table.tableData
        let columns = this.store.getColumns()
        let tableWidth = this.store.getTableWidth()
        return (
            <table cellspacing="0" border='0' cellpadding="0" style={{width: tableWidth + 'px'}}>
                {tableData.map((row, index) =>
                    <tr>
                        {columns.map(column => <td class="hb-table-body__td" style={this.getBodyCellStyle(column)}>
                            <div class="pl-2 pr-2">{column.renderCell(row, column, index)}</div>
                        </td>)}
                    </tr>)
                }
            </table>
        )
    }
}
