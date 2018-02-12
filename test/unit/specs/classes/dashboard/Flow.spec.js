import mockDashboardCustomer from '@/api/mock/dashboard/dashboardCustomer'
import Flow from '@/classes/dashboard/Flow'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Class: Flow --', () => {
  sinon.stub(window.location, 'replace')

  describe(':: asFlows() ::', () => {
    it('should Create An Array Of Flows', () => {
      let mockFlows = mockDashboardCustomer
      sinon.spy(Flow, 'asFlows')

      let flows = Flow.asFlows(mockFlows)

      sinon.assert.match(flows[0].id, mockFlows[0].id)
      sinon.assert.match(flows.length, mockFlows.length)

      expect(Flow.asFlows).callCount(1)
      expect(Flow.asFlows).calledWith(mockFlows)
      Flow.asFlows.restore()
    })
  })

  describe(':: asFlow() ::', () => {
    it('should Create A Flow', () => {
      let mockFlow = mockDashboardCustomer[0]
      sinon.spy(Flow, 'asFlow')

      let flow = Flow.asFlow(mockFlow)

      sinon.assert.match(flow.id, mockFlow.id)
      sinon.assert.match(flow.cases.length, mockFlow.cases.length)

      expect(Flow.asFlow).callCount(1)
      expect(Flow.asFlow).calledWith(mockFlow)
      Flow.asFlow.restore()
    })
  })
})
