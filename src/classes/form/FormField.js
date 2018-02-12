import FormFieldData from './FormFieldData'

export default class FormField {
  static ERROR_MESSAGES = {
    MAX_VALUE: 'This field must have a value less than or equal to %s.',
    MIN_VALUE: 'This field must have a value greater than or equal to %s.',
    INPUT_REQUIRED: 'This field is required',
    VALIDATION_PATTERN: 'This field does not match the requested format.'
  }

  constructor (id, uid, type, label, layout, properties, dataGroup) {
    this.id = id
    this.uid = uid
    this.type = type
    this.label = label
    this.layout = layout
    this.properties = properties
    this.dataGroup = dataGroup
  }

  static asFormFields (json) {
    return json.map(formField => {
      return FormField.asFormField(formField)
    })
  }

  static createFieldId (field) {
    // Generates a unique id of data group and uid
    return field.data_group + '@' + field.uid
  }

  static asFormField (json) {
    return new FormField(
      FormField.createFieldId(json),
      json.uid,
      json.input_type,
      json.label,
      json.layout ? json.layout : { position: -1 },
      json.properties ? json.properties : {},
      json.data_group
    )
  }

  createFormFieldData () {
    return FormFieldData.asFormFieldData({
      id: this.id,
      uid: this.uid,
      input_type: this.type,
      value: FormField.parseValue(this.properties.default_value, this.type),
      data_group: this.dataGroup
    })
  }

  static parseValue (value, type) {
    if (!value) {
      if (FormField.isCheckboxField(type)) {
        return false
      }
      return null
    }

    if (FormField.isDateField(type)) {
      let date = new Date(value)
      let month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      return date.getFullYear() + '-' + month + '-' + date.getDate()
    } else if (FormField.isNumberField(type)) {
      return parseInt(value)
    } else if (FormField.isCheckboxField(type)) {
      return value === true || value === 1 || value.toLowerCase() === 'true' || value.toLowerCase() === '1'
    } else {
      return value
    }
  }

  static validateValue (value, type, validation) {
    if (!validation.properties || Object.keys(validation.properties).length === 0) {
      validation.is_valid = true
      validation.message = ''
      return true
    }

    if (value) {
      if (validation.properties.hasOwnProperty('validation_pattern') && validation.properties.validation_pattern) {
        if (FormField.isTextField(type) || FormField.isNumberField(type) || FormField.isPasswordField(type)) {
          let regString = validation.properties.validation_pattern
          if (regString[0] !== '^') regString = '^' + regString
          regString = regString + '$'

          let reg = new RegExp(regString)
          if (!reg.test(value)) {
            validation.is_valid = false
            validation.message = FormField.ERROR_MESSAGES.VALIDATION_PATTERN
            return false
          }
        }
      }

      if (validation.properties.hasOwnProperty('max_value') && validation.properties.max_value) {
        if (FormField.isNumberField(type)) {
          let number = parseInt(value)
          let maxNumber = parseInt(validation.properties.max_value)
          if (number && number > maxNumber) {
            validation.is_valid = false
            validation.message = FormField.ERROR_MESSAGES.MAX_VALUE.replace(/%s/, maxNumber.toString())
            return false
          }
        } else if (FormField.isDateField(type)) {
          let date = new Date(value)
          let maxDate = new Date(validation.properties.max_value)
          if (date > maxDate) {
            validation.is_valid = false
            validation.message = FormField.ERROR_MESSAGES.MAX_VALUE.replace(/%s/, maxDate.toLocaleDateString())
            return false
          }
        }
      }

      if (validation.properties.hasOwnProperty('min_value') && validation.properties.min_value) {
        if (FormField.isNumberField(type)) {
          let number = parseInt(value)
          let minNumber = parseInt(validation.properties.min_value)
          if (number && number < minNumber) {
            validation.is_valid = false
            validation.message = FormField.ERROR_MESSAGES.MIN_VALUE.replace(/%s/, minNumber.toString())
            return false
          }
        } else if (FormField.isDateField(type)) {
          let date = new Date(value)
          let minDate = new Date(validation.properties.min_value)
          if (date < minDate) {
            validation.is_valid = false
            validation.message = FormField.ERROR_MESSAGES.MIN_VALUE.replace(/%s/, minDate.toLocaleDateString())
            return false
          }
        }
      }
    } else {
      if (validation.properties.hasOwnProperty('input_required') && validation.properties.input_required) {
        validation.is_valid = false
        validation.message = FormField.ERROR_MESSAGES.INPUT_REQUIRED
        return false
      }
    }

    validation.is_valid = true
    validation.message = ''
    return true
  }

  static isTextField (type) {
    return type.toLowerCase() === 'text' ||
      type.toLowerCase() === 'email'
  }

  static isPasswordField (type) {
    return type.toLowerCase() === 'password'
  }

  static isNumberField (type) {
    return type.toLowerCase() === 'number'
  }

  static isDateField (type) {
    return type.toLowerCase() === 'date'
  }

  static isFileField (type) {
    return type.toLowerCase() === 'file'
  }

  static isCheckboxField (type) {
    return type.toLowerCase() === 'checkbox'
  }

  static isRadioField (type) {
    return type.toLowerCase() === 'radio'
  }

  static isSelectField (type) {
    return type.toLowerCase() === 'select'
  }

  static isRangeField (type) {
    return type.toLowerCase() === 'range'
  }
}
