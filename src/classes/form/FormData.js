import FormField from './FormField'

export default class FormData {

  constructor (id, formDescriptorId) {
    this.id = id
    this.formDescriptorId = formDescriptorId
    this.fields = {}
    this.dependencies = {}
    this.validations = {}
  }

  static asFormData (json) {
    let formData = new FormData(
      json.id,
      json.dynamic_form_id
    )

    /* Save already existing FormField data */
    json.data_objects.forEach(obj => {
      formData.fields[obj.uid] = {
        value: obj.value,
        data_group: obj.data_group
      }
    })
    return formData
  }

  static initiateFormDatas (formDescriptors) {
    /* Create FormData for all FormDescriptors */
    let formDatas = []
    formDescriptors.forEach(formDescriptor => {
      if (!formDatas.find(formData => formDescriptor.id === formData.formDescriptorId)) {
        let formData = new FormData(null, formDescriptor.id)
        formData.initiateFields(formDescriptor.fieldSets)
        formData.initiateDependencies(formDescriptor.fieldSets)
        formData.initiateValidations(formDescriptor.fieldSets)
        formDatas.push(formData)
      }
    })
    return formDatas
  }

  static loadInitialFormDatas (initalFormData, formDatas) {
    /* Combine data group and uid to find the form data */
    if (initalFormData) {
      initalFormData.forEach(dataGroups => {
        dataGroups.forEach(dataGroup => {
          let groupId = dataGroup.data_group
          dataGroup.data_objects.forEach(dataObject => {
            formDatas.forEach(formData => {
              let id = FormField.createFieldId({
                data_group: groupId,
                uid: dataObject.uid
              })
              let formField = formData.fields[id]
              if (formField) {
                formField.value = FormField.parseValue(dataObject.value, formField.type)
                if (dataObject.file) {
                  formField.file = dataObject.file
                }
              }
            })
          })
        })
      })
    }
  }

  initiateFields (fieldSets) {
    for (let fieldSet of fieldSets) {
      if (!fieldSet.fields || fieldSet.fields.length < 1) {
        continue
      }
      for (let formField of fieldSet.fields) {
        let fieldData = formField.createFormFieldData()
        this.fields[fieldData.id] = fieldData
      }
    }
  }

  initiateDependencies (fieldSets) {
    for (let fieldSet of fieldSets) {
      if (fieldSet.dependencies && fieldSet.dependencies.length > 0) {
        for (let dep of fieldSet.dependencies) {
          let dgUid = FormField.createFieldId(dep.dependent_form_field)
          if (!this.dependencies[dgUid]) {
            this.dependencies[dgUid] = []
          }
          this.dependencies[dgUid].push(fieldSet)
        }
      }
    }
  }

  initiateValidations (fieldSets) {
    for (let fieldSet of fieldSets) {
      if (!fieldSet.fields || fieldSet.fields.length < 1) {
        continue
      }

      for (let field of fieldSet.fields) {
        this.validations[field.id] = {
          is_valid: true,
          is_dependencies_satisfied: fieldSet.isDependenciesSatisfied,
          properties: field.properties,
          message: ''
        }
      }
    }
  }

  static validateFormDatas (formDatas) {
    let valid = true

    for (let formData of formDatas) {
      if (!formData.validate()) {
        valid = false
      }
    }

    return valid
  }

  validate () {
    let valid = true

    for (let id in this.validations) {
      if (!this.validations[id].is_dependencies_satisfied) {
        continue
      }
      if (!FormField.validateValue(this.fields[id].value, this.fields[id].type, this.validations[id])) {
        valid = false
      }
    }

    return valid
  }

  handleInvalidResponse (response) {
    for (let data of response) {
      let dgUid = FormField.createFieldId(data)
      if (this.validations[dgUid]) {
        this.validations[dgUid].is_valid = false
        this.validations[dgUid].message = data.message
      }
    }
  }

  static serializeFormDatas (formDatas) {
    let validData = []
    // Validate the data
    formDatas.forEach(formData => {
      let valid = formData.validate()
      if (valid) {
        validData.push(formData.fields)
      }
    })
    // Add values to data objects skipping empty fields
    let dataGroups = {}
    let formFiles = {}
    validData.forEach(formData => {
      for (let fieldId in formData) {
        let fieldData = formData[fieldId]
        if (fieldData.value === null) {
          continue
        }

        let fieldDataCopy = fieldData.copy()
        if (FormField.isFileField(fieldData.type)) {
          formFiles[fieldData.id] = fieldData.value
          // Set value to id of file so it can be matched with correctly
          fieldDataCopy.value = fieldData.id
        }

        let dgi = fieldData.dataGroup
        if (dgi in dataGroups) {
          dataGroups[dgi].data_objects.push(fieldDataCopy.toDataObject())
          continue
        }
        dataGroups[dgi] = {
          data_objects: [fieldDataCopy.toDataObject()]
        }
      }
    })
    // Transform data to API compatible structure
    let groupsArray = []
    for (let id in dataGroups) {
      groupsArray.push({
        data_group: id,
        data_objects: dataGroups[id].data_objects
      })
    }
    return { 'form_data': groupsArray, 'form_files': formFiles }
  }

  inputOnChange (field) {
    if (!this.dependencies[field.id] || this.dependencies[field.id].length < 1) {
      return
    }
    for (let fieldSet of this.dependencies[field.id]) {
      fieldSet.checkFieldSetDependencies(this)
    }
  }
}
