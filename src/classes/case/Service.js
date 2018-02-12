
export default class Service {

  constructor (id, name, shortName, code) {
    this.id = id
    this.name = name
    this.shortName = shortName
    this.code = code
  }

  static asServices (json) {
    return json.map(service => {
      return Service.asService(service)
    })
  }

  static asService (json) {
    return new Service(
      json.id,
      json.name,
      json.short_name,
      json.code
    )
  }
}
