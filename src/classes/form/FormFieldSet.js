import FormField from './FormField'

export default class FormFieldSet {

  constructor (id, title, description, layout, dependencies, fields) {
    this.id = id
    this.title = title
    this.description = description
    this.layout = layout
    this.dependencies = dependencies
    this.fields = fields
    this.isDependenciesSatisfied = true
  }

  static asFormFieldSets (json) {
    return json.map(fieldSet => {
      return FormFieldSet.asFormFieldSet(fieldSet)
    })
  }

  static asFormFieldSet (json) {
    return new FormFieldSet(
      json.id,
      json.title,
      json.description,
      json.layout,
      json.dependencies,
      json.form_fields ? FormField.asFormFields(json.form_fields) : []
    )
  }

  setIsDependenciesSatisfied (value, formData) {
    this.isDependenciesSatisfied = value
    this.fields.forEach(field => {
      formData.validations[field.id].is_dependencies_satisfied = value
    })
  }

  checkFieldSetDependencies (formData) {
    if (!this.dependencies || this.dependencies.length < 1) {
      this.setIsDependenciesSatisfied(true, formData)
      return
    }
    for (let dependency of this.dependencies) {
      let dgUid = FormField.createFieldId(dependency.dependent_form_field)
      if (formData.fields[dgUid] && formData.fields[dgUid].value !==
        FormField.parseValue(dependency.required_value, formData.fields[dgUid].type)) {
        this.setIsDependenciesSatisfied(false, formData)
        return
      }
    }

    this.setIsDependenciesSatisfied(true, formData)
  }

  sortFields () {
    this.fields.sort(function (a, b) {
      return a.layout.position - b.layout.position
    })
  }
}
