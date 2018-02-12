import Log from '@/classes/debug/Log'
import formEditApi from '@/api/customer_edit/formEditApi'
import { InvalidDataError } from '@/classes/errors'
import FormData from '@/classes/form/FormData'
import FormDescriptor from '@/classes/form/FormDescriptor'

const state = {
  CustomerEditFormDescriptors: [],
  CustomerEditFormDatas: []
}

const mutations = {
  setStateEditFormDescriptors: (state, data) => {
    state.CustomerEditFormDescriptors = FormDescriptor.asFormDescriptors(data)
  },
  setStateEditFormDatas: (state, data) => {
    state.CustomerEditFormDatas = FormData.initiateFormDatas(state.CustomerEditFormDescriptors)
    FormData.loadInitialFormDatas(data, state.CustomerEditFormDatas)
    FormDescriptor.checkFormDescriptorsDependencies(state.CustomerEditFormDescriptors, state.CustomerEditFormDatas)
  }
}

const actions = {
  setupCustomerEditForm ({ commit }, profileId) {
    return formEditApi.getCustomerEditForm(profileId).then((response) => {
      commit('setStateEditFormDescriptors', [response.data])
      commit('setStateEditFormDatas', [response.data.form_data])
      return true
    }).catch((err) => {
      Log.debug('Unable to receive Edit form descriptor for ' + profileId, err)
      throw err
    })
  },
  updateCustomerInformation ({ commit }, postData) {
    return new Promise((resolve, reject) => {
      if (!FormData.validateFormDatas(postData.formDatas)) {
        throw new InvalidDataError('Invalid data')
      }
      resolve()
    }).then((response) => {
      let serializedFormAndFileData = FormData.serializeFormDatas(postData.formDatas)
      let serializedData = serializedFormAndFileData.form_data.filter(formData => formData.data_objects && formData.data_objects.length > 0)
      if (serializedData.length > 0) {
        return formEditApi.patchCustomerInformation(serializedFormAndFileData, postData.profileId).then((response) => {
          Log.debug('Form Data patched for Customer Edit Form for customer with' + postData.profileId)
          return response
        }).catch((err) => {
          Log.debug('Unable to patch Customer Edit Form for customer' + postData.profileId + ', ', err)
          throw err.response
        })
      }
      throw new InvalidDataError('No data supplied')
    })
  }
}

export default {
  state,
  mutations,
  actions
}
