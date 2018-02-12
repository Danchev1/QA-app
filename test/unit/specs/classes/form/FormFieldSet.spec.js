import mockFormDescriptorCustomerInformation from '@/api/mock/form/formDescriptor/formDescriptorCustomerInformation'
import FormFieldSet from '@/classes/form/FormFieldSet'
import FormData from '@/classes/form/FormData'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Class: FormFieldSet --', () => {
  sinon.stub(window.location, 'replace')

  describe(':: asFormFieldSets() ::', () => {
    it('should Create An Array Of FormFieldSets', () => {
      sinon.spy(FormFieldSet, 'asFormFieldSets')
      let mockFieldSets = mockFormDescriptorCustomerInformation.field_sets

      let fieldSets = FormFieldSet.asFormFieldSets(mockFieldSets)

      sinon.assert.match(fieldSets.length, mockFieldSets.length)

      expect(FormFieldSet.asFormFieldSets).callCount(1)
      expect(FormFieldSet.asFormFieldSets).calledWith(mockFieldSets)
      FormFieldSet.asFormFieldSets.restore()
    })
  })

  describe(':: asFormFieldSet() ::', () => {
    it('should Create A FormFieldSet', () => {
      sinon.spy(FormFieldSet, 'asFormFieldSet')
      let mockFieldSet = mockFormDescriptorCustomerInformation.field_sets[0]

      let fieldSet = FormFieldSet.asFormFieldSet(mockFieldSet)

      sinon.assert.match(fieldSet.id, mockFieldSet.id)

      expect(FormFieldSet.asFormFieldSet).callCount(1)
      expect(FormFieldSet.asFormFieldSet).calledWith(mockFieldSet)
      FormFieldSet.asFormFieldSet.restore()
    })
  })

  describe(':: setIsDependenciesSatisfied() ::', () => {
    it('should Set isDependenciesSatisfied To False', () => {
      let mockFieldSet = mockFormDescriptorCustomerInformation.field_sets[0]
      let fieldSet = FormFieldSet.asFormFieldSet(mockFieldSet)

      let formData = new FormData()
      formData.initiateValidations([fieldSet])

      sinon.spy(fieldSet, 'setIsDependenciesSatisfied')

      fieldSet.setIsDependenciesSatisfied(false, formData)

      sinon.assert.match(fieldSet.isDependenciesSatisfied, false)
      sinon.assert.match(formData.validations[fieldSet.fields[0].id].is_dependencies_satisfied, false)

      expect(fieldSet.setIsDependenciesSatisfied).callCount(1)
      expect(fieldSet.setIsDependenciesSatisfied).calledWith(false, formData)
      fieldSet.setIsDependenciesSatisfied.restore()
    })
  })

  describe(':: checkFieldSetDependencies() ::', () => {
    describe('> IF NOT dependencies <', () => {
      let fieldSet
      let formData

      beforeEach(() => {
        fieldSet = new FormFieldSet()
        fieldSet.fields = []
        fieldSet.isDependenciesSatisfied = false

        formData = new FormData()

        sinon.spy(fieldSet, 'checkFieldSetDependencies')
      })

      afterEach(() => {
        expect(fieldSet.checkFieldSetDependencies).callCount(1)
        fieldSet.checkFieldSetDependencies.restore()
      })

      it('should Set isDependenciesSatisfied To True', () => {
        fieldSet.checkFieldSetDependencies(formData)

        sinon.assert.match(fieldSet.isDependenciesSatisfied, true)

        expect(fieldSet.checkFieldSetDependencies).calledWith(formData)
      })
    })

    describe('> ELSE IF dependencies <', () => {
      let fieldSet
      let formData

      beforeEach(() => {
        fieldSet = new FormFieldSet()
        fieldSet.dependencies = [{
          dependent_form_field: '1',
          required_value: '2'
        }]
        fieldSet.fields = []

        formData = new FormData()
        formData.fields = {
          '1': {
            type: 'text'
          }
        }

        sinon.spy(fieldSet, 'checkFieldSetDependencies')
      })

      afterEach(() => {
        expect(fieldSet.checkFieldSetDependencies).callCount(1)
        fieldSet.checkFieldSetDependencies.restore()
      })

      describe('> IF fields[dependency.id] NOT dependency.value <', () => {
        beforeEach(() => {
          fieldSet.isDependenciesSatisfied = true
          formData.fields['1'].value = '1'
        })

        it('should Set isDependenciesSatisfied To False', () => {
          fieldSet.checkFieldSetDependencies(formData)

          sinon.assert.match(fieldSet.isDependenciesSatisfied, false)

          expect(fieldSet.checkFieldSetDependencies).calledWith(formData)
        })
      })

      describe('> ELSE IF fields[dependency.id] EQUALS dependency.value <', () => {
        beforeEach(() => {
          fieldSet.isDependenciesSatisfied = false
          formData.fields['1'].value = '2'
        })

        it('should Set isDependenciesSatisfied To True', () => {
          fieldSet.checkFieldSetDependencies(formData)

          sinon.assert.match(fieldSet.isDependenciesSatisfied, true)

          expect(fieldSet.checkFieldSetDependencies).calledWith(formData)
        })
      })
    })
  })
})
