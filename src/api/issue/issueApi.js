import Http from '@/classes/http/Http'
import Transform from '@/classes/form/Transform'

export default {
  getIssues: function () {
    return Http.get({
      url: 'issues'
    })
  },

  patchIssue: function (issue, formAndFileData) {
    return Http.patch({
      url: `issues/${issue.id}`,
      data: Transform.createMultipartFormData(formAndFileData)
    })
  }
}
