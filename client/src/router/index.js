import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Obzor',
        component: () => import("../components/pages/Main.vue"),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../components/Login.vue"),
    },
    {
        path: '/prognoz',
        name: 'Prognoz',
        component: () => import("../components/pages/Prognoz.vue"),
    },
    {
        path: '/uchet',
        name: 'Uchet',
        component: () => import("../components/pages/Uchet.vue"),
    },
    {
        path: '/tranzaksiya',
        name: 'Tranzaksiya',
        component: () => import("../components/pages/Tranzaksiya.vue"),
    },
    {
        path: '/udachi',
        name: 'Udachi',
        component: () => import("../components/pages/Udachi.vue"),
    },
    {
        path: '/doxod',
        name: 'Doxod',
        component: () => import("../components/pages/Doxod.vue"),
    },
    {
        path: '/:pathMach(.*)*',
        name: 'NotFound',
        component: () => import("../components/NotFound.vue"),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    if (authRequired && !loggedIn) {
        next('/login');
    } else if (to.path === '/login' && loggedIn) {
        next('/');
    } else {
        next();
    }
});

export default router 
