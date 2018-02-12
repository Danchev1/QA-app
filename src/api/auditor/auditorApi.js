import Http from '@/classes/http/Http'

export default {
  getAuditors: function () {
    return Http.get({
      url: 'auditors'
    })
  }
}
