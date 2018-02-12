import Http from '@/classes/http/Http'

export default {
  getCustomerProfile: function () {
    return Http.get({
      url: 'profile'
    })
  }
}
