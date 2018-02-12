import Log from '@/classes/debug/Log'
import caseApi from '@/api/case/caseApi'
import AuthUser from '@/classes/auth/AuthUser'
import { Case } from '@/classes/case/Case'
import ProfileType from '@/classes/case/ProfileType'

const state = {
  staffCases: []
}

const mutations = {
  setStaffCases: (state, data) => {
    state.staffCases = Case.asCases(data)
  }
}

const actions = {
  getStaffCases ({ commit }) {
    let filter = `?responsible=${ProfileType.ADMINISTRATOR}`
    return caseApi.getCases(filter).then((response) => {
      try {
        commit('setStaffCases', response.data)
        return true
      } catch (err) {
        Log.error('Response from server could not be handled', err)
        throw err
      }
    }, (err) => {
      Log.debug('Unable to receive ' + AuthUser.getProfileTypeVerbose() + ' cases', err)
      throw err
    })
  }
}

export default {
  state,
  mutations,
  actions
}
