import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import("../components/Home.vue"),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../components/Login.vue"),
    },
    {
        path: '/:pathMach(.*)*',
        name: 'NotFound',
        component: () => import("../components/NotFound.vue"),
    }
]

const router = createRouter({
    history: createWebHistory(), routes,

})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router 
