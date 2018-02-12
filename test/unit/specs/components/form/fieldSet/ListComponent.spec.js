import Vue from 'vue'
import store from '@/store/public'
import ListComponent from '@/components/form/fieldSet/ListFormComponent'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Component: ListComponent --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(ListComponent)
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

  describe(':: methods{} ::', () => {
    describe(':: statics() ::', () => {
      it('should Have Static Field Functions', () => {
        sinon.assert.match(typeof vm.isTextField, 'function')
        sinon.assert.match(typeof vm.isNumberField, 'function')
        sinon.assert.match(typeof vm.isDateField, 'function')
        sinon.assert.match(typeof vm.isFileField, 'function')
        sinon.assert.match(typeof vm.isCheckboxField, 'function')
        sinon.assert.match(typeof vm.isRadioField, 'function')
        sinon.assert.match(typeof vm.isSelectField, 'function')
      })
    })
  })
})
