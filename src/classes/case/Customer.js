import Invoicing from './Invoicing'
import Document from './Document'
import { dateTimeFormat } from '@/utility/utility_functions'

export default class Customer {
  constructor (id, modified, email, website, firstName, lastName, phoneNumber, mobileNumber, personNumber, customerId, userId, postalCode, postalAddress, city, country, invoicing, documents) {
    this.id = id
    this.modified = modified
    this.email = email
    this.website = website
    this.firstName = firstName
    this.lastName = lastName
    this.phoneNumber = phoneNumber
    this.mobileNumber = mobileNumber
    this.personNumber = personNumber
    this.customerId = customerId
    this.userId = userId
    this.postalCode = postalCode
    this.postalAddress = postalAddress
    this.city = city
    this.country = country
    this.invoicing = invoicing
    this.documents = documents
  }

  static asCustomers (json) {
    return json.map(customer => {
      return Customer.asCustomer(customer)
    })
  }

  static asCustomer (json) {
    return new Customer(
      json.id,
      json.modified ? dateTimeFormat(json.modified) : '',
      json.email,
      json.website,
      json.first_name,
      json.last_name,
      json.phone,
      json.mobile,
      json.person_number,
      json.customer_id,
      json.user_id,
      json.address.postal_address,
      json.address.postal_code,
      json.address.postal_city,
      json.country,
      json.invoicing ? Invoicing.asInvoicing(json.invoicing) : null,
      json.documents ? Document.asDocuments(json.documents) : []
    )
  }

  updateCurrentCustomer (customer) {
    if (this.id !== customer.id) {
      throw new Error('Objects missmatch')
    }
    this.modified = customer.modified
    this.email = customer.email
    this.website = customer.website
    this.firstName = customer.firstName
    this.lastName = customer.lastName
    this.phoneNumber = customer.phoneNumber
    this.mobileNumber = customer.mobileNumber
    this.personNumber = customer.personNumber
    this.customerId = customer.customerId
    this.userId = customer.userId
    this.postalCode = customer.postalCode
    this.postalAddress = customer.postalAddress
    this.city = customer.city
    this.country = customer.country
    this.invoicing = customer.invoicing
    this.documents = customer.documents
  }
}
