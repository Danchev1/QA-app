import Vue from 'vue'
import store from '@/store/customer'
import TitleComponent from '@/components/layout/TitleComponent'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Component: TitleComponent --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(TitleComponent)
  let vm

  beforeEach(() => {
    vm = new Ctor({ store })
  })

  describe(':: props() ::', () => {
    it('should Contain Props Properties By Default', () => {
      sinon.assert.match(vm.size, 1)
      sinon.assert.match(vm.lineSeparator, '')
    })
  })

  describe(':: methods{} ::', () => {
    describe(':: getTitleClass() ::', () => {
      it('should Return Class', () => {
        let size = 1
        let lineSeperator = 'above'
        sinon.spy(vm, 'getTitleClass')

        vm.getTitleClass(size, lineSeperator)

        expect(vm.getTitleClass).callCount(1)
        expect(vm.getTitleClass).calledWith(size, lineSeperator)
        vm.getTitleClass.restore()
      })
    })
  })
})
