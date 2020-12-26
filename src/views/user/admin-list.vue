<template>
  <panel class="admin-list" pb0>
    <data-list :data="dataList" @current-change="refresh">
      <el-form slot="header" inline>
        <el-form-item label="管理员名称：">
          <hb-input v-model="dataList.params.recordName"/>
        </el-form-item>
        <el-form-item label="手机号：">
          <hb-input v-model="dataList.params.phone" />
        </el-form-item>
        <el-form-item label="添加时间：">
          <hb-date-picker v-model="time"></hb-date-picker>
        </el-form-item>
        <el-form-item>
          <hb-button type="warning" @click="refresh">查询</hb-button>
        </el-form-item>
        <el-form-item>
          <hb-button type="warning" @click="add()">新增</hb-button>
        </el-form-item>
      </el-form>
      <el-table-column label="账号" prop="userName"/>
      <el-table-column label="管理员名称" prop="recordName"></el-table-column>
      <el-table-column label="手机号" prop="mobile"/>
      <el-table-column label="角色" prop="roleName"/>
      <el-table-column label="管理员类型" prop="administratorTypeDesc"/>
      <el-table-column label="添加时间" prop="createTimeStr"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="flex-betmiddle">
            <hb-button type="text" @click="edit(scope.row)">编辑</hb-button>
            <hb-button type="text" @click="manageRange(scope.row)">管理范围</hb-button>
            <hb-switch class="ml-1" v-model="scope.row.status" @click.native.capture.stop="switchStatus(scope.row)" active-text="有效" inactive-text="无效"></hb-switch>
          </div>
        </template>
      </el-table-column>
    </data-list>
  </panel>
</template>
<script>
import commonMix from '@/mixins/common'
export default {
  name: 'admin-list',
  mixins: [commonMix],
  data () {
    return {
      time: [],
      dataList: {
        items: [],
        count: 0,
        params: {
          currentPage: 1,
          phone: '',
          recordName: '',
          size: 15
        }
      }
    }
  },
  methods: {
    async switchStatus (row) {
      let content = `是否将账户状态变为${row.status ? '无效' : '有效'}`
      let ret = await this.$dialog.Confirm({title: '账户状态', content: content})
      if (ret) {
        let isLock = row.status ? 1 : 0
        let ret1 = await this.$http.cors('/backendapi/administrator/administrator-change-enable.cgi', {
          adminId: this.$state.sesAdminId(),
          recordId: row.id,
          isLock: isLock
        })
        if (ret1.code !== 0) return
        this.$message.success('操作成功')
        this.refresh()
      }
    },
    async add () {
      let ret = await this.$dialog.AdminAccountAdd()
      if (ret) {
        this.refresh()
        this.$message.success('添加成功')
      }
    },
    manageRange (row) {
      if (row.managementType === 3) return this.jump('/user/distribute-cabinet?adminId=' + row.id)
      this.jump({
        path: '/user/manage-range',
        query: {
          adminId: row.id,
          managementType: row.managementType
        }
      })
    },
    allotCabinet (row) {
      this.jump({
        path: '/user/distribute-cabinet',
        query: {
          adminId: row.id
        }
      })
    },
    // 添加编辑按钮
    async edit (row) {
      let ret = await this.$dialog.UserAdminList({recordId: row.id})
      ret && this.refresh()
    },
    async refresh () { // 查询
      let params = JSON.clone(this.dataList.params)
      params.adminId = this.userInfo.adminId
      params.startTime = this.time[0] || ''
      params.endTime = this.time[1] || ''
      params.pageSize = params.size
      let res = await this.$http.cors('/backendapi/administrator/administrator-list.cgi', params)
      if (res.code === 0) {
        this.dataList.items = res.adminPageData.list.map((item) => {
          return {
            status: !item.isLock,
            ...item
          }
        })
        this.dataList.count = res.adminPageData.page.total
      }
    }
  },
  mounted () {
    this.userInfo = this.$state.sesUserInfo()
    this.refresh()
  }
}
</script>
