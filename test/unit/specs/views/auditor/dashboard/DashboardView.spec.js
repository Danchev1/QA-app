import Vue from 'vue'
import store from '@/store/auditor'
import DashboardView from '@/views/auditor/dashboard/DashboardView'
import { CASE_STATES } from '@/api/config'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- View: DashboardView - Auditor --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(DashboardView)
  let vm

  beforeEach(() => {
    vm = new Ctor({ store })
  })

  describe(':: data() ::', () => {
    it('should Contain Data Properties', () => {
      sinon.assert.match(vm.casesWaitingResponse, false)
      sinon.assert.match(vm.casesWaitingReview, false)
    })
  })

  describe(':: computed{} ::', () => {
    it('should Contain Computed Properties', () => {
      vm.$mount()
      sinon.assert.match(vm.cases, [])
    })
  })

  describe(':: methods{} ::', () => {
    describe(':: getCurrentCases() ::', () => {
      it('should Reset Data', () => {
        sinon.spy(vm, 'getCurrentCases')
        sinon.spy(vm, 'getCases')

        vm.getCurrentCases()

        expect(vm.getCurrentCases).callCount(1)
        expect(vm.getCases).callCount(1)
        expect(vm.getCurrentCases).calledWith()
        vm.getCurrentCases.restore()
        vm.getCases.restore()
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

    describe(':: acceptCase() ::', () => {
      it('should Accept Case', () => {
        let flowCase = {
          id: '1'
        }
        sinon.spy(vm, 'acceptCase')
        sinon.spy(vm, 'patchCaseAccept')

        vm.acceptCase(flowCase)

        expect(vm.acceptCase).callCount(1)
        expect(vm.patchCaseAccept).callCount(1)
        expect(vm.acceptCase).calledWith(flowCase)
        expect(vm.patchCaseAccept).calledWith(flowCase)
        vm.acceptCase.restore()
        vm.patchCaseAccept.restore()
      })
    })

    describe(':: rejectCase() ::', () => {
      it('should Reject Case', () => {
        let flowCase = {
          id: '1'
        }
        sinon.spy(vm, 'rejectCase')
        sinon.spy(vm, 'patchCaseReject')

        vm.rejectCase(flowCase)

        expect(vm.rejectCase).callCount(1)
        expect(vm.patchCaseReject).callCount(1)
        expect(vm.rejectCase).calledWith(flowCase)
        expect(vm.patchCaseReject).calledWith(flowCase)
        vm.rejectCase.restore()
        vm.patchCaseReject.restore()
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

    describe(':: service() ::', () => {
      describe('> IF value <', () => {
        it('should Return String As Concatenated', () => {
          let mockService = {
            name: 'test',
            code: 't'
          }
          sinon.spy(vm.$options.filters, 'service')

          let result = vm.$options.filters.service(mockService)

          sinon.assert.match(result, mockService.name + ' (' + mockService.code + ')')

          expect(vm.$options.filters.service).callCount(1)
          expect(vm.$options.filters.service).calledWith(mockService)
          vm.$options.filters.service.restore()
        })
      })

      describe('> ELSE <', () => {
        it('should Return Nothing', () => {
          sinon.spy(vm.$options.filters, 'service')

          let result = vm.$options.filters.service(null)

          sinon.assert.match(result, undefined)

          expect(vm.$options.filters.service).callCount(1)
          expect(vm.$options.filters.service).calledWith(null)
          vm.$options.filters.service.restore()
        })
      })
    })
  })

  describe(':: mounted() ::', () => {
    it('should Call Function', () => {
      sinon.spy(vm, 'getCurrentCases')

      vm.$mount()

      expect(vm.getCurrentCases).callCount(1)
      vm.getCurrentCases.restore()
    })
  })
})
