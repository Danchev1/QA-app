import Vue from 'vue'
import store from '@/store/customer'
import DashboardView from '@/views/customer/dashboard/DashboardView'
import { CASE_STATES } from '@/api/config'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Component: DashboardView - Customer --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(DashboardView)
  let vm

  beforeEach(() => {
    vm = new Ctor({ store })
  })

  describe(':: computed{} ::', () => {
    it('should Contain Computed Properties', () => {
      vm.$mount()
      sinon.assert.match(vm.flows, [])
    })
  })

  describe(':: methods{} ::', () => {
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
      sinon.spy(vm, 'getFlows')

      vm.$mount()

      expect(vm.getFlows).callCount(1)
      vm.getFlows.restore()
    })
  })
})
