import Log from '@/classes/debug/Log'
import AuthUser from '@/classes/auth/AuthUser'
import certificateApi from '@/api/certificate/certificateApi'
import { InvalidDataError } from '@/classes/errors'
import FormData from '@/classes/form/FormData'
import FormDescriptor from '@/classes/form/FormDescriptor'
import Certificate from '@/classes/certificate/Certificate'

const state = {
  certificates: [],
  certificate: {},
  certificateFormDescriptor: [],
  certificateFormData: []
}
const mutations = {
  setStateCertificateFormDescriptors: (state, data) => {
    state.certificateFormDescriptor = FormDescriptor.asFormDescriptors(data)
  },
  setStateCertificateFormDatas: (state, data) => {
    state.certificateFormData = FormData.initiateFormDatas(state.certificateFormDescriptor)
    FormData.loadInitialFormDatas(data, state.certificateFormData)
    FormDescriptor.checkFormDescriptorsDependencies(state.certificateFormDescriptor, state.certificateFormData)
  },
  setStateCertificates: (state, certificates) => {
    state.certificates = certificates
  },
  setStateCertificate: (state, certificate) => {
    state.certificate = certificate
  },
  updateStateCertificate: (state, data) => {
    data.current.updateCertificate(Certificate.asCertificate(data.updated))
  }
}
const actions = {
  getCertificates ({ commit }) {
    return certificateApi.getCertificates().then((response) => {
      try {
        commit('setStateCertificates', Certificate.asCertificates(response.data))
        return true
      } catch (err) {
        Log.error('Response from server could not be handled', err)
        throw err
      }
    }, (err) => {
      Log.debug('Unable to receive ' + AuthUser.getProfileTypeVerbose() + ' certificates', err)
      throw err
    })
  },
  setupCertificateForm ({ commit }, caseId) {
    return certificateApi.getCertificateForm(caseId).then((response) => {
      commit('setStateCertificateFormDescriptors', [response.data])
      commit('setStateCertificateFormDatas', [])
      return true
    }).catch((err) => {
      Log.debug('Unable to receive Certificate form descriptor for case with id' + caseId, err)
      throw err
    })
  },
  saveCertificateForm ({ commit }, postData) {
    return new Promise((resolve, reject) => {
      if (!FormData.validateFormDatas(postData.formDatas)) {
        throw new InvalidDataError('Invalid data')
      }
      resolve()
    }).then((response) => {
      let serializedFormAndFileData = FormData.serializeFormDatas(postData.formDatas)
      let serializedData = serializedFormAndFileData.form_data.filter(formData => formData.data_objects && formData.data_objects.length > 0)
      if (serializedData.length > 0) {
        return certificateApi.postCertificateForm(postData.caseId, serializedFormAndFileData.form_data).then((response) => {
          try {
            commit('setStateCertificate', Certificate.asCertificate(response.data))
            Log.debug('Posted Form Data for Certificate Form ' + postData.caseId)
            return true
          } catch (err) {
            Log.error('Response from server could not be handled', err)
            throw err
          }
        }).catch((err) => {
          Log.debug('Unable to post Form Data for Certificate Form ' + postData.caseId, err)
          throw err.response
        })
      }
      throw new InvalidDataError('No data supplied')
    })
  },
  refreshCertificate ({ commit }, certificate) {
    return certificateApi.getCertificate(certificate.id).then((response) => {
      commit('updateStateCertificate', {
        current: certificate,
        updated: response.data
      })
      return true
    }, (err) => {
      Log.debug('Unable to receive certificate ' + certificate.id, err)
      throw err
    })
  },
  clearCertificateData ({ commit }) {
    commit('certificateFormDescriptor', [])
    commit('certificateFormData', [])
  }
}

export default {
  state,
  mutations,
  actions
}
