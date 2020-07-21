<template>
  <div>
    <el-date-picker
      v-model="time"
      type="daterange"
      range-separator="~"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :value-format="valueFormat"
      :default-time="['00:00:00', '23:59:59']"
      @change="change('daterange')"
      :clearable="clearable"
      :disabled="disabled"
      :size="$getComponentSize()"
      class="date-hidden"
    >
    </el-date-picker>
    <el-date-picker
      v-model="dateTime.startTime"
      type="date"
      placeholder="开始日期"
      :value-format="valueFormat"
      @change="change('startDate')"
      class="date-hiddens mr-2 mb-2 media-width"
      :size="$getComponentSize()"
    >
    </el-date-picker>
    <el-date-picker
      v-model="dateTime.endTime"
      type="date"
      placeholder="结束日期"
      :value-format="valueFormat"
      @change="change('endDate')"
      class="date-hiddens media-width"
      :size="$getComponentSize()"
    >
    </el-date-picker>
  </div>
</template>
<script>
import {format, getDay} from '@/utils/Date'
export default {
  name: 'hb-date-picker',
  props: {
    curWeek: Boolean,
    disabled: Boolean,
    curday: Boolean,
    clearable: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    '$attrs.value': {
      deep: true,
      handler (newValue, oldValue) {
        this.time = newValue
        this.setDate(newValue[0], newValue[1])
        this.change()
      }
    }
  },
  data () {
    return {
      time: this.$attrs.value,
      record: 0,
      dateTime: {
        startTime: this.$attrs.value[0] || '',
        endTime: this.$attrs.value[1] || ''
      },
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  methods: {
    change (type) {
      if (type !== 'daterange') this.dateChange(type)
      let t = (new Date()).getTime()
      let time = this.time || []
      if (t - this.record > 100) {
        this.$emit('input', time)
        this.$emit('change', time)
        this.record = (new Date()).getTime()
      }
    },
    dateChange (type) {
      if (type === 'startDate') {
        if (!this.dateTime.startTime) this.dateTime.endTime = ''
      }
      if (type === 'endDate') {
        if (!this.dateTime.startTime) {
          this.$message.error('请先选择开始日期')
          this.dateTime.endTime = ''
        }
      }
      if ((new Date(this.dateTime.startTime)).getTime() && (new Date(this.dateTime.endTime)).getTime() && (new Date(this.dateTime.startTime)).getTime() > (new Date(this.dateTime.endTime)).getTime()) {
        this.setDate()
        this.$message.error('结束日期应在开始日期之后')
      }
      this.time = [this.dateTime.startTime || '', this.dateTime.endTime || '']
    },
    setDate (start, end) {
      this.dateTime = {
        startTime: start || '',
        endTime: end || ''
      }
    }
  },
  mounted () {
    if (this.curday) {
      this.time = [new Date(), new Date()]
      this.setDate(format(new Date(), 'yyyy-MM-dd 00:00:00'), format(new Date(), 'yyyy-MM-dd 23:59:59'))
      this.$emit('input', [format(new Date(), 'yyyy-MM-dd 00:00:00'), format(new Date(), 'yyyy-MM-dd 23:59:59')])
    } else if (this.curWeek) {
      let preDate = getDay(-6) + ' 00:00:00'
      this.time = [preDate, new Date()]
      this.setDate(preDate, format(new Date(), 'yyyy-MM-dd 23:59:59'))
      this.$emit('input', [preDate, format(new Date(), 'yyyy-MM-dd 23:59:59')])
    }
  }
}
</script>
