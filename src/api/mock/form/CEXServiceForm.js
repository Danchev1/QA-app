import formDescriptorCustomerInformation from './formDescriptor/formDescriptorCustomerInformation'
import formDescriptorCEX from './formDescriptor/formDescriptorCEX'
import formDataCustomerInformation from './formData/formDataCustomerInformation'
import formDataCEX from './formData/formDataCEX'

export default [{
  title: 'Application form step 1 CEX',
  description: 'Text here depending on the certification they are applying for, so needs to be dynamic',
  layout: {
    title_size: 2,
    title_line_separator: ''
  },
  forms: [formDescriptorCustomerInformation, formDescriptorCEX],
  form_data: [formDataCustomerInformation, formDataCEX],
  scope: 'application',
  service: {
    id: 1,
    name: 'Service Name',
    short_name: 'Service Short Name',
    code: 'CEX'
  }
}]
