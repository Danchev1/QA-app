import Log from '@/classes/debug/Log'
import profileApi from '@/api/profile/profileApi'
import Customer from '@/classes/case/Customer'

const state = {
  customerProfile: {}
}

const mutations = {
  setStateCustomerProfile: (state, data) => {
    state.customerProfile = Customer.asCustomer(data)
  }
}

const actions = {
  getCustomerProfile ({ commit }) {
    return profileApi.getCustomerProfile().then((response) => {
      try {
        commit('setStateCustomerProfile', response.data)
        return true
      } catch (e) {
        Log.error('Response from server could not be handled', e)
        return false
      }
    }, (err) => {
      Log.debug('Unable to receive Customer Information', err)
      return false
    })
  }
}
export default {
  state,
  mutations,
  actions
}
