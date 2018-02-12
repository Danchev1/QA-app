import MockAdapter from 'axios-mock-adapter'
import { API_ROOT, FORM_CERTIFICATES } from '@/api/config'

import AuthUser from '@/classes/auth/AuthUser'

import mockCEXServiceForm from '@/api/mock/form/CEXServiceForm'
import mockCEXChecklist from '@/api/mock/form/CEXChecklist'
import mockCustomerInformationForm from '@/api/mock/form/customerInformationForm'

import mockCustomer from '@/api/mock/auth/customer'
import mockAdministrator from '@/api/mock/auth/administrator'
import mockAuditor from '@/api/mock/auth/auditor'

import mockDashboardCustomer from '@/api/mock/dashboard/dashboardCustomer'
import mockDashboardAdministrator from '@/api/mock/dashboard/dashboardAdministrator'
import mockDashboardAuditor from '@/api/mock/dashboard/dashboardAuditor'
import mockReminderIntervals from '@/api/mock/dashboard/reminderIntervals'

import mockServiceTypes from '@/api/mock/services/serviceTypesMock'

import mockConfirmationForm from '@/api/mock/form/confirmationForm'

import mockCasesCustomer from '@/api/mock/cases/casesCustomer'
import mockCustomerIssues from '@/api/mock/dashboard/customerIssues'

import mockCustomerProfile from '@/api/mock/customer/customerProfileMock'
import mockCaseReviewResults from '@/api/mock/cases/caseReviewResults'

import mockAuditors from '@/api/mock/auditor/auditorsMock'

export default class HttpMockAdapter {

  init (axios) {
    this.mock = new MockAdapter(axios, { delayResponse: 150 })
    this.authApiLoginUser()
    this.authApiLogoutUser()
    this.dashboardApiGetFlows()
    this.dashboardApiGetCases()
    this.dashboardApiGetCase()
    this.dashboardApiGetCaseReminderIntervals()
    this.dashboardApiPatchCaseReminderInterval()
    this.dashboardApiGetAuditors()
    this.dashboardApiPatchCaseAuditor()
    this.dashboardApiPatchCaseAccept()
    this.dashboardApiPatchCaseReject()
    this.formApiGetFormDescriptorsAndData()
    this.formApiGetFormDescriptorsForChecklist()
    this.formApiPostFormDataAsGuest()
    this.formApiPostFormDataAsAuthUser()
    this.formApiPatchFormData()
    this.formApiPostFormDataForChecklist()
    this.servicesApiGetDescriptor()
    this.confirmationApiGetDescriptor()
    this.casesApiGetCases()
    this.caseApiGetCase()
    this.caseApiGetReviewResults()
    this.caseApiPatchReviewResults()
    this.issuesApiGetIssues()
    this.issuesApiUpdateIssue()
    this.customerApiGetProfile()
    this.auditorApiGetAuditors()
    this.auditorApiPostRequest()
  }

  authApiLoginUser () {
    this.mock.onPost('account/login').reply(function (config) {
      return new Promise((resolve, reject) => {
        let data = JSON.parse(config.data)
        let profileType = parseInt(data.username)

        if (profileType && AuthUser.isAdministrator(profileType)) {
          resolve([
            200,
            mockAdministrator
          ])
        } else if (profileType && AuthUser.isAuditor(profileType)) {
          resolve([
            200,
            mockAuditor
          ])
        } else if (profileType && AuthUser.isCustomer(profileType)) {
          resolve([
            200,
            mockCustomer
          ])
        } else {
          reject([
            401,
            null
          ])
        }
      })
    })
  }

  authApiLogoutUser () {
    this.mock.onDelete('account/login').reply(function (config) {
      return new Promise((resolve) => {
        resolve([
          200
        ])
      })
    })
  }

  dashboardApiGetFlows () {
    this.mock.onGet('flow/').reply(function (config) {
      return new Promise((resolve, reject) => {
        if (AuthUser.isCustomer()) {
          resolve([
            200,
            mockDashboardCustomer
          ])
        } else {
          reject([
            404,
            null
          ])
        }
      })
    })
  }

  dashboardApiGetCases () {
    this.mock.onGet('case/').reply(function (config) {
      return new Promise((resolve, reject) => {
        if (AuthUser.isAdministrator()) {
          resolve([
            200,
            mockDashboardAdministrator
          ])
        } else if (AuthUser.isAuditor()) {
          resolve([
            200,
            mockDashboardAuditor
          ])
        } else if (AuthUser.isCustomer()) {
          resolve([
            200,
            mockDashboardCustomer.flows[0].cases
          ])
        } else {
          reject([
            404,
            null
          ])
        }
      })
    })
  }

  dashboardApiGetCase () {
    let re = new RegExp('^case/[0-9]+/$')
    this.mock.onGet(re).reply(function (config) {
      return new Promise((resolve, reject) => {
        if (AuthUser.isAdministrator()) {
          resolve([
            200,
            mockDashboardAdministrator[0]
          ])
        } else if (AuthUser.isAuditor()) {
          resolve([
            200,
            mockDashboardAuditor[0]
          ])
        } else if (AuthUser.isCustomer()) {
          let result = mockDashboardCustomer.flows[0].cases[0]
          result.flow = {
            id: mockDashboardCustomer.flows[0].id,
            customer: mockDashboardCustomer.flows[0].customer,
            service: mockDashboardCustomer.flows[0].service
          }
          resolve([
            200,
            result
          ])
        } else {
          reject([
            404,
            null
          ])
        }
      })
    })
  }

  dashboardApiGetCaseReminderIntervals () {
    this.mock.onGet('case/reminder/').reply(function (config) {
      return new Promise((resolve) => {
        resolve([
          200,
          mockReminderIntervals
        ])
      })
    })
  }

  dashboardApiPatchCaseReminderInterval () {
    let re = new RegExp('^case/[0-9]+/reminder/$')
    this.mock.onPatch(re).reply(function (config) {
      return new Promise((resolve) => {
        resolve([
          200
        ])
      })
    })
  }

  dashboardApiGetAuditors () {
    this.mock.onGet('auditor/').reply(function (config) {
      return new Promise((resolve) => {
        resolve([
          200,
          mockAuditors
        ])
      })
    })
  }

  dashboardApiPatchCaseAuditor () {
    let re = new RegExp('^case/[0-9]+/assign/$')
    this.mock.onPatch(re).reply(function (config) {
      return new Promise((resolve) => {
        resolve([
          200
        ])
      })
    })
  }

  dashboardApiPatchCaseAccept () {
    let re = new RegExp('^case/[0-9]+/accept/$')
    this.mock.onPatch(re).reply(function (config) {
      return new Promise((resolve) => {
        resolve([
          200
        ])
      })
    })
  }

  dashboardApiPatchCaseReject () {
    let re = new RegExp('^case/[0-9]+/reject/$')
    this.mock.onPatch(re).reply(function (config) {
      return new Promise((resolve) => {
        resolve([
          200
        ])
      })
    })
  }

  formApiGetFormDescriptorsAndData () {
    this.mock.onGet('dynamic-form').reply(function (config) {
      return new Promise((resolve) => {
        let code = config.params.code

        if (code === FORM_CERTIFICATES.CEX) {
          resolve([
            200,
            mockCEXServiceForm
          ])
        } else if (code === FORM_CERTIFICATES.CUSTOMER) {
          resolve([
            200,
            mockCustomerInformationForm
          ])
        } else {
          resolve([
            404,
            null
          ])
        }
      })
    })
  }

  formApiGetFormDescriptorsForChecklist () {
    let re = new RegExp('^case/[0-9]+/checklist/$')
    this.mock.onGet(re).reply(function (config) {
      return new Promise((resolve) => {
        resolve([
          200,
          mockCEXChecklist
        ])
      })
    })
  }

  formApiPostFormDataAsGuest () {
    let re = new RegExp('application/[a-zA-Z]')
    this.mock.onPost(re).reply(function (config) {
      return new Promise((resolve) => {
        resolve([
          200
        ])
      })
    })
  }

  formApiPostFormDataAsAuthUser () {
    let re = new RegExp('^service/[0-9]+/$')
    this.mock.onPost(re).reply(function (config) {
      return new Promise((resolve) => {
        resolve([
          200
        ])
      })
    })
  }

  formApiPatchFormData () {
    let re = new RegExp('^form-data/[0-9]+/$')
    this.mock.onPatch(re).reply(function (config) {
      return new Promise((resolve) => {
        resolve([
          200,
          null
        ])
        /*
        resolve([
          status: 409,
          data: [
            {
              form_field_id: 3,
              message: 'Please enter a valid Social Security Number.'
            },
            {
              form_field_id: 6,
              message: 'Could not create user with this E-mail.'
            }
          ]
        ])
        */
      })
    })
  }

  formApiPostFormDataForChecklist () {
    let re = new RegExp('^case/[0-9]+/review/$')
    this.mock.onPost(re).reply(function (config) {
      return new Promise((resolve) => {
        resolve([
          200
        ])
      })
    })
  }

  servicesApiGetDescriptor () {
    this.mock.onGet(API_ROOT).reply(function () {
      return new Promise((resolve) => {
        resolve([
          200,
          mockServiceTypes
        ])
      })
    })
  }

  confirmationApiGetDescriptor () {
    this.mock.onGet('account/confirm/').reply(function () {
      return new Promise((resolve) => {
        resolve([
          200,
          mockConfirmationForm
        ])
      })
    })
  }

  casesApiGetCases () {
    this.mock.onGet('cases').reply(function () {
      return new Promise((resolve) => {
        resolve([
          200,
          mockCasesCustomer
        ])
      })
    })
  }

  caseApiGetCase () {
    let re = new RegExp('cases/[0-9]$')
    this.mock.onGet(re).reply(function (config) {
      let id = parseInt(config.url.substr(config.url.lastIndexOf('/') + 1))
      return new Promise((resolve) => {
        resolve([
          200,
          mockCasesCustomer.find(_case => {
            return _case.id === id
          })
        ])
      })
    })
  }

  caseApiGetReviewResults () {
    let re = new RegExp('cases/[0-9]/review-results')
    this.mock.onGet(re).reply(function () {
      return new Promise((resolve) => {
        resolve([
          200,
          mockCaseReviewResults
        ])
      })
    })
  }

  caseApiPatchReviewResults () {
    let re = new RegExp('cases/review-results/[0-9]')
    this.mock.onPatch(re).reply(function () {
      return new Promise((resolve) => {
        resolve([
          200,
          mockCaseReviewResults
        ])
      })
    })
  }

  issuesApiGetIssues () {
    this.mock.onGet('issues').reply(function () {
      return new Promise((resolve) => {
        resolve([
          200,
          mockCustomerIssues
        ])
      })
    })
  }

  issuesApiUpdateIssue () {
    let re = new RegExp('issues/[0-9]$')
    this.mock.onPatch(re).reply(function () {
      return new Promise((resolve) => {
        resolve([
          200,
          mockCustomerIssues
        ])
      })
    })
  }

  customerApiGetProfile () {
    this.mock.onGet('profile').reply(function () {
      return new Promise((resolve) => {
        resolve([
          200,
          mockCustomerProfile
        ])
      })
    })
  }

  auditorApiGetAuditors () {
    this.mock.onGet('auditors').reply(function () {
      return new Promise((resolve) => {
        resolve([
          200,
          mockAuditors
        ])
      })
    })
  }

  auditorApiPostRequest () {
    let re = new RegExp('cases/[0-9]/requests')
    this.mock.onPost(re).reply(function () {
      return new Promise((resolve) => {
        resolve([
          200
        ])
      })
    })
  }
}
