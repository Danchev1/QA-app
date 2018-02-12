// es6-promise needed for IE11 support
require('es6-promise').polyfill()
import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth/authModule'
import formModule from './modules/application/applicationFormModule'
import caseModule from './modules/case/caseModule'
import caseReviewModule from './modules/case/caseReviewModule'
import issueModule from './modules/issue/issueModule'
import profileModule from './modules/profile/profileModule'
import messageModule from './modules/message/messageModule'
import customerEditModule from './modules/customer_edit/customerEditModule'
import filesModule from './modules/files/filesModule'
import certificateModule from './modules/certifiacte/certificateModule'

Vue.use(Vuex)

Vue.directive('invalid', {
  // Add a invalid class to element if invalid data
  // binding.value should be validation.is_valid from field
  update: function (el, binding) {
    if (binding.value === true) {
      el.classList.remove('invalid')
    } else {
      el.classList.add('invalid')
    }
  }
})

export default new Vuex.Store({
  modules: {
    authModule,
    formModule,
    caseModule,
    caseReviewModule,
    issueModule,
    profileModule,
    messageModule,
    customerEditModule,
    filesModule,
    certificateModule
  }
})
