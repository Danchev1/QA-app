import FormField from './FormField'
export default class FormFieldData {

  constructor (id, uid, type, value, dataGroup) {
    this.id = id
    this.uid = uid
    this.type = type
    this.value = value
    this.dataGroup = dataGroup
    this.file = null
  }

  static asFormFieldDatas (json) {
    return json.map(formField => {
      return FormFieldData.asFormFieldData(formField)
    })
  }

  static asFormFieldData (json) {
    return new FormFieldData(
      json.id,
      json.uid,
      json.input_type,
      json.value ? FormField.parseValue(json.value, json.input_type) : null,
      json.data_group
    )
  }

  toDataObject () {
    return {
      uid: this.uid,
      value: this.value
    }
  }

  copy () {
    return new FormFieldData(this.id, this.uid, this.type,
      this.value, this.dataGroup)
  }

}
