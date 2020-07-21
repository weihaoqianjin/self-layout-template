<template>
    <el-select class="media-width" :size="$getComponentSize()" :placeholder="placeholder" v-model="curOption" filterable :clearable="clearable" :multiple="multiple" collapse-tags :disabled="disabled" :style="{width: width}" @clear='clear'>
        <el-option @click.native="selectOption(item)" v-for="(item, index) in selectList" :key="index" :label="item[opFormat[0]]" :value="item[opFormat[1]]"/>
    </el-select>
</template>
<script>
export default {
    name: 'hb-select',
    props: {
        options: {
            type: Array,
            default: () => []
        },
        opFormat: {
            type: Array,
            default: () => ['label', 'value']
        },
        placeholder: {
            type: String,
            default: '请输入'
        },
        multiple: Boolean,
        clearable: {
            type: Boolean,
            default: true
        },
        all: Boolean,
        disabled: Boolean,
        width: String
    },
    watch: {
        curOption: function (newValue, oldValue) {
            this.$emit('input', newValue)
            if (newValue !== null) return ''
            this.$emit('change', newValue)
        },
        options: function (newValue, oldValue) {
            this.selectList = [...this.options]
        },
        '$attrs.value': function (newValue) {
            this.curOption = newValue
        }
    },
    data () {
        return {
            curOption: this.$attrs.value,
            selectList: this.options,
            allOptions: []
        }
    },
    methods: {
        clear () {
            this.$emit('isClear')
        },
        selectOption (value) {
            if (this.multiple && this.all) {
                let v = value[this.opFormat[1]]
                let isExistAll = this.curOption.includes('全部')
                if (v === '全部') {
                    if (isExistAll) {
                        let all = [...this.curOption, ...this.allOptions]
                        let s = new Set(all)
                        this.curOption = [...s]
                    } else {
                        this.curOption = []
                    }
                } else if (isExistAll) {
                    let s = new Set(this.curOption)
                    s.delete('全部')
                    this.curOption = [...s]
                }
            }
            this.emitChange(this.curOption)
        },
        emitChange ($event) {
            if (this.multiple && this.all && $event.includes('全部')) {
                let s = new Set($event)
                s.delete('全部')
                $event = [...s]
            }
            this.$emit('input', $event)
            this.$emit('change', $event)
        }
    },
    mounted () {
        this.allOptions = this.selectList.map(i => i[this.opFormat[1]])
        if (this.multiple && this.all) {
            this.selectList.unshift({
                [this.opFormat[0]]: '全部选择',
                [this.opFormat[1]]: '全部'
            })
        }
    }
}
</script>
