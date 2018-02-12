import dashboardApi from '@/api/dashboard/dashboardApi'
import AuthUser from '@/classes/auth/AuthUser'
import mockCustomer from '@/api/mock/auth/customer'
import mockAdministrator from '@/api/mock/auth/administrator'
import mockDashboardCustomer from '@/api/mock/dashboard/dashboardCustomer'
import mockDashboardAdministrator from '@/api/mock/dashboard/dashboardAdministrator'
import mockReminderIntervals from '@/api/mock/dashboard/reminderIntervals'
import mockAuditors from '@/api/mock/dashboard/auditors'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- API: dashboardApi --', () => {
  sinon.stub(window.location, 'replace')

  describe(':: getFlows() ::', () => {
    let authUser

    beforeEach(() => {
      sinon.spy(dashboardApi, 'getFlows')
    })

    afterEach(() => {
      expect(dashboardApi.getFlows).callCount(1)
      dashboardApi.getFlows.restore()
    })

    describe('> IF profile type EQUALS customer <', () => {
      beforeEach(() => {
        authUser = new AuthUser()
        authUser.loginAuthUser(mockCustomer)
      })

      afterEach(() => {
        authUser.logoutAuthUser()
      })

      it('should Return Flows For Customer', (done) => {
        dashboardApi.getFlows().then((response) => {
          sinon.assert.match(response.data, mockDashboardCustomer)

          expect(dashboardApi.getFlows).calledWith()

          done()
        }).catch(function () {
        })
      })
    })

    describe('> ELSE <', () => {
      it('should Return Null', (done) => {
        dashboardApi.getFlows().then(
          (response) => {
          },
          (reject) => {
            expect(dashboardApi.getFlows).calledWith()

            done()
          }).catch(function () {
          })
      })
    })
  })

  describe(':: getCases() ::', () => {
    let authUser

    beforeEach(() => {
      sinon.spy(dashboardApi, 'getCases')
    })

    afterEach(() => {
      expect(dashboardApi.getCases).callCount(1)
      dashboardApi.getCases.restore()
    })

    describe('> IF profile type EQUALS administrator <', () => {
      beforeEach(() => {
        authUser = new AuthUser()
        authUser.loginAuthUser(mockAdministrator)
      })

      afterEach(() => {
        authUser.logoutAuthUser()
      })

      it('should Return Cases For Administrator', (done) => {
        dashboardApi.getCases().then((response) => {
          sinon.assert.match(response.data, mockDashboardAdministrator)

          expect(dashboardApi.getCases).calledWith()

          done()
        }).catch(function () {
        })
      })
    })

    describe('> ELSE <', () => {
      it('should Return Null', (done) => {
        dashboardApi.getCases().then(
          (response) => {
          },
          (reject) => {
            expect(dashboardApi.getCases).calledWith()

            done()
          }).catch(function () {
          })
      })
    })
  })

  describe(':: getCase() ::', () => {
    let authUser

    beforeEach(() => {
      sinon.spy(dashboardApi, 'getCase')
    })

    afterEach(() => {
      expect(dashboardApi.getCase).callCount(1)
      dashboardApi.getCase.restore()
    })

    describe('> IF profile type EQUALS administrator <', () => {
      beforeEach(() => {
        authUser = new AuthUser()
        authUser.loginAuthUser(mockAdministrator)
      })

      afterEach(() => {
        authUser.logoutAuthUser()
      })

      it('should Return First Case For Administrator', (done) => {
        dashboardApi.getCase(mockDashboardAdministrator[0].id).then((response) => {
          sinon.assert.match(response.data, mockDashboardAdministrator[0])

          expect(dashboardApi.getCase).calledWith(mockDashboardAdministrator[0].id)

          done()
        }).catch(function () {
        })
      })
    })

    describe('> ELSE <', () => {
      it('should Return Null', (done) => {
        dashboardApi.getCase(mockDashboardAdministrator[0].id).then(
          (response) => {
          },
          (reject) => {
            expect(dashboardApi.getCase).calledWith(mockDashboardAdministrator[0].id)

            done()
          }).catch(function () {
          })
      })
    })
  })

  describe(':: getCaseReminderIntervals() ::', () => {
    it('should Return Remind Intervals', (done) => {
      sinon.spy(dashboardApi, 'getCaseReminderIntervals')

      dashboardApi.getCaseReminderIntervals().then((response) => {
        sinon.assert.match(response.data, mockReminderIntervals)
        expect(dashboardApi.getCaseReminderIntervals).callCount(1)
        expect(dashboardApi.getCaseReminderIntervals).calledWith()
        dashboardApi.getCaseReminderIntervals.restore()

        done()
      }).catch(function () {
      })
    })
  })

  describe(':: patchCaseReminderInterval() ::', () => {
    it('should Call Remind Intervals Post Api', (done) => {
      sinon.spy(dashboardApi, 'patchCaseReminderInterval')

      let caseId = mockDashboardCustomer[0].cases[0].id
      let intervalValue = mockReminderIntervals['Tomorrow']

      dashboardApi.patchCaseReminderInterval(caseId, intervalValue).then((response) => {
        expect(dashboardApi.patchCaseReminderInterval).callCount(1)
        expect(dashboardApi.patchCaseReminderInterval).calledWith(caseId, intervalValue)
        dashboardApi.patchCaseReminderInterval.restore()

        done()
      }).catch(function () {
      })
    })
  })

  describe(':: getAuditors() ::', () => {
    it('should Return Auditors', (done) => {
      sinon.spy(dashboardApi, 'getAuditors')

      dashboardApi.getAuditors().then((response) => {
        sinon.assert.match(response.data, mockAuditors)
        expect(dashboardApi.getAuditors).callCount(1)
        expect(dashboardApi.getAuditors).calledWith()
        dashboardApi.getAuditors.restore()

        done()
      }).catch(function () {
      })
    })
  })

  describe(':: patchCaseAuditor() ::', () => {
    it('should Call Case Auditors Post API', (done) => {
      sinon.spy(dashboardApi, 'patchCaseAuditor')

      let caseId = mockDashboardCustomer[0].cases[0].id
      let auditor = mockAuditors[0]

      dashboardApi.patchCaseAuditor(caseId, auditor.id).then((response) => {
        expect(dashboardApi.patchCaseAuditor).callCount(1)
        expect(dashboardApi.patchCaseAuditor).calledWith(caseId, auditor.id)
        dashboardApi.patchCaseAuditor.restore()

        done()
      }).catch(function () {
      })
    })
  })

  describe(':: patchCaseAccept() ::', () => {
    it('should Call Case Accept Post API', (done) => {
      sinon.spy(dashboardApi, 'patchCaseAccept')

      let caseId = mockDashboardCustomer[0].cases[0].id

      dashboardApi.patchCaseAccept(caseId).then((response) => {
        expect(dashboardApi.patchCaseAccept).callCount(1)
        expect(dashboardApi.patchCaseAccept).calledWith(caseId)
        dashboardApi.patchCaseAccept.restore()

        done()
      }).catch(function () {
      })
    })
  })

  describe(':: patchCaseReject() ::', () => {
    it('should Call Case Reject Post API', (done) => {
      sinon.spy(dashboardApi, 'patchCaseReject')

      let caseId = mockDashboardCustomer[0].cases[0].id

      dashboardApi.patchCaseReject(caseId).then((response) => {
        expect(dashboardApi.patchCaseReject).callCount(1)
        expect(dashboardApi.patchCaseReject).calledWith(caseId)
        dashboardApi.patchCaseReject.restore()

        done()
      }).catch(function () {
      })
    })
  })
})
