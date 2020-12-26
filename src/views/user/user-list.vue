<template>
  <panel class="admin-list" pb0>
    <data-list :data="dataList" @current-change="refresh">
      <el-form slot="header" inline>
        <el-form-item label="用户名称：">
          <hb-input v-model="dataList.params.name"/>
        </el-form-item>
        <el-form-item label="添加时间：">
          <hb-date-picker v-model="time"></hb-date-picker>
        </el-form-item>
        <el-form-item>
          <hb-button type="warning" @click="refresh">查询</hb-button>
        </el-form-item>
      </el-form>
      <el-table-column label="账号" prop="account"/>
      <el-table-column label="用户名称" prop="name" />
      <el-table-column label="手机号" prop="mobile"/>
      <el-table-column label="角色" prop="roleName"/>
      <el-table-column label="添加时间" prop="time"/>
      <el-table-column label="操作">
        <template>
          <hb-button type="text" @click="jump('/user/user-detail')">查看</hb-button>
        </template>
      </el-table-column>
    </data-list>
  </panel>
</template>
<script>
import commonMix from '@/mixins/common'
export default {
  name: 'user-list',
  mixins: [commonMix],
  data () {
    return {
      time: [],
      dataList: {
        items: [],
        count: 0,
        params: {
          currentPage: 1,
          time: [],
          size: 15
        }
      }
    }
  },
  methods: {
    async refresh () { // 查询
      let params = JSON.clone(this.dataList.params)
      params.startTime = this.time[0] || ''
      params.endTime = this.time[1] || ''
      params.pageSize = params.size
      let res = await this.$http.cors('/self-layout/userlist', params)
      if (res.code === 200) {
        this.dataList.items = res.data.list
        this.dataList.count = res.data.page.total
      }
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
