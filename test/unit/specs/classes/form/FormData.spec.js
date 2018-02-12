import mockFormDescriptorCustomerInformation from '@/api/mock/form/formDescriptor/formDescriptorCustomerInformation'
import mockFormDataCustomerInformation from '@/api/mock/form/formData/formDataCustomerInformation'
import FormDescriptor from '@/classes/form/FormDescriptor'
import FormFieldSet from '@/classes/form/FormFieldSet'
import FormField from '@/classes/form/FormField'
import FormData from '@/classes/form/FormData'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Class: FormData --', () => {
  sinon.stub(window.location, 'replace')

  describe(':: getOrCreateFormDatas() ::', () => {
    let formDescriptors
    let formDatas

    beforeEach(() => {
      formDescriptors = FormDescriptor.asFormDescriptors([mockFormDescriptorCustomerInformation])
      sinon.spy(FormData, 'getOrCreateFormDatas')
    })

    afterEach(() => {
      expect(FormData.getOrCreateFormDatas).callCount(1)
      FormData.getOrCreateFormDatas.restore()
    })

    describe('> IF formData.formDescriptorId NOT formDescriptor.id <', () => {
      it('should Create An Array of Form Datas', () => {
        formDatas = FormData.getOrCreateFormDatas([], formDescriptors)

        sinon.assert.match(formDatas[0].formDescriptorId, formDescriptors[0].id)

        expect(FormData.getOrCreateFormDatas).calledWith([], formDescriptors)
      })
    })

    describe('> IF formData.formDescriptorId EQUALS formDescriptor.id <', () => {
      it('should Return An Array of Form Datas', () => {
        formDatas = FormData.getOrCreateFormDatas([mockFormDataCustomerInformation], formDescriptors)

        sinon.assert.match(formDatas[0].formDescriptorId, formDescriptors[0].id)

        expect(FormData.getOrCreateFormDatas).calledWith([mockFormDataCustomerInformation], formDescriptors)
      })
    })
  })

  describe(':: asFormData() ::', () => {
    it('should Return A Form Data', () => {
      sinon.spy(FormData, 'asFormData')

      let formData = FormData.asFormData(mockFormDataCustomerInformation)

      sinon.assert.match(formData.formDescriptorId, mockFormDataCustomerInformation.dynamic_form_id)

      expect(FormData.asFormData).calledWith(mockFormDataCustomerInformation)
      expect(FormData.asFormData).callCount(1)
      FormData.asFormData.restore()
    })
  })

  describe(':: initiateFormDatas() ::', () => {
    it('should Loop Through Form Datas', () => {
      let formDescriptors = FormDescriptor.asFormDescriptors([mockFormDescriptorCustomerInformation])
      let formDatas = FormData.getOrCreateFormDatas([mockFormDataCustomerInformation], formDescriptors)
      sinon.spy(FormData, 'initiateFormDatas')
      sinon.spy(formDatas, 'forEach')
      sinon.spy(formDescriptors, 'find')

      FormData.initiateFormDatas(formDatas, formDescriptors)

      expect(FormData.initiateFormDatas).callCount(1)
      expect(formDatas.forEach).callCount(1)
      expect(formDescriptors.find).callCount(1)
      expect(FormData.initiateFormDatas).calledWith(formDatas, formDescriptors)
      FormData.initiateFormDatas.restore()
      formDatas.forEach.restore()
      formDescriptors.find.restore()
    })
  })

  describe(':: initiateFields() ::', () => {
    let formData
    let fieldSets

    beforeEach(() => {
      formData = FormData.asFormData(mockFormDataCustomerInformation)
      sinon.spy(formData, 'initiateFields')
    })

    afterEach(() => {
      expect(formData.initiateFields).callCount(1)
      formData.initiateFields.restore()
    })

    describe('> IF NOT field <', () => {
      it('should Return Immediately', () => {
        formData.fields = {}
        fieldSets = [new FormFieldSet()]

        formData.initiateFields(fieldSets)

        sinon.assert.match(formData.fields, {})

        expect(formData.initiateFields).calledWith(fieldSets)
      })
    })

    describe('> IF field <', () => {
      it('should Initiate Values For Fields', () => {
        fieldSets = FormFieldSet.asFormFieldSets(mockFormDescriptorCustomerInformation.field_sets)

        formData.initiateFields(fieldSets)

        expect(formData.fields).to.not.equal({})

        expect(formData.initiateFields).calledWith(fieldSets)
      })
    })
  })

  describe(':: initiateDependencies() ::', () => {
    it('should Initiate Dependencies For Fields', () => {
      let formData = FormData.asFormData(mockFormDataCustomerInformation)
      let fieldSets = FormFieldSet.asFormFieldSets(mockFormDescriptorCustomerInformation.field_sets)
      sinon.spy(formData, 'initiateDependencies')

      formData.initiateDependencies(fieldSets)

      expect(formData.rules).to.not.equal(null)

      expect(formData.initiateDependencies).callCount(1)
      expect(formData.initiateDependencies).calledWith(fieldSets)
      formData.initiateDependencies.restore()
    })
  })

  describe(':: initiateValidations() ::', () => {
    let formData
    let fieldSets

    beforeEach(() => {
      formData = FormData.asFormData(mockFormDataCustomerInformation)
      sinon.spy(formData, 'initiateValidations')
    })

    afterEach(() => {
      expect(formData.initiateValidations).callCount(1)
      formData.initiateValidations.restore()
    })

    describe('> IF NOT field <', () => {
      it('should Return Immediately', () => {
        formData.validations = {}
        fieldSets = [new FormFieldSet()]

        formData.initiateValidations(fieldSets)

        sinon.assert.match(formData.validations, {})

        expect(formData.initiateValidations).calledWith(fieldSets)
      })
    })

    describe('> IF field <', () => {
      it('should Initiate Validations For Fields', () => {
        fieldSets = FormFieldSet.asFormFieldSets(mockFormDescriptorCustomerInformation.field_sets)

        formData.initiateValidations(fieldSets)

        expect(formData.validations).to.not.equal({})

        expect(formData.initiateValidations).calledWith(fieldSets)
      })
    })
  })

  describe(':: validateFormDatas() ::', () => {
    let formDatas

    beforeEach(() => {
      formDatas = [FormData.asFormData(mockFormDataCustomerInformation)]
      sinon.spy(FormData, 'validateFormDatas')
    })

    afterEach(() => {
      expect(FormData.validateFormDatas).callCount(1)
      FormData.validateFormDatas.restore()
    })

    describe('> IF formData IS valid <', () => {
      it('should Return True', () => {
        sinon.stub(formDatas[0], 'validate').callsFake(function () {
          return true
        })

        let result = FormData.validateFormDatas(formDatas)

        sinon.assert.match(result, true)

        expect(FormData.validateFormDatas).calledWith(formDatas)

        formDatas[0].validate.restore()
      })
    })

    describe('> IF formData NOT valid <', () => {
      it('should Return False', () => {
        sinon.stub(formDatas[0], 'validate').callsFake(function () {
          return false
        })

        let result = FormData.validateFormDatas(formDatas)

        sinon.assert.match(result, false)

        expect(FormData.validateFormDatas).calledWith(formDatas)

        formDatas[0].validate.restore()
      })
    })
  })

  describe(':: validate() ::', () => {
    let formData

    beforeEach(() => {
      formData = FormData.asFormData(mockFormDataCustomerInformation)

      sinon.spy(formData, 'validate')
    })

    afterEach(() => {
      expect(formData.validate).callCount(1)
      formData.validate.restore()
    })

    describe('> IF dependenciesSatisfied <', () => {
      beforeEach(() => {
        formData.fields = {
          'test': {
            value: 'test',
            type: 'text'
          }
        }
        formData.validations = {
          'test': {
            is_valid: true,
            is_dependencies_satisfied: true,
            properties: {}
          }
        }
      })

      describe('> IF formData IS valid <', () => {
        it('should Return True', () => {
          sinon.stub(FormField, 'validateValue').callsFake(function () {
            return true
          })

          let result = formData.validate()

          sinon.assert.match(result, true)

          expect(formData.validate).calledWith()

          FormField.validateValue.restore()
        })
      })

      describe('> IF formData NOT valid <', () => {
        it('should Return False', () => {
          sinon.stub(FormField, 'validateValue').callsFake(function () {
            return false
          })

          let result = formData.validate()

          sinon.assert.match(result, false)

          expect(formData.validate).calledWith()

          FormField.validateValue.restore()
        })
      })
    })

    describe('> IF NOT dependenciesSatisfied <', () => {
      beforeEach(() => {
        formData.fields = {
          'test': {
            value: 'test',
            type: 'text'
          }
        }
        formData.validations = {
          'test': {
            is_valid: true,
            is_dependencies_satisfied: false,
            properties: {}
          }
        }
      })

      it('should Return True', () => {
        let result = formData.validate()

        sinon.assert.match(result, true)

        expect(formData.validate).calledWith()
      })
    })
  })

  describe(':: serializeFormDatas() ::', () => {
    let formData

    beforeEach(() => {
      formData = FormData.asFormData(mockFormDataCustomerInformation)

      for (let fieldId in formData.fields) {
        formData.validations[fieldId] = {
          is_valid: true,
          is_dependencies_satisfied: true
        }
      }

      sinon.spy(FormData, 'serializeFormDatas')
    })

    afterEach(() => {
      expect(FormData.serializeFormDatas).callCount(1)
      FormData.serializeFormDatas.restore()
    })

    it('should Return Array Of Serialized Data', () => {
      let result = FormData.serializeFormDatas([formData])

      sinon.assert.match(result.length, [formData].length)
      sinon.assert.match(result[0].dynamic_form_id, formData.formDescriptorId)

      expect(FormData.serializeFormDatas).calledWith([formData])
    })
  })

  describe(':: serialize() ::', () => {
    let formData
    let undefinedFieldId
    let definedFieldId

    beforeEach(() => {
      formData = FormData.asFormData(mockFormDataCustomerInformation)
      undefinedFieldId = 'test'
      definedFieldId = mockFormDataCustomerInformation.data_objects[0].form_field_id.toString()

      formData.fields[undefinedFieldId] = {
        value: null
      }
      for (let fieldId in formData.fields) {
        formData.validations[fieldId] = {
          is_valid: true,
          is_dependencies_satisfied: true
        }
      }

      sinon.spy(formData, 'serialize')
    })

    afterEach(() => {
      expect(formData.serialize).callCount(1)
      formData.serialize.restore()
    })

    it('should Only Serialize Defined Data', () => {
      let result = formData.serialize()

      let undefinedField = result.data_objects.find(obj => obj.form_field_id === undefinedFieldId)
      let definedField = result.data_objects.find(obj => obj.form_field_id === definedFieldId)
      sinon.assert.match(undefinedField, undefined)
      sinon.assert.match(definedField.value, mockFormDataCustomerInformation.data_objects[0].value)

      sinon.assert.match(result.data_objects.length, Object.keys(formData.fields).length - 1)
      sinon.assert.match(result.dynamic_form_id, formData.formDescriptorId)

      expect(formData.serialize).calledWith()
    })
  })

  describe(':: inputOnChange() ::', () => {
    let formData
    let fieldSets

    beforeEach(() => {
      formData = FormData.asFormData(mockFormDataCustomerInformation)
      fieldSets = FormFieldSet.asFormFieldSets(mockFormDescriptorCustomerInformation.field_sets)
      formData.initiateFields(fieldSets)
      formData.initiateDependencies(fieldSets)
      formData.initiateValidations(fieldSets)

      sinon.spy(formData, 'inputOnChange')
    })

    afterEach(() => {
      expect(formData.inputOnChange).callCount(1)
      formData.inputOnChange.restore()
    })

    describe('> IF NOT dependencies[field.id] <', () => {
      it('should Return Immediately', () => {
        formData.inputOnChange(fieldSets[0].fields[0])

        expect(formData.inputOnChange).calledWith(fieldSets[0].fields[0])
      })
    })

    describe('> IF dependencies[field.id] <', () => {
      it('should Loop Through Dependencies', () => {
        formData.inputOnChange(fieldSets[1].fields[2])

        expect(formData.inputOnChange).calledWith(fieldSets[1].fields[2])
      })
    })
  })
})
