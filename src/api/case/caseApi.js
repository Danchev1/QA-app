import Http from '@/classes/http/Http'
import Transform from '@/classes/form/Transform'

export default {
  getCases: function (filter = '') {
    return Http.get({
      url: `cases${filter}`
    })
  },
  getCase: function (caseId) {
    return Http.get({
      url: `cases/${caseId}`
    })
  },
  patchCase: function (caseId, payload) {
    return Http.patch({
      url: `cases/${caseId}`,
      data: payload
    })
  },
  getReviewResults: function (caseId) {
    return Http.get({
      url: `cases/${caseId}/review-results`
    })
  },
  patchReviewResult: function (reviewResult, formData) {
    return Http.patch({
      url: `cases/review-results/${reviewResult.id}`,
      data: Transform.createMultipartFormData(formData)
    })
  },
  patchReviewResultState: function (reviewResult, payload) {
    return Http.patch({
      url: `cases/review-results/${reviewResult.id}`,
      data: payload
    })
  },
  patchReviewResultsState (caseId, payload) {
    return Http.patch({
      url: `cases/${caseId}/review-results/states`,
      data: payload
    })
  },
  postFinding: function (reviewResultId, finding) {
    return Http.post({
      url: `cases/review-results/${reviewResultId}/findings`,
      data: finding
    })
  },
  patchFinding: function (finding) {
    return Http.patch({
      url: `cases/review-results/findings/${finding.id}`,
      data: finding
    })
  },
  postFindingComment: function (findingId, comment) {
    return Http.post({
      url: `cases/review-results/findings/${findingId}/comments`,
      data: comment
    })
  },
  getAuditorCases: function (auditorId) {
    return Http.get({
      url: `${auditorId}/cases`
    })
  },
  getAuditorRequests: function (auditorId, filter) {
    return Http.get({
      url: `${auditorId}/cases/requests?${filter}`
    })
  },
  postAuditorRequest: function (caseId, auditorId) {
    return Http.post({
      url: 'cases/requests',
      data: {
        case: caseId,
        auditor: auditorId
      }
    })
  },
  patchAuditorRequest: function (requestId, state) {
    return Http.patch({
      url: `cases/requests/${requestId}`,
      data: { state: state }
    })
  }
}
