import Vue from 'vue'
import store from '@/store/public'
import FormComponent from '@/components/form/FormComponent'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Component: FormComponent --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(FormComponent)
  let vm

  beforeEach(() => {
    vm = new Ctor({ store })
  })

  describe(':: props() ::', () => {
    it('should Not Contain Props Properties By Default', () => {
      sinon.assert.match(vm.formDescriptor, undefined)
      sinon.assert.match(vm.formData, undefined)
    })
  })
})
