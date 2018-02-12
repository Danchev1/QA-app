import mockDashboardCustomer from '@/api/mock/dashboard/dashboardCustomer'
import Issue from '@/classes/dashboard/Issue'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Class: Issue --', () => {
  sinon.stub(window.location, 'replace')

  describe(':: asIssues() ::', () => {
    it('should Create An Array Of Issues', () => {
      let mockIssues = mockDashboardCustomer[0].cases[0].issues
      sinon.spy(Issue, 'asIssues')

      let issues = Issue.asIssues(mockIssues)

      sinon.assert.match(issues[0].id, mockIssues[0].id)
      sinon.assert.match(issues.length, mockIssues.length)

      expect(Issue.asIssues).callCount(1)
      expect(Issue.asIssues).calledWith(mockIssues)
      Issue.asIssues.restore()
    })
  })

  describe(':: asIssue() ::', () => {
    it('should Create An Issue', () => {
      let mockIssue = mockDashboardCustomer[0].cases[0].issues[0]
      sinon.spy(Issue, 'asIssue')

      let issues = Issue.asIssue(mockIssue)

      sinon.assert.match(issues.id, mockIssue.id)

      expect(Issue.asIssue).callCount(1)
      expect(Issue.asIssue).calledWith(mockIssue)
      Issue.asIssue.restore()
    })
  })
})
