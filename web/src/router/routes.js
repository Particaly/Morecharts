export default [
    {
        path: '/',
        name: 'home',
        meta: {
            title: 'home',
        },
        component: () => import('@p/Home/Home')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@p/Login/Login')
    },
    {
        path: '/personal',
        name: 'personal',
        meta: {
            encryption: true
        },
        component: () => import('@p/Personal/Personal')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
            encryption: true
        },
        component: () => import('@p/DashBoard/DashBoard'),
        children: [
            {
                path: '/dashboard/*',
                name: 'project',
                meta: {
                    encryption: true
                },
                component: () => import('@p/DashBoard/DashBoard'),
            }
        ]
    },
    {
        path: '/editor',
        name: 'editor',
        meta: {
            encryption: true
        },
        component: () => import('@p/Editor/Editor')
    }
]
