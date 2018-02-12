import Log from '@/classes/debug/Log'
import issueApi from '@/api/issue/issueApi'
import AuthUser from '@/classes/auth/AuthUser'
import Issue from '@/classes/case/Issue'
import FormData from '@/classes/form/FormData'
import { InvalidDataError, NoDataError } from '@/classes/errors'

const state = {
  issues: []
}

const mutations = {
  setStateIssues: (state, data) => {
    state.issues = Issue.asIssues(data)
  },
  removeIssue: (state, issue) => {
    state.issues = state.issues.filter(item => {
      return item.id !== issue.id
    })
  }
}

const actions = {
  getIssues ({ commit }) {
    return issueApi.getIssues().then((response) => {
      commit('setStateIssues', response.data)
      return true
    }, (err) => {
      Log.debug('Unable to receive ' + AuthUser.getProfileTypeVerbose() + ' issues', err)
      return false
    })
  },
  updateIssueForm ({ commit }, issue) {
    return new Promise((resolve, reject) => {
      if (!FormData.validateFormDatas(issue.formDatas)) {
        throw new InvalidDataError('Invalid data')
      }
      resolve()
    }).then((response) => {
      let serializedFormAndFileData = FormData.serializeFormDatas(issue.formDatas)
      let serializedData = serializedFormAndFileData.form_data.filter(formData => formData.data_objects && formData.data_objects.length > 0)
      if (serializedData.length > 0) {
        return issueApi.patchIssue(issue, serializedFormAndFileData).then((response) => {
          Log.debug('Patched Form Data for Issue Form ' + serializedData + ' as ' + AuthUser.getProfileTypeVerbose())
          return response
        }).catch((err) => {
          Log.debug('Unable to patched Form Data for Issue Form ' + serializedData + ' as ' + AuthUser.getProfileTypeVerbose(), err)
          throw err.response
        })
      }
      throw new NoDataError('No data supplied')
    })
  }
}

export default {
  state,
  mutations,
  actions
}
