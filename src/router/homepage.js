const routerMap = [
    {
      path: '/homepage',
      component: () => import('@/views/layout/index'),
      children: [
        {
          name: 'index',
          path: 'index',
          meta: { title: '首页'},
          component: () => import('@/views/homepage/index'),
          hidden: true
        }
      ]
    }
  ]

  export default { groupName: '首页', routes: routerMap, singleNode: true, id: 'home' }
