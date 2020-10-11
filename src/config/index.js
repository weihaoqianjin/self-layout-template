export default {
  // 是否开放所有权限，本地开发新菜单的时候需要手动开启，
  // 否则菜单将根据登录接口的用户权限数据进行过滤
  'openAllAuth': true,
  // 是否开启http重定向至https
  'validateProtocol': process.env.NODE_ENV !== 'development'
}