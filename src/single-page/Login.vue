<template>
  <div class="login-bg" :style="{height: bodyHeight + 'px'}">
      <el-form label-position="left" label-width="0px" class="demo-ruleForm login-container" :class="{animated: inputNull}">
        <div>
          <div class="login-logo">
            <img src="@/assets/avatar.png" />
          </div>
        </div>
        <div class="spr-name">
          <div>欢迎登录</div>
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
          <el-form-item style="width:100%; margin: 20px 0 40px 0;">
            <hb-button class="login-bottom" @click="handleSubmit2">
              登 录
            </hb-button>
          </el-form-item>
        </div>
      </el-form>
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
        if (item.children && item.children.length) this.getAllAuthMap(item.children, map)
        if (item.button && item.button.length) this.getAllAuthMap(item.button, map)
      }
      return map
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
      const loginParams = Object.assign({}, { userName: this.ruleForm2.account, password: this.ruleForm2.checkPass, yzm: this.ruleForm2.code })
      let ret = await this.$http.cors('/self-layout/login', loginParams)
      if (ret.code === 200) {
        this.$dispatch('setUserInfo', ret.data.userInfo)
        this.$dispatch('clearVisitedViews')
        let result = await this.getMenuList(ret.data.menuAuth)
        let url = this.$state.menuGroups[0].link
        result && this.$router.push(url)
      }
    },
    // 根据idMap过滤auth tree
    filterAuthById (tree = [], idMap = {}, arr = []) {
      if (!tree.length) return []
      for (let item of tree) {
        if (!idMap[item.id]) continue
        let node = {...item, children: []}
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
    buildBtnAuthMap (tree = [], idMap = {}, parent, btnMap = {}, flag = false) {
      if (!tree.length) return []
      for (let item of tree) {
        let btnId = flag ? item.id : 0
        if (flag && idMap[btnId]) {
          btnMap[parent.name] = btnMap[parent.name] || []
          btnMap[parent.name].push(btnId)
        }
        if (item.children && item.children.length) this.buildBtnAuthMap(item.children, idMap, item, btnMap)
        if (item.button && item.button.length) this.buildBtnAuthMap(item.button, idMap, item, btnMap, true)
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
    // 过滤无权限菜单
    filterMenu (menu = [], modelMap = {}, ret = []) {
      if (!menu.length) return []
      for (let item of menu) {
        if (item.basicRouter || (item.singleNode && modelMap[item.groupId])) {
          ret.push(item)
          continue
        }
        if (item.id && modelMap[item.id] || !item.meta && !item.singleNode) {
          let node = {...item, children: []}
          if (item.children && item.children.length) this.filterMenu(item.children, modelMap, node.children)
          ret.push(node)
        }
      }
      return ret
    },
    async getMenuList (menuData = []) {
      // 建立权限菜单ID索引map
      let modelMap = {}
      menuData.map((e) => {
        modelMap[e] = 1
      })

      // 读取公共配置，是否对用户开放所有菜单权限
      if (this.$config.openAllAuth) modelMap = this.getAllAuthMap(this.$state.routerTree)
      sessionStorage.setItem('modelMap', modelMap)

      // 过滤无权限菜单项
      let routerMap = JSON.clone(this.$state.originRouterMap)
      routerMap = this.filterMenu(routerMap, modelMap)

      // 构建一级菜单组信息
      let menuGroups = JSON.clone(this.$state.originMenuGroups)
      let groupMap = {}
      for (let item of routerMap) {
        if (!item.groupName || groupMap[item.groupName]) continue
        groupMap[item.groupName] = 1
      }
      
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
      this.$dispatch('setBtnAuthMap', btnAuthMap)
      let btnAuthFlatMap = Object.values(btnAuthMap).flat()
      this.$dispatch('setBtnAuthFlatMap', btnAuthFlatMap)
      this.$dispatch('setUserAuthTree', userAuthTree)
      this.$dispatch('setRouterMap', routerMap)
      this.$dispatch('setMenuGroups', menuGroups)
      this.$dispatch('setFilterMenuGroups', menuGroups)
      this.$dispatch('setFilterRouterMap', routerMap)
      // 一级菜单组索引map
      let menuGroupIndexMap = {}
      menuGroups.map((item, index) => {
        menuGroupIndexMap[item.groupName] = index
      })
      this.$dispatch('setMenuGroupIndexMap', (menuGroupIndexMap))
      // 构建权限菜单索引map，用于路由导航判断用户页面权限
      let routerModelMap = this.buildAuthMap(routerMap)
      routerModelMap = this.buildHiddenMenu(this.$state.originRouterMap, JSON.clone(routerModelMap))
      this.$dispatch('setRouterModelMap', routerModelMap)
      return true
    }
  },
  mounted () {
    sessionStorage.clear()
    this.bodyHeight = document.documentElement.clientHeight
  }
}
</script>

<style lang="scss" scoped>
  @import "../style/login.scss";
</style>
