// es6-promise needed for IE11 support
require('es6-promise').polyfill()
import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth/authModule'
import formModule from './modules/application/applicationFormModule'
import caseModule from './modules/case/caseModule'
import caseReviewModule from './modules/case/caseReviewModule'
import auditorModule from './modules/auditor/auditorModule'
import messageModule from './modules/message/messageModule'
import certificateModule from './modules/certifiacte/certificateModule'
import filesModule from './modules/files/filesModule'
import customerModule from './modules/customer/customerModule'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    authModule,
    formModule,
    caseModule,
    caseReviewModule,
    auditorModule,
    messageModule,
    certificateModule,
    filesModule,
    customerModule
  }
})
