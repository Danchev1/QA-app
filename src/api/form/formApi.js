import Http from '@/classes/http/Http'
import Transform from '@/classes/form/Transform'

export default {
  getApplicationForm: function (code) {
    return Http.get({
      url: 'dynamic-form',
      params: {
        code: code
      }
    })
  },
  postApplicationFormAsGuest: function (serviceType, formAndFileData) {
    return Http.post({
      url: `application/${serviceType}`,
      data: Transform.createMultipartFormData(formAndFileData)
    })
  }
}
