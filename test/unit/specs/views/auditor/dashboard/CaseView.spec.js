import Vue from 'vue'
import store from '@/store/auditor'
import router from '@/router/auditor'
import CaseView from '@/views/auditor/CaseView'
import { CASE_STATES } from '@/api/config'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- View: CaseView - Auditor --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(CaseView)
  let vm

  beforeEach(() => {
    vm = new Ctor({ store })

    sinon.stub(router, 'push').callsFake(function () {})
  })

  afterEach(() => {
    router.push.restore()
  })

  describe(':: data() ::', () => {
    it('should Contain Data Properties', () => {
      sinon.assert.match(vm.currentCase, null)
    })
  })

  describe(':: props{} ::', () => {
    it('should Not Contain Props Properties By Default', () => {
      sinon.assert.match(vm.caseId, undefined)
    })
  })

  describe(':: methods{} ::', () => {
    describe(':: getCurrentCase() ::', () => {
      describe('> IF caseId <', () => {
        it('should Get Case', () => {
          vm.caseId = '1'
          sinon.spy(vm, 'getCurrentCase')
          sinon.spy(vm, 'getCase')

          vm.getCurrentCase()

          expect(vm.getCurrentCase).callCount(1)
          expect(vm.getCase).callCount(1)
          expect(vm.getCurrentCase).calledWith()
          vm.getCurrentCase.restore()
          vm.getCase.restore()
        })
      })

      describe('> ELSE <', () => {
        it('should Redirect', () => {
          sinon.spy(vm, 'getCurrentCase')
          sinon.spy(vm, 'getCase')

          vm.getCurrentCase()

          expect(vm.getCurrentCase).callCount(1)
          expect(vm.getCase).callCount(0)
          expect(router.push).callCount(1)
          expect(vm.getCurrentCase).calledWith()
          expect(router.push).calledWith('/dashboard')
          vm.getCurrentCase.restore()
          vm.getCase.restore()
        })
      })
    })

    describe(':: getStateClass() ::', () => {
      it('should Return Class', () => {
        let flowState = CASE_STATES.ACTION_REQUIRED
        sinon.spy(vm, 'getStateClass')

        vm.getStateClass(flowState)

        expect(vm.getStateClass).callCount(1)
        expect(vm.getStateClass).calledWith(flowState)
        vm.getStateClass.restore()
      })
    })
  })

  describe(':: filters{} ::', () => {
    describe(':: date() ::', () => {
      describe('> IF value <', () => {
        it('should Return UTC String Of Date', () => {
          let mockDate = new Date()
          sinon.spy(vm.$options.filters, 'date')

          let result = vm.$options.filters.date(mockDate)

          sinon.assert.match(result, mockDate.toUTCString())

          expect(vm.$options.filters.date).callCount(1)
          expect(vm.$options.filters.date).calledWith(mockDate)
          vm.$options.filters.date.restore()
        })
      })

      describe('> ELSE <', () => {
        it('should Return Nothing', () => {
          sinon.spy(vm.$options.filters, 'date')

          let result = vm.$options.filters.date(null)

          sinon.assert.match(result, undefined)

          expect(vm.$options.filters.date).callCount(1)
          expect(vm.$options.filters.date).calledWith(null)
          vm.$options.filters.date.restore()
        })
      })
    })

    describe(':: uppercase() ::', () => {
      describe('> IF value <', () => {
        it('should Return String As Uppercase', () => {
          let mockString = 'test'
          sinon.spy(vm.$options.filters, 'uppercase')

          let result = vm.$options.filters.uppercase(mockString)

          sinon.assert.match(result, mockString.toUpperCase())

          expect(vm.$options.filters.uppercase).callCount(1)
          expect(vm.$options.filters.uppercase).calledWith(mockString)
          vm.$options.filters.uppercase.restore()
        })
      })

      describe('> ELSE <', () => {
        it('should Return Nothing', () => {
          sinon.spy(vm.$options.filters, 'uppercase')

          let result = vm.$options.filters.uppercase(null)

          sinon.assert.match(result, undefined)

          expect(vm.$options.filters.uppercase).callCount(1)
          expect(vm.$options.filters.uppercase).calledWith(null)
          vm.$options.filters.uppercase.restore()
        })
      })
    })
  })

  describe(':: mounted() ::', () => {
    it('should Call Function', () => {
      sinon.spy(vm, 'getCurrentCase')

      vm.$mount()

      expect(vm.getCurrentCase).callCount(1)
      expect(vm.getCurrentCase).calledWith()
      vm.getCurrentCase.restore()
    })
  })
})
