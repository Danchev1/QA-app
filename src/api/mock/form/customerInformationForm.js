import formDescriptorCustomerInformation from './formDescriptor/formDescriptorCustomerInformation'
import formDataCustomerInformation from './formData/formDataCustomerInformation'

export default [{
  title: '',
  description: '',
  layout: {},
  forms: [getCustomerInformationFormAsReadonly()],
  form_data: [formDataCustomerInformation],
  service: {}
}]

function getCustomerInformationFormAsReadonly () {
  let form = JSON.parse(JSON.stringify(formDescriptorCustomerInformation))
  form.field_sets.forEach(fieldSet => {
    fieldSet.form_fields.forEach(field => {
      if (!field.properties) {
        field.properties = {}
      }
      field.properties.input_readonly = true
    })
  })
  return form
}
