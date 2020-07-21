<template>
    <el-input-number class="media-width" v-model="inputValue" :min="min" :max="max" :precision="precision" :disabled="disabled" :style="'width:'+width" @input="$emit('input', $event)" :size="$getComponentSize()" @change="handleChange"></el-input-number>
</template>
<script>
export default {
    watch: {
        '$attrs.value': {
            handler (n, o) {
                this.inputValue = this.$attrs.value
            }
        }
    },
    name: 'hb-input-number',
    data () {
        return {
            inputValue: this.$attrs.value
        }
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        width: String,
        min: {
            type: Number,
            default: 0
        },
        precision: {
            type: Number,
            default: 2
        },
        size: {
            type: String
        },
        max: Number
    },
    methods: {
        handleChange () {
            this.$emit('change')
        }
    }
}
</script>
