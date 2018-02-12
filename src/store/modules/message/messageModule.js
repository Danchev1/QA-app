import Message from '@/classes/message/Message'

const state = {
  messages: []
}

const mutations = {
  setStateMessages: (state, data) => {
    state.messages = Message.asMessages(data)
  },
  setDefaultStateMessage: (state, data) => {
    state.messages.push(Message.defaultMessage(data.message, data.level))
  },
  removeStateMessages: (state, removed) => {
    state.messages = state.messages.filter(item => !removed.includes(item))
  }
}

const actions = {

  successMessage ({ commit }, data) {
    commit('setDefaultStateMessage', { message: data, level: 1 })
  },
  infoMessage ({ commit }, data) {
    commit('setDefaultStateMessage', { message: data, level: 2 })
  },
  warningMessage ({ commit }, data) {
    commit('setDefaultStateMessage', { message: data, level: 3 })
  },
  errorMessage ({ commit }, data) {
    commit('setDefaultStateMessage', { message: data, level: 4 })
  }
}

export default {
  state,
  mutations,
  actions
}
