<template>
    <el-input class="media-width" :size="$getComponentSize()" v-model.trim="inputValue" @blur="$emit('blur', $event)" :rows="rows" @input="$emit('input', $event),$emit('change', $event)" :type="type" :placeholder="placeholder" :clearable="clearable" :disabled="disabled" :show-word-limit="showWordLimit" :style="'width:'+width" :maxlength="maxlength">
        <i v-if="suffix" slot="suffix" class="el-input__icon el-icon-search cursor-pointer" @click="$emit('search', inputValue)"></i>
    </el-input>
</template>
<script>
export default {
    watch: {
        $attrs: {
            deep: true,
            handler (n, o) {
                this.inputValue = this.$attrs.value
            }
        }
    },
    name: 'hb-input',
    data () {
        return {
            inputValue: this.$attrs.value,
            size: null
        }
    },
    props: {
        placeholder: {
            type: String,
            default: '请输入'
        },
        type: {
            type: String,
            default: 'text'
        },
        showWordLimit: Boolean,
        disabled: Boolean,
        width: String,
        suffix: Boolean,
        clearable: {
            type: Boolean,
            default: true
        },
        maxlength: {
            type: [Number, String],
            default: 24
        },
        rows: {
            type: [Number, String],
            default: 2
        }
    }
}
</script>