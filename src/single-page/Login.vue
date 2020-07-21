<template>
  <div class="login-bg" :style="{height: bodyHeight + 'px'}">
      <el-form label-position="left" label-width="0px" class="demo-ruleForm login-container" :class="{animated: inputNull}">
        <div>
          <div class="login-logo">
            <img src="https://fgh5s.oss-cn-hangzhou.aliyuncs.com/boss/perfect/logo.png" />
          </div>
        </div>
        <div class="spr-name">
          <div>欢迎登录SRP</div>
          <span>V1.0.12</span>
        </div>
        <div class="form-area">
          <div class="form-line" prop="account">
            <div class="from-title">
              <img src="https://fgh5s.oss-cn-hangzhou.aliyuncs.com/boss/perfect/account.png">
            </div>
            <input type="text" v-model="ruleForm2.account" ref="account">
          </div>
          <div class="form-line" prop="checkPass">
            <div class="from-title">
              <img src="https://fgh5s.oss-cn-hangzhou.aliyuncs.com/boss/perfect/check-pass.png">
            </div>
            <input type="password" v-model="ruleForm2.checkPass" ref="password">
          </div>
          <div style="position:relative;padding-right: 110px;" class="form-line" prop="code">
            <div class="from-title">
              <img src="https://fgh5s.oss-cn-hangzhou.aliyuncs.com/boss/perfect/login-code.png">
            </div>
            <input type="text" v-model="ruleForm2.code" class="code-box" ref="code">
            <img v-on:click="changeCode" class="code-image">
          </div>
          <el-form-item style="width:100%; margin: 20px 0 40px 0;">
            <hb-button class="login-bottom" @click="handleSubmit2">
              登 录
            </hb-button>
          </el-form-item>
        </div>
      </el-form>
    <div class='beian'>备案号：蜀ICP备17035588号-1   Copyright©2016-2020 福柜科技 版权所有</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm2: {
        account: '',
        checkPass: ''
      },
      imageData: '',
      inputNull: false,
      errorText: ' ',
      bodyHeight: 0
    }
  },
  methods: {
    getAllAuthMap (menu = [], map = {}) {
      if (!menu.length) return
      for (let item of menu) {
        if (item.id) map[item.id] = 1
        if (item.children) this.getAllAuthMap(item.children, map)
      }
      return map
    },
    getVcodeData () {
      this.imageData = '/backendapi/code.cci?_' + (new Date()).getTime()
    },
    changeCode () {
      this.getVcodeData()
    },
    errorAlert (text, dom) {
        this.$refs[dom].focus()
        this.$message.error(text)
        this.inputNull = true
        setTimeout(() => {
          this.inputNull = false
        }, 1000)
    },
    async handleSubmit2 (ev) {
      if (!this.ruleForm2.account) return this.errorAlert('请输入用户名', 'account')
      if (!this.ruleForm2.checkPass) return this.errorAlert('请输入密码', 'password')
      if (!this.ruleForm2.code) return this.errorAlert('请输入验证码', 'code')
      // const loginParams = Object.assign({}, { userName: this.ruleForm2.account, password: this.ruleForm2.checkPass, yzm: this.ruleForm2.code })
      // let ret = await this.$http.cors('/backendapi/admin/admin-user-login.cgi', loginParams)
      let ret = {"@type":"com.fook.prepose.application.dto.AdminDTO","code":0,"message":"成功","resultList":{"groupId":1,"phone":"18551067481","adminId":242,"accountType":8,"userName":"zhangyoujun","realName":"洋玩意","managementType":8,"isLock":false},"roleResult":{"0":"[\"home\",\"user\",\"user:user-list\",\"user:brand-list\",\"user:agent-list\",\"user:admin-list\",\"user:role-manage\",\"device\",\"device:device-list\",\"device:point-list\",\"product\",\"product:sku-list-manage\",\"product:sku-list\",\"product:price-setting\",\"product:price-setting:set-record\",\"operate\",\"operate:supplier-manage\",\"operate:supplier-recording\",\"operate:supplier-manage:supplier-details\",\"operate:supplier-manage:supplier-template-edit\",\"operate:inventor-manage\",\"operate:inventor-manage:inventor-record\",\"operate:inventor-manage:inventor-detail-list\",\"operate:stock-manage\",\"operate:stock-manage:reserve-adjust\",\"operate:stock-manage:reserve-adjust-record\",\"order\",\"order:order-list\",\"order:order-pay-record\",\"order:order-detail-list\",\"order:corrective-manage\",\"order:corrective-manage:corrective-action\",\"statistic\",\"statistic:sale-statistic\",\"message\",\"message:all-message\",\"message:already-read-message\",\"message:no-read-message\",\"system\",\"system:sys-account\",\"order:error-receive-order\",\"device:putin-apply\",\"device:rebacked-list\",\"device:rebacked-device\",\"device:putin-audit\",\"device:device-cost-setting\",\"device:device-cost-setting-record\",\"finance:cabinet-finance\",\"finance:cabinet-finance:device-account-list\",\"finance:cabinet-finance:recharge-record\",\"finance:cabinet-finance:expenses-record\",\"finance:cabinet-finance:offline-recharge\",\"device:download-list\",\"other\",\"device:distributed-list\",\"device:device-operation-record\"]","1":"[\"user:brand-list:add\",\"user:brand-list:edit\",\"user:brand-list:switch\",\"device:device-list:distribute\",\"device:device-list:export\",\"device:device-list:operate\",\"device:device-list:maintain\",\"device:device-list:fast-operate\",\"device:device-list:fast-maintain\",\"device:point-list:export\",\"product:sku-list-manage:detail\",\"operate:supplier-recording:export\",\"operate:supplier-manage:supplier-details:export\",\"operate:supplier-manage:supplier-template-edit:add\",\"operate:supplier-manage:supplier-template-edit:edit\",\"operate:supplier-manage:supplier-template-edit:delete\",\"operate:inventor-manage:inventor-record:export\",\"operate:inventor-manage:inventor-detail-list:export\",\"operate:stock-manage:reserve-adjust-record:export\",\"order:order-list:export\",\"order:order-pay-record:export\",\"order:order-detail-list:export\",\"order:error-receive-order:export\",\"device:putin-apply:multi-apply\",\"device:putin-apply:apply\",\"device:rebacked-list:recall\",\"device:rebacked-device:multi-apply\",\"device:rebacked-device:apply\",\"device:device-cost-setting:multi-setting\",\"device:device-cost-setting:pay-setting\",\"finance:cabinet-finance:device-account-list:account-clear\",\"finance:cabinet-finance:offline-recharge:offline-recharge-btn\",\"other:test-open\"]"},"timeStamp":1587025606096}
      if (ret.code === 0) {
        this.$dispatch('setUserInfo', JSON.stringify(ret.resultList))
        let roleResult = [...JSON.parse(ret.roleResult[0] || '[]'), ...JSON.parse(ret.roleResult[1] || '[]')]
        this.$dispatch('clearVisitedViews')
        let mRet = await this.getMenuList(roleResult, ret.dataRole || [])
        let url = this.$state.menuGroups[0].link
        mRet && this.$router.push(url)
      } else {
        this.getVcodeData()
      }
    },
    // 根据idMap过滤auth tree
    filterAuthById (tree = [], idMap, arr = []) {
      if (!tree.length) return []
      for (let item of tree) {
        if (!idMap[item.id]) continue
        let node = {}
        node = {id: item.id, ...item, children: []}
        arr.push(node)
        if (item.children && item.children.length) this.filterAuthById(item.children, idMap, node.children)
      }
      return arr
    },
    // build Auth Map
    buildAuthMap (tree = [], map = {}) {
      if (!tree.length) return []
      for (let item of tree) {
        item.name && (map[item.name] = 1)
        if (item.children && item.children.length) this.buildAuthMap(item.children, map)
      }
      return map
    },
    // build Button Auth Map
    buildBtnAuthMap (tree = [], idMap = {}, parent, btnMap = {}) {
      if (!tree.length) return []
      for (let item of tree) {
        let btnId = item.menuId ? (item.id) : 0
        if (idMap[btnId]) {
          btnMap[parent.name] = btnMap[parent.name] || []
          btnMap[parent.name].push(item.prop)
        }
        if (item.children && item.children.length) this.buildBtnAuthMap(item.children, idMap, item, btnMap)
      }
      return btnMap
    },
    // Auth Map 追加隐藏菜单
    buildHiddenMenu (map = [], authMap = {}, temp = JSON.clone(authMap)) {
      for (let item of map) {
        if (item.name && item.hidden) temp[item.name] = 1
        if (item.children && item.children.length) this.buildHiddenMenu(item.children, authMap, temp)
      }
      return temp
    },
    async getMenuList (menuData = [], dataAuth = []) {
      // 建立权限菜单ID索引
      let modelMap = {}
      menuData.map((e) => {
        modelMap[e] = 1
      })
      // 开启所有权限
      modelMap = this.getAllAuthMap(this.$state.routerTree)
      sessionStorage.setItem('modelMap', JSON.stringify(modelMap))
      // 过滤无权限菜单项
      let routerMap = JSON.clone(this.$state.originRouterMap)
      // routerMap = routerMap.filter(item => {
      //   if (!item.children) return true
      //   item.children = item.children.filter(i => {
      //     if (item.singleNode) return modelMap[item.groupId]
      //     return modelMap[i.id]
      //   })
      //   return item.children.length
      // })
      // 构建一级菜单组信息
      let menuGroups = JSON.clone(this.$state.originMenuGroups)
      let groupMap = {}
      routerMap.map(item => {
        if (!item.groupName) return false
        for (let i = 0; i < item.children.length; i++) {
          if (groupMap[item.groupName]) break
          if (!item.children[i].hidden || item.singleNode) groupMap[item.groupName] = 1
        }
      })
      
      menuGroups = menuGroups.filter(item => groupMap[item.groupName])
      // 覆盖初始一级菜单绑定路由地址
      let firstMenuBindLinkMap = {}
      routerMap.map(item => {
        if (item.groupName && !firstMenuBindLinkMap[item.groupName]) {
          firstMenuBindLinkMap[item.groupName] = `${item.path}/${item.children[0].path}`
        }
      })
      menuGroups = menuGroups.map(item => {
        return {
          ...item,
          link: firstMenuBindLinkMap[item.groupName]
        }
      })
      // 构建当前用户权限树，用于分配子用户权限
      let userAuthTree = JSON.clone(this.$state.routerTree)
      userAuthTree = this.filterAuthById(userAuthTree, modelMap)
      // 按钮权限映射表
      let btnAuthMap = this.buildBtnAuthMap(JSON.clone(this.$state.routerTree), modelMap)
      this.$dispatch('setBtnAuthMap', JSON.stringify(btnAuthMap))
      this.$dispatch('setUserAuthTree', JSON.stringify(userAuthTree))
      this.$dispatch('setCabinetList', JSON.stringify(dataAuth))
      this.$dispatch('setRouterMap', routerMap)
      this.$dispatch('setMenuGroups', menuGroups)
      this.$dispatch('setFilterMenuGroups', JSON.stringify(menuGroups))
      this.$dispatch('setFilterRouterMap', JSON.stringify(routerMap))
      // 一级菜单组索引map
      let menuGroupIndexMap = {}
      menuGroups.map((item, index) => {
        menuGroupIndexMap[item.groupName] = index
      })
      this.$dispatch('setMenuGroupIndexMap', (JSON.stringify(menuGroupIndexMap)))
      // 构建权限菜单索引map，用于路由导航判断用户页面权限
      let routerModelMap = this.buildAuthMap(routerMap)
      routerModelMap = this.buildHiddenMenu(this.$state.originRouterMap, JSON.clone(routerModelMap))
      this.$dispatch('setRouterModelMap', JSON.stringify(routerModelMap))
      return menuData
    }
  },
  mounted () {
    sessionStorage.clear()
    // if (sessionStorage.agentUser) sessionStorage.removeItem('agentUser')
    // if (sessionStorage.token) sessionStorage.removeItem('token')
    this.getVcodeData()
    this.bodyHeight = document.documentElement.clientHeight
  }
}

</script>

<style lang="scss" scoped>
  @import "../style/login.scss";
</style>
