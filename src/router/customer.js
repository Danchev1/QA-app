import Vue from 'vue'
import Router from 'vue-router'
import { API_APPS } from '@/api/config'
import ApplicationView from '@/components/application/ApplicationView'
import CustomerDetailView from '@/views/customer/CustomerDetailView'
import CaseView from '@/views/customer/CaseView'
import CertificateView from '@/views/customer/CertificateView'
import CaseReview from '@/views/customer/CaseReview'
import AuthUser from '@/classes/auth/AuthUser'
import DashboardView from '@/views/customer/dashboard/DashboardView'
import InvoicingView from '@/views/customer/InvoicingView'
import DocumentsView from '@/views/customer/DocumentsView'
import MessagingView from '@/views/customer/MessagingView'
import CustomerEditView from '@/views/customer/CustomerEditView'
import CertificatesListView from '@/views/customer/CertificatesListView'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'DashboardView',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/application',
    name: 'ApplicationView',
    component: ApplicationView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'CustomerDetailView',
    component: CustomerDetailView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'InvoicingView',
        component: InvoicingView
      },
      {
        path: 'documents',
        name: 'DocumentsView',
        component: DocumentsView
      },
      {
        path: 'messaging',
        name: 'MessagingView',
        component: MessagingView
      }
    ]
  },
  {
    path: '/cases/:caseId',
    name: 'CaseView',
    component: CaseView,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/cases/:caseId/review',
    name: 'CaseReview',
    component: CaseReview,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/edit',
    name: 'CustomerEditView',
    component: CustomerEditView,
    meta: { requiresAuth: true }
  },
  {
    path: '/certificates',
    name: 'CertificatesListView',
    component: CertificatesListView,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/certificates/:serviceType',
    name: 'CertificateView',
    component: CertificateView,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '*',
    redirect: '/'
  }
]
const router = new Router({
  mode: 'hash',
  routes,
  linkActiveClass: 'is-active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!AuthUser.isLoggedIn()) {
      window.location.replace(API_APPS.PUBLIC + '/login')
    } else {
      if (AuthUser.isAdministrator()) {
        window.location.replace(API_APPS.ADMINISTRATOR + '/home')
      } else if (AuthUser.isAuditor()) {
        window.location.replace(API_APPS.AUDITOR + '/home')
      } else {
        next()
      }
    }
  } else {
    next()
  }
})
export default router
