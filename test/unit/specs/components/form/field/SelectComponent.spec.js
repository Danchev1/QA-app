import Vue from 'vue'
import store from '@/store/public'
import SelectComponent from '@/components/form/field/SelectComponent'
import FormData from '@/classes/form/FormData'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Component: SelectComponent --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(SelectComponent)
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

  describe(':: methods{} ::', () => {
    describe(':: getFieldClass() ::', () => {
      it('should Return Class', () => {
        let layoutType = 'horizontal'
        sinon.spy(vm, 'getFieldClass')

        vm.getFieldClass(layoutType)

        expect(vm.getFieldClass).callCount(1)
        expect(vm.getFieldClass).calledWith(layoutType)
        vm.getFieldClass.restore()
      })
    })

    describe(':: getLabelClass() ::', () => {
      it('should Return Class', () => {
        let layoutType = 'horizontal'
        sinon.spy(vm, 'getLabelClass')

        vm.getLabelClass(layoutType)

        expect(vm.getLabelClass).callCount(1)
        expect(vm.getLabelClass).calledWith(layoutType)
        vm.getLabelClass.restore()
      })
    })

    describe(':: getControlClass() ::', () => {
      it('should Return Class', () => {
        let layoutType = 'horizontal'
        sinon.spy(vm, 'getControlClass')

        vm.getControlClass(layoutType)

        expect(vm.getControlClass).callCount(1)
        expect(vm.getControlClass).calledWith(layoutType)
        vm.getControlClass.restore()
      })
    })

    describe(':: getInputReadonlyValue() ::', () => {
      let value

      beforeEach(() => {
        vm.field = {
          id: '1',
          properties: {
            options: [{
              option_value: '1',
              display_name: 'test'
            }]
          },
          layout: {}
        }

        sinon.spy(vm, 'getInputReadonlyValue')
      })

      afterEach(() => {
        expect(vm.getInputReadonlyValue).callCount(1)
        vm.getInputReadonlyValue.restore()
      })

      describe('> IF option <', () => {
        it('should Return Value', () => {
          value = '1'

          let result = vm.getInputReadonlyValue(value)

          sinon.assert.match(result, vm.field.properties.options[0].display_name)

          expect(vm.getInputReadonlyValue).calledWith(value)
        })
      })

      describe('> ELSE <', () => {
        it('should Return Null', () => {
          value = '2'

          let result = vm.getInputReadonlyValue(value)

          sinon.assert.match(result, null)

          expect(vm.getInputReadonlyValue).calledWith(value)
        })
      })
    })

    describe(':: getInputClass() ::', () => {
      it('should Return Class', () => {
        let isValid = false
        sinon.spy(vm, 'getInputClass')

        vm.getInputClass(isValid)

        expect(vm.getInputClass).callCount(1)
        expect(vm.getInputClass).calledWith(isValid)
        vm.getInputClass.restore()
      })
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
