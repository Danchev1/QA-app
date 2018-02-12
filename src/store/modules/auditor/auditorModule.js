import Log from '@/classes/debug/Log'
import auditorApi from '@/api/auditor/auditorApi'
import caseApi from '@/api/case/caseApi'
import AuthUser from '@/classes/auth/AuthUser'
import { Auditor, AuditorRequest } from '@/classes/case/Auditor'
import { Case } from '@/classes/case/Case'

const state = {
  auditors: [],
  auditorRequests: [],
  auditorCases: [],
  currentAuditor: null
}

const mutations = {
  setStateAuditors: (state, data) => {
    state.auditors = Auditor.asAuditors(data)
  },
  setStateCaseRequests: (state, data) => {
    state.auditorRequests = AuditorRequest.asAuditorRequests(data)
  },
  setAuditorCases: (state, data) => {
    state.auditorCases = Case.asCases(data)
  },
  setStateCurrentAuditor: (state, data) => {
    state.currentAuditor = Auditor.asAuditor(data)
  }
}

const actions = {
  getAuditors ({ commit }) {
    return auditorApi.getAuditors().then((response) => {
      try {
        commit('setStateAuditors', response.data)
        return true
      } catch (e) {
        Log.error('Response from server could not be handled', e)
        return false
      }
    }, (err) => {
      Log.debug('Unable to receive ' + AuthUser.getProfileTypeVerbose() + ' cases', err)
      return false
    })
  },
  getAuditorRequestsForCases ({ commit }, postData) {
    let filter = `case=${postData.caseId}`
    return caseApi.getAuditorRequests(postData.auditorId, filter).then((response) => {
      try {
        commit('setStateCaseRequests', response.data)
        return true
      } catch (e) {
        Log.error('Response from server could not be handled', e)
        return false
      }
    }, (err) => {
      Log.debug('Unable to receive ' + AuthUser.getProfileTypeVerbose() + ' case requests ', err)
      return false
    })
  },
  getAuditorCases ({ commit }, auditorId) {
    return caseApi.getAuditorCases(auditorId).then((response) => {
      try {
        commit('setAuditorCases', response.data)
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
  getPendingAuditorRequests ({ commit }, auditorId) {
    let filter = `state=${AuditorRequest.PENDING}`
    return caseApi.getAuditorRequests(auditorId, filter).then((response) => {
      try {
        commit('setStateCaseRequests', response.data)
        return true
      } catch (e) {
        Log.error('Response from server could not be handled', e)
        return false
      }
    }, (err) => {
      Log.debug('Unable to receive ' + AuthUser.getProfileTypeVerbose() + ' case requests ', err)
      return false
    })
  },
  saveAuditorRequest ({ commit }, postData) {
    return caseApi.postAuditorRequest(postData.caseId, postData.auditorId).then((response) => {
      Log.debug('Request sent to auditor as ' + AuthUser.getProfileTypeVerbose())
      return response
    }, (err) => {
      Log.debug('Unable to sent request to auditor as ' + AuthUser.getProfileTypeVerbose(), err)
      throw new Error('Could not assign auditor')
    })
  },
  updateAuditorRequest ({ commit }, data) {
    return caseApi.patchAuditorRequest(data.postData.requestId, data.postData.state).then((response) => {
      try {
        commit('updateStateCurrentCase', {
          current: data.currentCase,
          updated: response.data
        })
        return true
      } catch (e) {
        Log.error('Response from server could not be handled', e)
        return false
      }
    }, (err) => {
      Log.debug('Unable to update request to auditor as ' + AuthUser.getProfileTypeVerbose(), err)
      throw new Error('Could not update auditor request')
    })
  }
}

export default {
  state,
  mutations,
  actions
}
