import { dateTimeFormat } from '@/utility/utility_functions'

export default class Document {
  constructor (documentInfo, url, filename, updatedAt) {
    this.documentInfo = documentInfo
    this.url = url
    this.filename = filename
    this.updatedAt = updatedAt
  }

  static asDocuments (json) {
    return json.map(document => {
      return Document.asDocument(document.data_objects.pop())
    })
  }

  static asDocument (json) {
    return new Document(
      json.uid,
      json.file.url,
      json.file.name,
      json.file.updated_at ? dateTimeFormat(json.file.updated_at) : '',
    )
  }
}
