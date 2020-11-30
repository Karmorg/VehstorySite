import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import profile_page from '../views/Profile Page'
import Admin from "@/views/Admin";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register

  },
  {
    path: '/Profilepage',
    name: 'Profile page',
    component: profile_page

  }
  ,
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin

  }
]

const router = new VueRouter({
  routes
})

export default router
