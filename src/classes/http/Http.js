import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

export default class Http {

  static init (properties) {
    let httpMockAdapter = process.env.USE_MOCK_DATA ? require('./HttpMockAdapter') : null
    if (httpMockAdapter) httpMockAdapter.default.prototype.init(axios)
    axios.defaults.baseURL = process.API_ENDPOINT
    if (properties.hasOwnProperty('base_url')) {
      axios.defaults.baseURL = properties.base_url
    }
  }

  static get (properties) {
    Http.init(properties)
    return axios({
      method: 'get',
      url: properties.url,
      params: properties.params
    })
  }

  static post (properties) {
    Http.init(properties)
    return axios({
      method: 'post',
      url: properties.url,
      data: properties.data
    })
  }

  static patch (properties) {
    Http.init(properties)
    return axios({
      method: 'patch',
      url: properties.url,
      data: properties.data
    })
  }

  static _delete (properties) {
    Http.init(properties)
    return axios({
      method: 'delete',
      url: properties.url
    })
  }

}
