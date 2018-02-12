import FormFieldSet from './FormFieldSet'

export default class FormDescriptor {

  constructor (id, fieldSets) {
    this.id = id
    this.fieldSets = fieldSets
  }

  static asFormDescriptors (json) {
    return json.map(formDescriptor => {
      return FormDescriptor.asFormDescriptor(formDescriptor)
    })
  }

  static asFormDescriptor (json) {
    return new FormDescriptor(
      json.id,
      json.field_sets ? FormFieldSet.asFormFieldSets(json.field_sets) : []
    )
  }

  static checkFormDescriptorsDependencies (formDescriptors, formDatas) {
    formDescriptors.forEach(formDescriptor => {
      let formData = formDatas.find(formData => formDescriptor.id === formData.formDescriptorId)
      formDescriptor.checkFormDescriptorDependencies(formData)
    })
  }

  checkFormDescriptorDependencies (formData) {
    if (!this.fieldSets || this.fieldSets.length < 1) {
      return
    }

    this.fieldSets.forEach(form => {
      form.checkFieldSetDependencies(formData)
    })
  }

  sortFieldSets () {
    this.fieldSets.sort(function (a, b) {
      return a.layout.position - b.layout.position
    })
  }
}
