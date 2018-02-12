// es6-promise needed for IE11 support
require('es6-promise').polyfill()
import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth/authModule'
import formModule from './modules/application/applicationFormModule'
import servicesModule from './modules/services/servicesModule'
import messageModule from './modules/message/messageModule'

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
    servicesModule,
    messageModule
  }
})
