import moment from 'moment'

let globalFormatDateTime = 'YYYY-MM-DD'

export function getDetailDisplayContext (_case, specification) {
  specification.map(function (obj) {
    let keys = obj.item_key.split('.')
    let value = _case
    for (let key of keys) {
      value = value[key]
    }
    obj.value = value
    return obj
  })
  return specification
}

export function dateTimeFormat (date, formatDateTime = globalFormatDateTime) {
  return moment(date).format(formatDateTime)
}
