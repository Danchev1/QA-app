import Vue from 'vue'
import Router from 'vue-router'
import { API_APPS, ROUTER_MODE } from '@/api/config'
import DashboardView from '@/views/auditor/dashboard/DashboardView'
import CaseView from '@/views/auditor/CaseView'
import CaseReviewView from '@/views/auditor/CaseReviewView'
import AuthUser from '@/classes/auth/AuthUser'
import CreateCertificateView from '@/views/auditor/CreateCertificateView'
import PublishedCertificateView from '@/views/auditor/PublishedCertificateView'
import CertificatesListView from '@/views/auditor/CertificatesListView'
import CustomersListView from '@/views/auditor/CustomersListView'
import CustomerDetailView from '@/views/auditor/CustomerDetailView'
import CasesListView from '@/views/auditor/CasesListView'

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
    props: true,
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
    path: '/cases/:caseId/review',
    name: 'CaseReviewView',
    component: CaseReviewView,
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
    path: '/cases/:caseId/certificates',
    name: 'CreateCertificateView',
    component: CreateCertificateView,
    props: true,
    meta: {requiresAuth: true}
  },
  {
    path: '/certificates/:certificateId',
    name: 'PublishedCertificateView',
    component: PublishedCertificateView,
    props: true,
    meta: {requiresAuth: true}
  },
  {
    path: '*',
    redirect: '/'
  }
]
const router = new Router({
  mode: ROUTER_MODE,
  routes,
  linkActiveClass: 'is-active'
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!AuthUser.isLoggedIn()) {
      window.location.replace(API_APPS.PUBLIC + '/login')
    } else {
      if (AuthUser.isAdministrator()) {
        window.location.replace(API_APPS.ADMINISTRATOR + '/home')
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
