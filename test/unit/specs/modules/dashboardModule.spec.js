import dashboardModule from '@/store/modules/dashboard/dashboardModule'
import Flow from '@/classes/dashboard/Flow'
import Case from '@/classes/dashboard/Case'
import mockDashboardCustomer from '@/api/mock/dashboard/dashboardCustomer'
import mockReminderIntervals from '@/api/mock/dashboard/reminderIntervals'
import mockAuditors from '@/api/mock/dashboard/auditors'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Module: dashboardModule --', () => {
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
  beforeEach(() => {
    state = {
      flows: [],
      cases: [],
      reminderIntervals: {},
      auditors: []
    }
    originalState = state
  })

  describe('-- MUTATIONS --', () => {
    describe(':: setStateFlows() ::', () => {
      it('should Set State Flows', () => {
        let mockResult = Flow.asFlows(mockDashboardCustomer)

        sinon.spy(dashboardModule.mutations, 'setStateFlows')
        sinon.spy(Flow, 'asFlows')

        dashboardModule.mutations.setStateFlows(state, mockDashboardCustomer)

        sinon.assert.match(state.flows, mockResult)

        expect(dashboardModule.mutations.setStateFlows).callCount(1)
        expect(Flow.asFlows).callCount(1)
        expect(dashboardModule.mutations.setStateFlows).calledWith(originalState, mockDashboardCustomer)
        expect(Flow.asFlows).calledWith(mockDashboardCustomer)
        dashboardModule.mutations.setStateFlows.restore()
        Flow.asFlows.restore()
      })
    })

    describe(':: setStateCases() ::', () => {
      it('should Set State Cases', () => {
        let mockResult = Case.asCases(mockDashboardCustomer[0].cases)

        sinon.spy(dashboardModule.mutations, 'setStateCases')
        sinon.spy(Case, 'asCases')

        dashboardModule.mutations.setStateCases(state, mockDashboardCustomer[0].cases)

        sinon.assert.match(state.cases, mockResult)

        expect(dashboardModule.mutations.setStateCases).callCount(1)
        expect(Case.asCases).callCount(1)
        expect(dashboardModule.mutations.setStateCases).calledWith(originalState, mockDashboardCustomer[0].cases)
        expect(Case.asCases).calledWith(mockDashboardCustomer[0].cases)
        dashboardModule.mutations.setStateCases.restore()
        Case.asCases.restore()
      })
    })

    describe(':: setStateReminderIntervals() ::', () => {
      it('should Set State Reminder Intervals', () => {
        let mockResult = mockReminderIntervals

        sinon.spy(dashboardModule.mutations, 'setStateReminderIntervals')

        dashboardModule.mutations.setStateReminderIntervals(state, mockReminderIntervals)

        sinon.assert.match(state.reminderIntervals, mockResult)

        expect(dashboardModule.mutations.setStateReminderIntervals).callCount(1)
        expect(dashboardModule.mutations.setStateReminderIntervals).calledWith(originalState, mockReminderIntervals)
        dashboardModule.mutations.setStateReminderIntervals.restore()
      })
    })

    describe(':: setStateAuditors() ::', () => {
      it('should Set State Auditors', () => {
        let mockResult = mockAuditors

        sinon.spy(dashboardModule.mutations, 'setStateAuditors')

        dashboardModule.mutations.setStateAuditors(state, mockAuditors)

        sinon.assert.match(state.auditors, mockResult)

        expect(dashboardModule.mutations.setStateAuditors).callCount(1)
        expect(dashboardModule.mutations.setStateAuditors).calledWith(originalState, mockAuditors)
        dashboardModule.mutations.setStateAuditors.restore()
      })
    })
  })
})
