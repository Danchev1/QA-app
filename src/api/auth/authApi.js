import { API_ROOT } from '@/api/config'
import Http from '@/classes/http/Http'

export default {
  loginUser: function (user) {
    return Http.post({
      base_url: API_ROOT,
      url: 'account/login',
      data: user
    })
  },
  logoutUser: function () {
    return Http._delete({
      base_url: API_ROOT,
      url: 'account/login'
    })
  },
  switchProfile (profileId) {
    return Http.post({
      url: `switch-profile/${profileId}`
    })
  },
  resetProfile () {
    return Http._delete({
      base_url: API_ROOT,
      url: `account/reset-profile`
    })
  }
}
