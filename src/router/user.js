const routerMap = [
  {
    path: '/user',
    component: () => import('@/views/layout/index'),
    children: [
      {
        name: 'user-list',
        path: 'user-list/:age',
        props: true,
        meta: { title: '用户列表' },
        component: () => import('@/views/user/user-list')
      }
    ]
  },
  {
    path: '/user',
    meta: { title: '运营人员' },
    component: () => import('@/views/layout/index'),
    children: [
      {
        name: 'fixer-list',
        path: 'fixer-list',
        meta: { title: '修理工列表', cached: true },
        button: [
          { prop: 'add', label: '新增' },
          { id: 'fixed-list-delete', prop: 'delete', label: '删除' }
        ],
        component: () => import('@/views/user/fixer-list')
      },
      {
        name: 'deliver-list',
        path: 'deliver-list',
        meta: { title: '配送员列表', cached: true },
        component: () => import('@/views/user/deliver-list')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('@/views/layout/index'),
    children: [
      {
        name: 'user-detail',
        path: 'user-detail',
        meta: { title: '用户详情', cached: false },
        component: () => import('@/views/user/user-detail')
      }
    ]
  }
]

export default { groupName: '用户', routes: routerMap, id: 'user' }
