import Vue from 'vue'
import store from '@/store/public'
import FieldSetComponent from '@/components/form/fieldSet/FieldSetComponent'
import FieldSet from '@/classes/form/FormFieldSet'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Component: FieldSetComponent --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(FieldSetComponent)
  let vm

  beforeEach(() => {
    vm = new Ctor({ store })
  })

  describe(':: props() ::', () => {
    it('should Not Contain Props Properties By Default', () => {
      sinon.assert.match(vm.fieldSet, undefined)
      sinon.assert.match(vm.formData, undefined)
    })
  })

  describe(':: mounted() ::', () => {
    it('should Sort Fields', () => {
      let mockFieldSet = new FieldSet()
      mockFieldSet.fields = [
        {
          id: 2,
          layout: {position: 2}
        },
        {
          id: 1,
          layout: {position: 1}
        }
      ]
      mockFieldSet.layout = {}
      vm.fieldSet = mockFieldSet
      sinon.spy(vm.fieldSet.fields, 'sort')

      vm.$mount()

      sinon.assert.match(vm.fieldSet.fields[0].id, 1)

      expect(vm.fieldSet.fields.sort).callCount(1)
      vm.fieldSet.fields.sort.restore()
    })
  })
})
