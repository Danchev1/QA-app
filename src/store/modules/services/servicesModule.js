import Log from '@/classes/debug/Log'
import servicesApi from '@/api/services/servicesApi'
import Service from '@/classes/case/Service'

const state = {
  services: []
}

const mutations = {
  setStateServices: (state, data) => {
    state.services = Service.asServices(data)
  }
}

const actions = {
  getServices ({ commit }) {
    return servicesApi.getServices().then((response) => {
      commit('setStateService', response.data)
      return true
    }, (err) => {
      Log.debug('Unable to receive Service Types', err)
      return false
    })
  }
}

export default {
  state,
  mutations,
  actions
}
