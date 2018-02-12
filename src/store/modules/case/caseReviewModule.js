import Log from '@/classes/debug/Log'
import AuthUser from '@/classes/auth/AuthUser'
import FormData from '@/classes/form/FormData'
import caseApi from '@/api/case/caseApi'
import { ReviewResult, ReviewResultState } from '@/classes/case/ReviewResult'

const state = {
  reviewResults: []
}

const getters = {
  getReviewResultFindings: state => {
    return state.reviewResults.filter(reviewResult => {
      return reviewResult.state.value === ReviewResultState.NOT_OK
    })
  },
  getFindingsForResponsible: (state, getters) => (profileType) => {
    return getters.getReviewResultFindings.filter(reviewResult => {
      return reviewResult.responsible.profileType === profileType
    })
  },
  groupedReviewResults: state => (dataGroups) => {
    let groups = [].concat([], dataGroups) // Ensures array
    return state.reviewResults.filter(reviewResult => {
      return groups.indexOf(reviewResult.getDataGroup()) > -1
    })
  }
}

const mutations = {
  setStateReviewResults: (state, data) => {
    state.reviewResults = ReviewResult.asReviewResults(data)
  },
  updateStateReviewResult: (state, data) => {
    data.current.updateFromResult(ReviewResult.asReviewResult(data.updated))
  },
  updateStateReviewResults: (state, data) => {
    ReviewResult.updateListFormResults(data.current, ReviewResult.asReviewResults(data.updated))
  },
  setStateReviewResultState: (state, data) => {
    data.reviewResult.setState(data.state)
  },
  setResponsibleOnResult: (state, data) => {
    data.reviewResult.setResponsible(data.responsible)
  },
  addOrSetPendingFinding: (state, data) => {
    data.reviewResult.addOrSetPendingFinding(data)
  },
  addPendingComment: (state, data) => {
    data.finding.addPendingComment(data.createdBy)
  },
  commmitPendingComment: (state, data) => {
    data.finding.commitPendingComment()
  },
  commmitPendingFinding: (state, reviewResult) => {
    reviewResult.commitPendingFinding()
  }
}

const actions = {
  getReviewResults ({ commit }, caseId) {
    return caseApi.getReviewResults(caseId).then((response) => {
      try {
        commit('setStateReviewResults', response.data)
        return true
      } catch (e) {
        Log.error('Response from server could not be handled', e)
        return false
      }
    }, (err) => {
      Log.debug('Unable to receive ' + AuthUser.getProfileTypeVerbose() + ' review results', err)
      return false
    })
  },
  updateReviewResultFormData ({ commit }, reviewResult) {
    if (!FormData.validateFormDatas([reviewResult.formData])) {
      return null
    }

    let payload = FormData.serializeFormDatas([reviewResult.formData])
    return caseApi.patchReviewResult(reviewResult, payload).then((response) => {
      try {
        commit('updateStateReviewResult', {
          current: reviewResult,
          updated: response.data
        })
        return true
      } catch (e) {
        Log.error('Response from server could not be handled', e)
        return false
      }
    }, (err) => {
      Log.debug('Unable to receive ' + AuthUser.getProfileTypeVerbose() + ' review results', err)
      throw err
    })
  },
  updateReviewResultState ({ commit }, data) {
    let payload = { state: ReviewResultState.getStateByValue(data.state) }
    return caseApi.patchReviewResultState(data.reviewResult, payload).then((response) => {
      try {
        commit('updateStateReviewResult', {
          current: data.reviewResult,
          updated: response.data
        })
        return true
      } catch (e) {
        Log.error('Response from server could not be handled', e)
        return false
      }
    }, (err) => {
      Log.debug('Unable to receive ' + AuthUser.getProfileTypeVerbose() + ' review results', err)
      throw err
    })
  },
  updateAllReviewResultsState ({ commit }, patchData) {
    return caseApi.patchReviewResultsState(patchData.caseId, patchData.reviewResults).then((response) => {
      try {
        commit('updateStateReviewResults', { current: patchData.current, updated: response.data })
        return true
      } catch (e) {
        Log.error('Response from server could not be handled', e)
        return false
      }
    }, (err) => {
      Log.debug('Unable to recieve ' + AuthUser.getProfileTypeVerbose() + ' review results', err)
      throw err
    })
  },
  saveFinding ({ commit }, reviewResult) {
    return caseApi.postFinding(reviewResult.id, reviewResult.finding).then((response) => {
      try {
        commit('updateStateReviewResult', {
          current: reviewResult,
          updated: response.data
        })
        return true
      } catch (e) {
        Log.error('Response from server could not be handled', e)
        return false
      }
    }, (err) => {
      Log.debug('Unable to receive ' + AuthUser.getProfileTypeVerbose() + ' review results', err)
      return false
    })
  },
  updateFinding ({ commit }, reviewResult) {
    return caseApi.patchFinding(reviewResult.finding).then((response) => {
      try {
        commit('updateStateReviewResult', {
          current: reviewResult,
          updated: response.data
        })
        return true
      } catch (e) {
        Log.error('Response from server could not be handled', e)
        return false
      }
    }, (err) => {
      Log.debug('Unable to receive ' + AuthUser.getProfileTypeVerbose() + ' review results', err)
      return false
    })
  },
  saveComment ({ commit }, postData) {
    let payload = { text: postData.comment }
    return caseApi.postFindingComment(postData.finding.id, payload).then((response) => {
      return response
    }, (err) => {
      Log.debug('Unable to receive ' + AuthUser.getProfileTypeVerbose() + ' review results', err)
      return false
    })
  },
  saveRejectComment ({ commit }, postData) {
    let payload = {
      text: postData.comment,
      responsible: postData.responsible
    }
    return caseApi.postFindingComment(postData.finding.id, payload).then((response) => {
      return response
    }, (err) => {
      Log.debug('Unable to receive ' + AuthUser.getProfileTypeVerbose() + ' review results', err)
      return false
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
