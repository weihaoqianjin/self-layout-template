const routerMap = [
  {
    path: '/statistics',
    component: () => import('@/views/layout/index'),
    children: [
      {
        name: 'statistics-list',
        path: 'statistics-list',
        meta: { title: '统计列表', cached: true },
        component: () => import('@/views/statistics/statistics-list')
      }
    ]
  }
]

export default { groupName: '统计', routes: routerMap, id: 'statistics' }
