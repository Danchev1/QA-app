import Vue from 'vue'
import Router from 'vue-router'
import { API_APPS } from '@/api/config'
import DashboardView from '@/views/administrator/dashboard/DashboardView'
import CaseView from '@/views/administrator/CaseView'
import AuthUser from '@/classes/auth/AuthUser'
import CasesListView from '@/views/administrator/CasesListView'
import AssignAuditorView from '@/views/administrator/AssignAuditorView'
import CertificatesListView from '@/views/administrator/CertificatesListView'
import CustomersListView from '@/views/administrator/CustomersListView'
import CustomerDetailView from '@/views/auditor/CustomerDetailView'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'DashboardView',
    component: DashboardView,
    meta: {requiresAuth: true}
  },
  {
    path: '/cases',
    name: 'CasesListView',
    component: CasesListView,
    meta: {requiresAuth: true}
  },
  {
    path: '/cases/:caseId',
    name: 'CaseView',
    component: CaseView,
    props: true,
    meta: {requiresAuth: true}
  },
  {
    path: '/cases/:caseId/assign-auditor',
    name: 'AssignAuditorView',
    component: AssignAuditorView,
    props: true,
    meta: {requiresAuth: true}
  },
  {
    path: '/customers',
    name: 'CustomersListView',
    component: CustomersListView,
    meta: {requiresAuth: true}
  },
  {
    path: '/customers/:customerId',
    name: 'CustomerDetailView',
    component: CustomerDetailView,
    props: true,
    meta: {requiresAuth: true}
  },
  {
    path: '/certificates',
    name: 'CertificatesListView',
    component: CertificatesListView,
    meta: {requiresAuth: true}
  },
  {
    path: '*',
    redirect: '/'
  }
]
const router = new Router({
  mode: 'hash',
  routes,
  linkActiveClass: 'is-active'
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!AuthUser.isLoggedIn()) {
      window.location.replace(API_APPS.PUBLIC + '/login')
    } else {
      if (AuthUser.isAuditor()) {
        window.location.replace(API_APPS.AUDITOR + '/home')
      } else if (AuthUser.isCustomer()) {
        window.location.replace(API_APPS.CUSTOMER + '/home')
      } else {
        next()
      }
    }
  } else {
    next()
  }
})
export default router
