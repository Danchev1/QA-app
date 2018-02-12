import Vue from 'vue'
import store from '@/store/public'
import RadioComponent from '@/components/form/field/RadioComponent'
import FormData from '@/classes/form/FormData'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Component: RadioComponent --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(RadioComponent)
  let vm

  beforeEach(() => {
    vm = new Ctor({ store })
  })

  describe(':: data() ::', () => {
    it('should Contain Data By Default', () => {
      sinon.assert.match(vm.validation.is_valid, true)
    })
  })

  describe(':: props() ::', () => {
    it('should Not Contain Props Properties By Default', () => {
      sinon.assert.match(vm.field, undefined)
      sinon.assert.match(vm.listMarker, 'none')
      sinon.assert.match(vm.formData, undefined)
    })
  })

  describe(':: mounted() ::', () => {
    it('should Set Validation', () => {
      let mockField = {
        id: '1',
        properties: {},
        layout: {}
      }
      let mockFormData = new FormData()
      mockFormData.fields = {
        '1': {}
      }
      mockFormData.validations = {
        '1': {
          is_valid: false
        }
      }
      vm.field = mockField
      vm.formData = mockFormData

      vm.$mount()

      sinon.assert.match(vm.validation.is_valid, false)
    })
  })
})
