import Http from '@/classes/http/Http'

export default {
  getCustomers () {
    return Http.get({
      url: `customers`
    })
  },
  getCustomer (customerId) {
    return Http.get({
      url: `customers/${customerId}`
    })
  }
}
