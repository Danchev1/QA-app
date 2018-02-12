import Http from '@/classes/http/Http'

export default {
  getServices: function () {
    return Http.get({
      url: 'services'
    })
  }
}
