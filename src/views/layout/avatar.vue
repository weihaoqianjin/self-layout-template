<template>
  <div class="navbar__avatar flex-middle">
      <el-dropdown trigger="click">
        <div class="navbar__avatar__user">
          <img src="@/assets/avatar.png"/>
          <div class="hidden-img">{{sysUserName}}</div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>
<script>
export default {
  name: 'avatar',
  computed: {
    sysUserName () {
      return this.$state.sesUserInfo().name || ''
    }
  },
  methods: {
    async logout () {
      try {
        let ret = await this.$dialog.Confirm({content: '确认退出吗?'})
        if (!ret) return
        sessionStorage.removeItem('userInfo')
        sessionStorage.removeItem('userAuthTree')
        sessionStorage.removeItem('visitedViews')
        sessionStorage.removeItem('visitedFullPaths')
       
        this.$dispatch('switchMenuGroup', 1)
        this.$dispatch('setCurGroupIndex', 1)
        this.jump('/login')
      } catch (e) {}
    }
  }
}
</script>
<style lang="scss" scoped>
 .navbar__avatar {
   .message {
     position: relative;
     .messageNum {
       margin-right: 20px;
       width: 22px;
       height: 18px;
       border-radius: 40%;
       border: 1px white solid;
       background: #ff4008;
       color: white;
       font-size: 9px;
       position: absolute;
       display: flex;
       justify-content: center;
       align-items: center;
       right: -9px;
       top: -4px;
     }
     .messageImg {
      width: 28px;
      height: 28px;
      margin-right: 20px;
      @media screen and(max-width: 1300px) {
        margin-right: 0px;
      }
    }
   }
 }
 @media (max-width: 480px) {
    .hidden-img {display: none;}
    .avatar-fixed {margin: 0 0 0 10px !important;}
  }
</style>