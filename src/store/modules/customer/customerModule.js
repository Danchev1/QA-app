import Customer from '@/classes/case/Customer'
import customerApi from '@/api/customer/customerApi'
import AuthUser from '@/classes/auth/AuthUser'
import Log from '@/classes/debug/Log'

const state = {
  customers: [],
  currentCustomer: {}
}
const mutations = {
  setStateCustomers: (state, data) => {
    state.customers = Customer.asCustomers(data)
  },
  setStateCurrentCustomer: (state, customer) => {
    state.currentCustomer = customer
  },
  updateStateCurrentCustomer: (state, data) => {
    data.current.updateCurrentCustomer(Customer.asCustomer(data.updated))
  }
}
const actions = {
  getCustomers ({ commit }) {
    return customerApi.getCustomers().then((response) => {
      try {
        commit('setStateCustomers', response.data)
        return true
      } catch (err) {
        Log.error('Response from server could not be handled', err)
        throw err
      }
    }, (err) => {
      Log.debug('Unable to receive ' + AuthUser.getProfileTypeVerbose() + ' customers', err)
      throw err
    })
  },
  setCustomer ({ commit }, customerId) {
    return customerApi.getCustomer(customerId).then((response) => {
      commit('setStateCurrentCustomer', Customer.asCustomer(response.data))
    }, (err) => {
      Log.debug('Unable to receive customer information ' + customerId, err)
      throw err
    })
  },
  refreshCustomer ({ commit }, customer) {
    return customerApi.getCustomer(customer.id).then((response) => {
      commit('updateStateCurrentCustomer', {
        current: customer,
        updated: response.data
      })
    }, (err) => {
      Log.debug('Unable to receive customer with id ' + customer.id, err)
      throw err
    })
  },
  setOrRefreshCustomer ({ dispatch, commit, state }, customerId) {
    return new Promise((resolve) => {
      let foundCase = state.customers.filter(customer => {
        return customer.id === customerId
      })[0]

      if (foundCase) {
        commit('setStateCurrentCustomer', foundCase)
        resolve(dispatch('refreshCustomer', foundCase))
      }
      resolve(dispatch('setCustomer', customerId))
    })
  }
}

export default {
  state,
  mutations,
  actions
}
