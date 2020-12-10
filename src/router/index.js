import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profilepage from "@/views/Profilepage";
import Admin from "@/views/Admin";
import TeenusteValimine from "@/views/TeenusteValimine";
import Dashboard from "@/views/Dashboard";
import Ajalugu from "../views/Ajalugu";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Profilepage',
    name: 'Profilepage',
    component: Profilepage
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: function () {
    //   return import(/* webpackChunkName: "about" */ '../views/Register.vue')
    // }
  }
  ,
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin

  } ,
  {
    path: '/TeenusteValimine',
    name: 'TeenusteValimine',
    component: TeenusteValimine

  },
  {
    path: '/Ajalugu',
    name: 'Ajalugu',
    component: Ajalugu

  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard

  }
]

const router = new VueRouter({
  routes
})

export default router
