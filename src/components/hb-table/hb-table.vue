<template>
    <div class="hb-table"
        :class="[{
            'hb-table--border': border
        }]"
        :style="tableStyle">
        <!-- 隐藏列 -->
        <div class="hidden-columns"><slot></slot></div>
        <div class="pos-relative">
            <div class="headWrapper" :ref="headRef">
                <hb-table-head class="hb-table-head" :store="store"></hb-table-head>
            </div>
            <!-- 遮挡竖直滚动条 -->
            <div class="hiddenBlock"></div>
        </div>
        <div v-loading="loadingFlag" class="pos-relative" :class="textAlign">
            <div :style="bodyWrapperStyle" class="bodyWrapper" :ref="bodyRef" @scroll="handleScroll">
                <hb-table-body :store="store"></hb-table-body>
            </div>
            <div class="noData flex-midcenter" v-show="!data.length">暂无数据</div>
        </div>
    </div>
</template>
<script>
import HbTableStore from './hb-table-store'
import HbTableHead from './hb-table-head'
import HbTableBody from './hb-table-body'
import {calcColumnWidth} from './utils'
let tableIdSeed = 0
export default {
    name: 'hb-table',
    data () {
        return {
            store: null,
            curPage: 1,
            allPages: 0,
            bodyWrapperStyle: {
                height: this.height,
                'text-align': this.align,
                overflow: 'auto'
            },
            loadingFlag: true,
            tableStyle: {
                width: this.width
            },
            fixedHeight: 1,
            tableData: []
        }
    },
    components: {HbTableHead, HbTableBody},
    computed: {
        tableId () {
            return 'tableId-' + (tableIdSeed++)
        },
        bodyRef () {
            return 'tableBody-' + tableIdSeed
        },
        tBody () {
            return this.$refs[this.bodyRef]
        },
        headRef () {
            return 'tableHead-' + tableIdSeed
        },
        tHead () {
            return this.$refs[this.headRef]
        },
        'textAlign' () {
            return 'align-' + this.align
        }
    },
    props: {
        data: {
            type: Array,
            default () {
                return []
            }
        },
        width: {
            type: String,
            default: '100%'
        },
        total: {
            type: [Number, String],
            default: 0
        },
        align: {
            type: String,
            default: 'center'
        },
        height: {
            type: String,
            default: '300px'
        },
        border: Boolean,
        currentPage: {
            type: Number,
            default: 1
        }
    },
    methods: {
        initData () {
            this.curPage = 1
            this.tableData = []
            this.allPages = Math.ceil(parseInt(this.total) / this.data.length)
            this.tBody.scrollTop = 0
        },
        handleScroll (e) {
            this.tHead.scrollLeft = this.tBody.scrollLeft
            // fixedHeight修正由水平滚动条带来的高度计算误差
            if ((this.tBody.scrollTop + this.tBody.clientHeight + this.fixedHeight >= this.tBody.scrollHeight) && (this.curPage < this.allPages)) {
                this.loadingFlag = true
                this.$emit('loadMore', ++this.curPage)
            }
        },
        doLayout () {
            calcColumnWidth(this.store.columns, this)
        }
    },
    watch: {
        data: {
            deep: true,
            handler (n, o) {
                this.loadingFlag = false
                if (this.currentPage === 1) {
                    this.initData()
                }
                this.tableData = [...this.tableData, ...n]
            }
        }
    },
    created () {
        let store = new HbTableStore(this.tableId)
        this.store = store
    },
    mounted () {
        if (!this.data.length) {
            this.loadingFlag = false
        }
        let self = this
        self.doLayout()
        window.addEventListener('resize', function () {
            self.doLayout()
        })
    }
}
</script>
<style lang="scss">
    $border: 1px solid #EBEEF5;
    $head-bg: #f4f4f4;
    .hb-table {
        width: 100%;
        color: #606266;
        text-align: center;
        .hidden-columns {display: none}
        .headWrapper {overflow: hidden scroll;}
        .hiddenBlock {
            position: absolute;
            background: $head-bg;
            width: 25px;
            height: calc(100% - 1px);
            top: 0;
            right: 0;
            border-bottom: $border;
        }
        .bodyWrapper {
            position: relative;
            border-bottom: $border;
            .mask {
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 50%;
                top: 0;
                left: 0
            }
        }
        .hb-table-head {
            border-bottom: $border;
            color: #909399;
            background: $head-bg;
            tr td {padding: 12px 0}
            // width: calc(100% - 19px)
        }
        .hb-table-body__td {
            padding: 12px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 23px;
            border-bottom: $border;
            font-size: 14px;
        }
        .noData {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
    .hb-table--border {
        table tr {
            td, th {border-left: $border}
        }
    }
</style>
