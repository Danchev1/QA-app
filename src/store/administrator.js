// es6-promise needed for IE11 support
require('es6-promise').polyfill()
import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth/authModule'
import formModule from './modules/application/applicationFormModule'
import caseModule from './modules/case/caseModule'
import auditorModule from './modules/auditor/auditorModule'
import messageModule from './modules/message/messageModule'
import filesModule from './modules/files/filesModule'
import staffModule from './modules/staff/staffModule'
import customerModule from './modules/customer/customerModule'
import certificateModule from './modules/certifiacte/certificateModule'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    authModule,
    formModule,
    caseModule,
    auditorModule,
    messageModule,
    filesModule,
    staffModule,
    customerModule,
    certificateModule
  }
})
