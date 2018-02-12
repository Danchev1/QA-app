import mockConfirmation from './formDescriptor/formDescriptorConfirmation'
import formDataConfirmation from './formData/formDataConfirmation'

export default [{
  title: 'Confirm your account',
  description: 'Text about confirming account',
  layout: {
    title_size: 3,
    title_line_separator: ''
  },
  forms: [mockConfirmation],
  form_data: [formDataConfirmation]
}]
