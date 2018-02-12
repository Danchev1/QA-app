import mockServiceForm from '@/api/mock/form/CEXServiceForm'
let mockCEXServiceForm = mockServiceForm[0]
import FormDescriptor from '@/classes/form/FormDescriptor'
import FormData from '@/classes/form/FormData'
import Service from '@/classes/dashboard/Service'
import formModule from '@/store/modules/form/formModule'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Module: formModule --', () => {
  sinon.stub(window.location, 'replace')

  /* Define Array.find function for tests */
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', { // eslint-disable-line no-extend-native
      enumerable: false,
      configurable: true,
      writable: true,
      value: function (predicate) {
        if (this === null) {
          throw new TypeError('Array.prototype.find called on null or undefined')
        }
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function')
        }
        let list = Object(this)
        let length = list.length >>> 0
        let thisArg = arguments[1]
        let value

        for (let i = 0; i < length; i++) {
          if (i in list) {
            value = list[i]
            if (predicate.call(thisArg, value, i, list)) {
              return value
            }
          }
        }
        return undefined
      }
    })
  }

  let state
  let originalState
  let resultFormDescriptors
  let resultFormDatas
  let resultService
  beforeEach(() => {
    state = {
      title: '',
      description: '',
      layout: {},
      formDescriptors: [],
      formDatas: [],
      service: {},
      formType: ''
    }
    originalState = state

    resultFormDescriptors = FormDescriptor.asFormDescriptors(mockCEXServiceForm.forms)
    resultFormDatas = FormData.getOrCreateFormDatas(mockCEXServiceForm.form_data, resultFormDescriptors)
    resultService = Service.asService(mockCEXServiceForm.service)

    FormData.initiateFormDatas(resultFormDatas, resultFormDescriptors)
    FormDescriptor.checkFormDescriptorsDependencies(resultFormDescriptors, resultFormDatas)
  })

  describe('-- MUTATIONS --', () => {
    describe(':: setStateTitle() ::', () => {
      it('should Set State Title', () => {
        sinon.spy(formModule.mutations, 'setStateTitle')

        formModule.mutations.setStateTitle(state, mockCEXServiceForm.title)

        sinon.assert.match(state.title, mockCEXServiceForm.title)

        expect(formModule.mutations.setStateTitle).callCount(1)
        expect(formModule.mutations.setStateTitle).calledWith(originalState, mockCEXServiceForm.title)
        formModule.mutations.setStateTitle.restore()
      })
    })

    describe(':: setStateDescription() ::', () => {
      it('should Set State Description', () => {
        sinon.spy(formModule.mutations, 'setStateDescription')

        formModule.mutations.setStateDescription(state, mockCEXServiceForm.description)

        sinon.assert.match(state.description, mockCEXServiceForm.description)

        expect(formModule.mutations.setStateDescription).callCount(1)
        expect(formModule.mutations.setStateDescription).calledWith(originalState, mockCEXServiceForm.description)
        formModule.mutations.setStateDescription.restore()
      })
    })

    describe(':: setStateLayout() ::', () => {
      it('should Set State Layout', () => {
        sinon.spy(formModule.mutations, 'setStateLayout')

        formModule.mutations.setStateLayout(state, mockCEXServiceForm.layout)

        sinon.assert.match(state.layout, mockCEXServiceForm.layout)

        expect(formModule.mutations.setStateLayout).callCount(1)
        expect(formModule.mutations.setStateLayout).calledWith(originalState, mockCEXServiceForm.layout)
        formModule.mutations.setStateLayout.restore()
      })
    })

    describe(':: setStateFormDescriptors() ::', () => {
      it('should Set State Form Descriptors', () => {
        sinon.spy(formModule.mutations, 'setStateFormDescriptors')

        formModule.mutations.setStateFormDescriptors(state, mockCEXServiceForm.forms)

        sinon.assert.match(state.formDescriptors, FormDescriptor.asFormDescriptors(mockCEXServiceForm.forms))

        expect(formModule.mutations.setStateFormDescriptors).callCount(1)
        expect(formModule.mutations.setStateFormDescriptors).calledWith(originalState, mockCEXServiceForm.forms)
        formModule.mutations.setStateFormDescriptors.restore()
      })
    })

    describe(':: setStateFormDatas() ::', () => {
      it('should Set State Form Datas and update Form Descriptors', () => {
        sinon.spy(formModule.mutations, 'setStateFormDescriptors')
        sinon.spy(formModule.mutations, 'setStateFormDatas')

        formModule.mutations.setStateFormDescriptors(state, mockCEXServiceForm.forms)
        formModule.mutations.setStateFormDatas(state, mockCEXServiceForm.form_data)

        sinon.assert.match(state.formDatas, resultFormDatas)
        sinon.assert.match(state.formDescriptors, resultFormDescriptors)

        expect(formModule.mutations.setStateFormDescriptors).callCount(1)
        expect(formModule.mutations.setStateFormDatas).callCount(1)
        expect(formModule.mutations.setStateFormDescriptors).calledWith(originalState, mockCEXServiceForm.forms)
        expect(formModule.mutations.setStateFormDatas).calledWith(originalState, mockCEXServiceForm.form_data)
        formModule.mutations.setStateFormDescriptors.restore()
        formModule.mutations.setStateFormDatas.restore()
      })
    })

    describe(':: setStateService() ::', () => {
      it('should Set State Service', () => {
        sinon.spy(formModule.mutations, 'setStateService')

        formModule.mutations.setStateService(state, mockCEXServiceForm.service)

        sinon.assert.match(state.service, resultService)

        expect(formModule.mutations.setStateService).callCount(1)
        expect(formModule.mutations.setStateService).calledWith(state, mockCEXServiceForm.service)
        formModule.mutations.setStateService.restore()
      })
    })

    describe(':: setStateFormType() ::', () => {
      it('should Set State Form Type', () => {
        sinon.spy(formModule.mutations, 'setStateFormType')

        formModule.mutations.setStateFormType(state, mockCEXServiceForm.form_type)

        sinon.assert.match(state.formType, mockCEXServiceForm.form_type)

        expect(formModule.mutations.setStateFormType).callCount(1)
        expect(formModule.mutations.setStateFormType).calledWith(state, mockCEXServiceForm.form_type)
        formModule.mutations.setStateFormType.restore()
      })
    })
  })
})
