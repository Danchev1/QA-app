import Log from '@/classes/debug/Log'
import caseApi from '@/api/case/caseApi'
import AuthUser from '@/classes/auth/AuthUser'
import { Case } from '@/classes/case/Case'

const state = {
  cases: [],
  currentCase: {}
}

const mutations = {
  setStateCases: (state, data) => {
    state.cases = Case.asCases(data)
  },
  setStateCurrentCase: (state, _case) => {
    state.currentCase = _case
  },
  updateStateCurrentCase: (state, data) => {
    data.current.updateCurrentCase(Case.asCase(data.updated))
  }
}

const actions = {
  getCases ({ commit }) {
    return caseApi.getCases().then((response) => {
      try {
        commit('setStateCases', response.data)
        return true
      } catch (err) {
        Log.error('Response from server could not be handled', err)
        throw err
      }
    }, (err) => {
      Log.debug('Unable to receive ' + AuthUser.getProfileTypeVerbose() + ' cases', err)
      throw err
    })
  },
  setCase ({ commit }, caseId) {
    return caseApi.getCase(caseId).then((response) => {
      commit('setStateCurrentCase', Case.asCase(response.data))
    }, (err) => {
      Log.debug('Unable to receive case ' + caseId, err)
      throw err
    })
  },
  refreshCase ({ commit }, _case) {
    return caseApi.getCase(_case.id).then((response) => {
      commit('updateStateCurrentCase', {
        current: _case,
        updated: response.data
      })
    }, (err) => {
      Log.debug('Unable to receive case ' + _case.id, err)
      throw err
    })
  },
  setOrRefreshCase ({ dispatch, commit, state }, caseId) {
    return new Promise((resolve) => {
      let foundCase = state.cases.filter(_case => {
        return _case.id === caseId
      })[0]

      if (foundCase) {
        commit('setStateCurrentCase', foundCase)
        resolve(dispatch('refreshCase', foundCase))
      }
      resolve(dispatch('setCase', caseId))
    })
  },
  updateCase ({ commit, state }, data) {
    return caseApi.patchCase(data.caseId, data.payload).then((response) => {
      commit('updateStateCurrentCase', {
        current: state.currentCase,
        updated: response.data
      })
    }, (err) => {
      Log.debug('Unable to receive case ' + data.caseId, err)
      throw err
    })
  }
}

export default {
  state,
  mutations,
  actions
}
