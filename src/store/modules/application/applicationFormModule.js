import Log from '@/classes/debug/Log'
import formApi from '@/api/form/formApi'
import confirmationApi from '@/api/confirmation/confirmationApi'
import FormDescriptor from '@/classes/form/FormDescriptor'
import FormData from '@/classes/form/FormData'
import Service from '@/classes/case/Service'
import { InvalidDataError } from '@/classes/errors'

const state = {
  title: '',
  description: '',
  layout: {},
  formDescriptors: [],
  formDatas: [],
  service: {}
}

const mutations = {
  setStateTitle: (state, data) => {
    state.title = data
  },
  setStateDescription: (state, data) => {
    state.description = data
  },
  setStateLayout: (state, data) => {
    state.layout = data
  },
  setStateFormDescriptors: (state, data) => {
    state.formDescriptors = FormDescriptor.asFormDescriptors(data)
  },
  setStateFormDatas: (state, data) => {
    state.formDatas = FormData.initiateFormDatas(state.formDescriptors)
    FormData.loadInitialFormDatas(data, state.formDatas)
    FormDescriptor.checkFormDescriptorsDependencies(state.formDescriptors, state.formDatas)
  },
  setStateService: (state, data) => {
    state.service = Service.asService(data)
  }
}

const actions = {
  setupApplicationForm ({ commit }, code) {
    return formApi.getApplicationForm(code).then((response) => {
      let data = response.data[0]
      commit('setStateTitle', data.title)
      commit('setStateDescription', data.description)
      commit('setStateLayout', data.layout)
      commit('setStateFormDescriptors', data.forms)
      commit('setStateFormDatas', data.form_data)
      commit('setStateService', data.service)
      return true
    }).catch((err) => {
      Log.debug('Unable to receive Form descriptor for ' + code, err)
      throw err
    })
  },
  saveApplicationForm ({ commit }, postData) {
    return new Promise((resolve, reject) => {
      if (!FormData.validateFormDatas(postData.formDatas)) {
        throw new InvalidDataError('Invalid data')
      }
      resolve()
    }).then((response) => {
      let serializedFormAndFileData = FormData.serializeFormDatas(postData.formDatas)
      let serializedData = serializedFormAndFileData.form_data.filter(formData => formData.data_objects && formData.data_objects.length > 0)
      if (serializedData.length > 0) {
        return formApi.postApplicationFormAsGuest(postData.service.code, serializedFormAndFileData).then((response) => {
          Log.debug('Posted Form Data for Service Form ' + postData.service.code + ' as Guest')
          return response
        }).catch((err) => {
          Log.debug('Unable to post Form Data for Service Form ' + postData.service.code + ' as Guest', err)
          throw err.response
        })
      }
      throw new InvalidDataError('No data supplied')
    })
  },
  setupConfirmationForm ({ commit }, code) {
    return confirmationApi.getConfirmationForm(code).then((response) => {
      let data = response.data
      commit('setStateFormDescriptors', [data])
      commit('setStateFormDatas', [])
      return true
    }, (err) => {
      Log.debug('Unable to receive Confirmation form descriptor' + err)
      return false
    })
  },
  saveConfirmationForm ({ commit }, postData) {
    if (!FormData.validateFormDatas(postData.formDatas)) {
      return null
    }
    let serializedFormData = FormData.serializeFormDatas(postData.formDatas).form_data
    serializedFormData = serializedFormData.filter(formData => formData.data_objects && formData.data_objects.length > 0)
    if (serializedFormData.length > 0) {
      return confirmationApi.postConfirmationForm(postData.code, serializedFormData).then((response) => {
        Log.debug('Posted Confirmation Form Data for Confirmation Form ' + postData.code)
        return response
      }, (err) => {
        Log.debug('Unable to post Form Data for Confirmation Form ' + postData.code, err)
        throw err
      })
    }
  },
  clearData ({ commit }) {
    commit('setStateTitle', '')
    commit('setStateDescription', '')
    commit('setStateLayout', {})
    commit('setStateFormDescriptors', [])
    commit('setStateFormDatas', [])
    commit('setStateService', {})
  }
}

export default {
  state,
  mutations,
  actions
}
