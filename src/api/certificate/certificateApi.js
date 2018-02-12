import Http from '@/classes/http/Http'

export default {
  getCertificateForm (caseId) {
    return Http.get({
      url: `cases/${caseId}/certificates`
    })
  },
  postCertificateForm (caseId, formData) {
    return Http.post({
      url: `cases/${caseId}/certificates`,
      data: formData
    })
  },
  getCertificates () {
    return Http.get({
      url: `certificates`
    })
  },
  getCertificate (certificateId) {
    return Http.get({
      url: `certificates/${certificateId}`
    })
  }
}
