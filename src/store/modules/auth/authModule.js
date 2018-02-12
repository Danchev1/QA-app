import Log from '@/classes/debug/Log'
import { API_APPS } from '@/api/config'
import authApi from '@/api/auth/authApi'
import AuthUser from '@/classes/auth/AuthUser'

const state = {
  authUser: new AuthUser()
}

const mutations = {
  setAuthUser: (state, data) => {
    state.authUser.loginAuthUser(data)
  },
  setLoggedOut: (state) => {
    state.authUser.logoutAuthUser()
  }
}

const actions = {
  authentication ({ commit }, data) {
    commit('setAuthUser', data)
    if (AuthUser.isCustomer()) {
      window.location.replace(API_APPS.CUSTOMER + '/')
    } else if (AuthUser.isAuditor()) {
      window.location.replace(API_APPS.AUDITOR + '/')
    } else if (AuthUser.isAdministrator()) {
      window.location.replace(API_APPS.ADMINISTRATOR + '/home')
    } else {
      commit('setLoggedOut')
      window.location.replace(API_APPS.PUBLIC + '/')
    }
  },
  loginUser ({ dispatch }, user) {
    return authApi.loginUser(user).then((response) => {
      dispatch('authentication', response.data)
    }, (err) => {
      Log.debug('Unable to login user', err)
      return err
    })
  },
  logoutUser ({ commit }) {
    return authApi.logoutUser().then((response) => {
      commit('setLoggedOut')
      window.location.replace(API_APPS.PUBLIC + '/')
    }, (err) => {
      Log.debug('Unable to logout user', err)
      return false
    })
  },
  switchProfile ({ dispatch }, profileId) {
    return authApi.switchProfile(profileId).then((response) => {
      dispatch('authentication', response.data)
    }, (err) => {
      Log.debug('Unable to login user', err)
      return err
    })
  },
  resetProfile ({ dispatch }) {
    return authApi.resetProfile().then((response) => {
      dispatch('authentication', response.data)
    }, (err) => {
      Log.debug('Unable to switch profile', err)
      return err
    })
  }
}

export default {
  state,
  mutations,
  actions
}
