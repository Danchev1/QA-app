import Http from '@/classes/http/Http'

export default {
  getFiles (caseId) {
    return Http.get({
      url: `cases/${caseId}/files`
    })
  }
}
