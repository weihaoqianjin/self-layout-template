<template>
    <el-button :size="$getComponentSize()" :type="type" @click="debounce" :style="{'width': width}" :disabled="disabled"><slot/></el-button>
</template>
<script>
export default {
    name: 'hb-button',
    props: {
        type: {
            type: String,
            default: 'warning'
        },
        time: {
            type: Number,
            default: 400
        },
        tip: String,
        width: String,
        disabled: Boolean
    },
    data () {
        return {
            record: 0
        }
    },
    methods: {
        async debounce () {
            let newTime = new Date()
            if (newTime.getTime() - this.record > this.time) {
                // 按钮点击后弹出确认提示框
                if (this.tip) {
                    let con = await this.$dialog.Confirm({content: this.tip})
                    if (!con) return false
                }
                this.$emit('click')
            }
            this.record = (new Date()).getTime()
        }
    }
}
</script>
