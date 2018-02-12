import Customer from '@/classes/case/Customer'
import Documents from '@/classes/case/Document'
import State from '@/classes/case/State'
import { dateTimeFormat } from '@/utility/utility_functions'

export default class Certificate {
  constructor (id, certificateNumber, state, customer, issueDate, expiryDate, validityPeriod, filePDF, filePNG) {
    this.id = id
    this.certificateNumber = certificateNumber
    this.state = state
    this.customer = customer
    this.issueDate = issueDate
    this.expiryDate = expiryDate
    this.validityPeriod = validityPeriod
    this.filePDF = filePDF
    this.filePNG = filePNG
  }

  static asCertificates (json) {
    return json.map(certificate => {
      return Certificate.asCertificate(certificate)
    })
  }

  static asCertificate (json) {
    return new Certificate(
      json.id,
      json.certificate_number,
      json.state ? State.asState(json.state) : null,
      json.owner ? Customer.asCustomer(json.owner) : null,
      json.issued_date ? dateTimeFormat(json.issued_date) : '',
      json.expiry_date ? dateTimeFormat(json.expiry_date) : '',
      json.validity_period,
      json.pdf ? Documents.asDocument(json.pdf) : null,
      json.png ? Documents.asDocument(json.pdf) : null,
    )
  }

  updateCertificate (certificate) {
    if (this.id !== certificate.id) {
      throw new Error('Objects missmatch')
    }
    this.certificateNumber = certificate.certificateNumber
    this.state = certificate.state
    this.customer = certificate.customer
    this.issueDate = certificate.issueDate
    this.expiryDate = certificate.expiryDate
    this.validityPeriod = certificate.validityPeriod
    this.filePDF = certificate.filePDF
    this.filePNG = certificate.filePNG
  }
}
