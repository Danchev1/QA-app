import Http from '@/classes/http/Http'

export default {
  getConfirmationForm: function (code) {
    return Http.get({
      url: `application/confirm/${code}`
    })
  },
  postConfirmationForm: function (code, formData) {
    return Http.post({
      url: `application/confirm/${code}`,
      data: formData
    })
  }
}
