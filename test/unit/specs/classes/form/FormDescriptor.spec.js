import mockFormDescriptorCustomerInformation from '@/api/mock/form/formDescriptor/formDescriptorCustomerInformation'
import mockFormDataCustomerInformation from '@/api/mock/form/formData/formDataCustomerInformation'
import FormDescriptor from '@/classes/form/FormDescriptor'
import FormData from '@/classes/form/FormData'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Class: FormDescriptor --', () => {
  sinon.stub(window.location, 'replace')

  describe(':: asFormDescriptors() ::', () => {
    it('should Create An Array Of FormDescriptors', () => {
      sinon.spy(FormDescriptor, 'asFormDescriptors')

      let formDescriptors = FormDescriptor.asFormDescriptors([mockFormDescriptorCustomerInformation])

      sinon.assert.match(formDescriptors[0].id, mockFormDescriptorCustomerInformation.id)
      sinon.assert.match(formDescriptors.length, [mockFormDescriptorCustomerInformation].length)

      expect(FormDescriptor.asFormDescriptors).callCount(1)
      expect(FormDescriptor.asFormDescriptors).calledWith([mockFormDescriptorCustomerInformation])
      FormDescriptor.asFormDescriptors.restore()
    })
  })

  describe(':: asFormDescriptor() ::', () => {
    it('should Create A Form Descriptor', () => {
      sinon.spy(FormDescriptor, 'asFormDescriptor')

      let formDescriptor = FormDescriptor.asFormDescriptor(mockFormDescriptorCustomerInformation)

      sinon.assert.match(formDescriptor.fieldSets[0].id, mockFormDescriptorCustomerInformation.field_sets[0].id)
      sinon.assert.match(formDescriptor.fieldSets.length, mockFormDescriptorCustomerInformation.field_sets.length)

      expect(FormDescriptor.asFormDescriptor).callCount(1)
      expect(FormDescriptor.asFormDescriptor).calledWith(mockFormDescriptorCustomerInformation)
      FormDescriptor.asFormDescriptor.restore()
    })
  })

  describe(':: checkFormDescriptorsDependencies() ::', () => {
    it('should Loop Through Form Descriptors Finding Form Data', () => {
      let formDescriptors = FormDescriptor.asFormDescriptors([mockFormDescriptorCustomerInformation])
      let formDatas = FormData.getOrCreateFormDatas([mockFormDataCustomerInformation], formDescriptors)
      FormData.initiateFormDatas(formDatas, formDescriptors)

      sinon.spy(FormDescriptor, 'checkFormDescriptorsDependencies')
      sinon.spy(formDescriptors, 'forEach')
      sinon.spy(formDatas, 'find')

      FormDescriptor.checkFormDescriptorsDependencies(formDescriptors, formDatas)

      expect(FormDescriptor.checkFormDescriptorsDependencies).calledWith(formDescriptors, formDatas)
      expect(formDescriptors.forEach).callCount(1)
      expect(formDatas.find).callCount(1)
      FormDescriptor.checkFormDescriptorsDependencies.restore()
      formDescriptors.forEach.restore()
      formDatas.find.restore()
    })
  })

  describe(':: checkFormDescriptorDependencies() ::', () => {
    describe('> IF NOT fieldSets <', () => {
      let formDescriptor
      let formData

      beforeEach(() => {
        formDescriptor = new FormDescriptor()
        formDescriptor.fieldSets = []
        formData = new FormData()

        sinon.spy(formDescriptor, 'checkFormDescriptorDependencies')
        sinon.spy(formDescriptor.fieldSets, 'forEach')
      })

      afterEach(() => {
        expect(formDescriptor.checkFormDescriptorDependencies).callCount(1)
        formDescriptor.checkFormDescriptorDependencies.restore()
        formDescriptor.fieldSets.forEach.restore()
      })

      it('should Return immediately', () => {
        formDescriptor.checkFormDescriptorDependencies(formData)

        expect(formDescriptor.checkFormDescriptorDependencies).calledWith(formData)
        expect(formDescriptor.fieldSets.forEach).callCount(0)
      })
    })

    describe('> ELSE IF fieldSets <', () => {
      let formDescriptor
      let formData

      beforeEach(() => {
        formDescriptor = FormDescriptor.asFormDescriptor(mockFormDescriptorCustomerInformation)
        formData = FormData.asFormData(mockFormDataCustomerInformation)
        formData.initiateFields(formDescriptor.fieldSets)
        formData.initiateDependencies(formDescriptor.fieldSets)
        formData.initiateValidations(formDescriptor.fieldSets)

        sinon.spy(formDescriptor, 'checkFormDescriptorDependencies')
        sinon.spy(formDescriptor.fieldSets, 'forEach')
      })

      afterEach(() => {
        expect(formDescriptor.checkFormDescriptorDependencies).callCount(1)
        formDescriptor.checkFormDescriptorDependencies.restore()
        formDescriptor.fieldSets.forEach.restore()
      })

      it('should ForEach FieldSets', () => {
        formDescriptor.checkFormDescriptorDependencies(formData)

        expect(formDescriptor.checkFormDescriptorDependencies).calledWith(formData)
        expect(formDescriptor.fieldSets.forEach).callCount(1)
      })
    })
  })
})
