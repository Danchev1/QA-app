import Log from '@/classes/debug/Log'
import filesApi from '@/api/files/filesApi'
import Document from '@/classes/case/Document'
const state = {
  files: []
}

const mutations = {
  setStateFiles: (state, data) => {
    state.files = data
  }
}

const actions = {
  getFiles ({ commit }, caseId) {
    return filesApi.getFiles(caseId).then((response) => {
      commit('setStateFiles', Document.asDocuments(response.data))
    }, (err) => {
      Log.debug('Unable to receive files for case with ID ' + caseId, err)
      throw err
    })
  }
}

export default {
  state,
  mutations,
  actions
}
