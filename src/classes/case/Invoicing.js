export default class Invoicing {
  constructor (reference, distribution, registrationNumber, companyName, email, vat, address, postalCode, city, country) {
    this.reference = reference
    this.distribution = distribution
    this.registrationNumber = registrationNumber
    this.companyName = companyName
    this.email = email
    this.vat = vat
    this.address = address
    this.postalCode = postalCode
    this.city = city
    this.country = country
  }

  static asInvoicings (json) {
    return json.map(invoicing => {
      return Invoicing.asInvoicing(invoicing)
    })
  }

  static asInvoicing (json) {
    return new Invoicing(
      json.reference,
      json.distribution,
      json.registration_number,
      json.company_name,
      json.email,
      json.vat,
      json.address,
      json.postal_code,
      json.city,
      json.country
    )
  }
}
