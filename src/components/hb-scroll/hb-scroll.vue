<template>
    <el-row :style="{width: width}">
        <div :ref="ref" :style="{'max-height': height}" class="list" @scroll='scroll'>
            <div v-for="(item, key) in data" :key="key">
                <el-row class="mb-2"><slot :item="item" /></el-row>
            </div>
            <div v-if="noMore" class="noMore">没有更多了</div>
            <div v-if="!data.length && !loading" class="noMore">暂无数据</div>
        </div>
        <span class="el-loading-spinner flex-midcenter fixed" v-show="loading">
            <span>{{loadingText}}</span>
            <svg viewBox="25 25 50 50" class="circular">
                <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
            </svg>
        </span>
    </el-row>
</template>
<script>
export default {
    name: 'hb-scroll',
    watch: {
        'dataList': {
            deep: true,
            handler (n) {
                if (this.currentPage === 1) this.initScrollData()
                this.data = [...this.data, ...JSON.clone(n)]
                this.loading = false
                this.pages || this.calCount()
                this.$nextTick(function () {
                    if (this.curPage === 1) return false
                    this.scrollBar.scrollTop += this.subElementHeight * this.num
                })
                if (this.curPage === this.pages) this.noMore = true
            }
        },
        loading (n) {
            this.scrollBar.onmousewheel = function () { return !n }
        }
    },
    data () {
        return {
            data: [],
            scrollBar: {},
            ref: (new Date()).getTime(),
            loading: true,
            curPage: 1,
            pages: 0,
            subElementHeight: 0,
            num: 2,
            noMore: false
        }
    },
    props: {
        dataList: {
            type: Array,
            default () {
                return []
            }
        },
        loadingText: {
            type: String,
            default: '数据加载中'
        },
        count: {
            type: Number,
            default: 0
        },
        width: {
            type: String,
            default: 'auto'
        },
        height: {
            type: String,
            default: '300px'
        },
        currentPage: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 0
        }
    },
    methods: {
        initScrollData () {
            this.data = []
            this.noMore = false
            this.curPage = 1
            this.loading = false
            this.pages = 0
            this.scrollBar.scrollTop = 0
            this.calCount()
        },
        scroll (e) {
            this.subElementHeight = this.subElementHeight || (this.scrollBar.childNodes[0].clientHeight + this.scrollBar.childNodes[0].offsetHeight)
            if ((this.scrollBar.scrollTop + this.scrollBar.clientHeight >= this.scrollBar.scrollHeight) && !this.loading && (this.curPage < this.pages)) {
                this.$emit('loadData', ++this.curPage)
                this.loading = true
            }
        },
        calCount () {
            this.pages = Math.ceil(this.total / this.dataList.length)
        }
    },
    mounted () {
        this.data = this.dataList.length ? JSON.clone(this.dataList) : []
        this.loading = !this.data.length
        this.scrollBar = this.$refs[this.ref]
    }
}
</script>
<style lang="scss" scoped>
    .list {
        overflow-y: auto;
    }
    .fixed {
        margin: 0;
        color: #409eff;
        height: 42px;
        top: calc(100% - 20px);
    }
    .noMore {
        color: #409eff;
        text-align: center
    }
</style>
