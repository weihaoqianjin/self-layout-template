export default {
    name: 'hb-table-head',
    data () {
        return {
            columns: []
        }
    },
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
        getHeaderCellStyle (column) {
            return {
                width: column.width + 'px'
            }
        }
    },
    created () {
        this.columns = this.store.getColumns()
    },
    render (h) {
        let columns = this.store.getColumns()
        let tableWidth = this.store.getTableWidth()
        return (
            <table cellspacing="0" border='0' cellpadding="0" style={{width: tableWidth + 'px'}}>
                <tr>
                    {columns.map(column => <td style={this.getHeaderCellStyle(column)}>{column.label}</td>)}
                </tr>
            </table>
        )
    }
}
