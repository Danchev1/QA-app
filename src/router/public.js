import Vue from 'vue'
import Router from 'vue-router'
import { API_APPS, ROUTER_MODE } from '@/api/config'
import LoginComponent from '@/components/auth/LoginComponent'
import StartView from '@/views/public/StartView'
import ThankYouView from '@/views/public/ThankYouView'
import ApplicationView from '@/components/application/ApplicationView'
import AuthUser from '@/classes/auth/AuthUser'
import ConfirmationForm from '@/components/confirmation/ConfirmationForm'
Vue.use(Router)

const routes = [
  {path: '/', name: 'StartView', component: StartView, meta: {requiresAuth: false}},
  {path: '/login', name: 'LoginComponent', component: LoginComponent, meta: {requiresAuth: false}},
  {path: '/account/confirm/:code', name: 'ConfirmationForm', component: ConfirmationForm, props: true, meta: {requiresAuth: false}},
  {path: '/application/thank-you', name: 'ThankYouView', component: ThankYouView, meta: {requiresAuth: false}},
  {path: '/application/:code', name: 'ApplicationView', component: ApplicationView, props: true, meta: {requiresAuth: false}},
  {path: '*', redirect: '/'}
]
const router = new Router({
  mode: ROUTER_MODE,
  routes,
  linkActiveClass: 'is-active'
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!AuthUser.isLoggedIn()) {
      next('/login')
    } else {
      next()
    }
  } else if (to.matched.some(record => !record.meta.requiresAuth)) {
    if (AuthUser.isLoggedIn()) {
      if (AuthUser.isAdministrator()) {
        window.location.replace(API_APPS.ADMINISTRATOR + '/')
      } else if (AuthUser.isAuditor()) {
        window.location.replace(API_APPS.AUDITOR + '/')
      } else if (AuthUser.isCustomer()) {
        window.location.replace(API_APPS.CUSTOMER + '/')
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
