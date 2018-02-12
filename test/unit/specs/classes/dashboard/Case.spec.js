import mockDashboardCustomer from '@/api/mock/dashboard/dashboardCustomer'
import Case from '@/classes/dashboard/Case'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Class: Case --', () => {
  sinon.stub(window.location, 'replace')

  describe(':: asCases() ::', () => {
    it('should Create An Array Of Cases', () => {
      let mockCases = mockDashboardCustomer[0].cases
      sinon.spy(Case, 'asCases')

      let cases = Case.asCases(mockCases)

      sinon.assert.match(cases[0].id, mockCases[0].id)
      sinon.assert.match(cases.length, mockCases.length)

      expect(Case.asCases).callCount(1)
      expect(Case.asCases).calledWith(mockCases)
      Case.asCases.restore()
    })
  })

  describe(':: asCase() ::', () => {
    it('should Create A Case', () => {
      let mockCase = mockDashboardCustomer[0].cases[0]
      sinon.spy(Case, 'asCase')

      let flowCase = Case.asCase(mockCase)

      sinon.assert.match(flowCase.id, mockCase.id)
      sinon.assert.match(flowCase.issues.length, mockCase.issues.length)

      expect(Case.asCase).callCount(1)
      expect(Case.asCase).calledWith(mockCase)
      Case.asCase.restore()
    })
  })
})
