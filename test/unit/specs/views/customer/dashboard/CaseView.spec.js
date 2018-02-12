import Vue from 'vue'
import store from '@/store/customer'
import router from '@/router/customer'
import CaseView from '@/views/customer/CaseView'
import Case from '@/classes/dashboard/Case'
import mockDashboardCustomer from '@/api/mock/dashboard/dashboardCustomer'
import mockReminderIntervals from '@/api/mock/dashboard/reminderIntervals'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- View: CaseView - Customer --', () => {
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
      sinon.assert.match(vm.dropDownActive, false)
      sinon.assert.match(vm.notifications, [])
    })
  })

  describe(':: props{} ::', () => {
    it('should Not Contain Props Properties By Default', () => {
      sinon.assert.match(vm.caseId, undefined)
    })
  })

  describe(':: computed{} ::', () => {
    it('should Contain Computed Properties', () => {
      vm.$mount()
      sinon.assert.match(vm.reminderIntervals, {})
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

    describe(':: setInitialNotification() ::', () => {
      describe('> IF issues <', () => {
        it('should Push Notification', () => {
          vm.currentCase = Case.asCase(mockDashboardCustomer[0].cases[0])
          sinon.spy(vm, 'setInitialNotification')
          sinon.spy(vm.notifications, 'push')

          vm.setInitialNotification()

          expect(vm.setInitialNotification).callCount(1)
          expect(vm.notifications.push).callCount(1)
          expect(vm.setInitialNotification).calledWith()
          vm.setInitialNotification.restore()
          vm.notifications.push.restore()
        })
      })

      describe('> ELSE <', () => {
        it('should Push Notification', () => {
          vm.currentCase = Case.asCase(mockDashboardCustomer[0].cases[0])
          sinon.spy(vm, 'setInitialNotification')
          sinon.spy(vm.notifications, 'push')

          vm.setInitialNotification()

          expect(vm.setInitialNotification).callCount(1)
          expect(vm.notifications.push).callCount(1)
          expect(vm.setInitialNotification).calledWith()
          vm.setInitialNotification.restore()
          vm.notifications.push.restore()
        })
      })
    })

    describe(':: getNotificationClass() ::', () => {
      it('should Return Class', () => {
        let notificationType = 'default'
        sinon.spy(vm, 'getNotificationClass')

        vm.getNotificationClass(notificationType)

        expect(vm.getNotificationClass).callCount(1)
        expect(vm.getNotificationClass).calledWith(notificationType)
        vm.getNotificationClass.restore()
      })
    })

    describe(':: deleteNotification() ::', () => {
      it('should Call Splice', () => {
        sinon.spy(vm, 'deleteNotification')
        sinon.stub(vm.notifications, 'splice').callsFake(function () {})

        vm.deleteNotification()

        expect(vm.deleteNotification).callCount(1)
        expect(vm.notifications.splice).callCount(1)
        expect(vm.deleteNotification).calledWith()
        vm.deleteNotification.restore()
        vm.notifications.splice.restore()
      })
    })

    describe(':: redirectTo() ::', () => {
      it('should Push Destination To Router', () => {
        let destination = '/'
        sinon.spy(vm, 'redirectTo')

        vm.redirectTo(destination)

        expect(vm.redirectTo).callCount(1)
        expect(vm.redirectTo).calledWith(destination)
        vm.redirectTo.restore()
      })
    })

    describe(':: onDropDownClick() ::', () => {
      it('should Change DropDownActive', () => {
        let mockDropDownActive = vm.dropDownActive
        sinon.spy(vm, 'onDropDownClick')

        vm.onDropDownClick()

        sinon.assert.match(vm.dropDownActive, !mockDropDownActive)

        expect(vm.onDropDownClick).callCount(1)
        expect(vm.onDropDownClick).calledWith()
        vm.onDropDownClick.restore()
      })
    })

    describe(':: hideDropDown() ::', () => {
      it('should Set DropDownActive To False', () => {
        sinon.spy(vm, 'hideDropDown')

        vm.hideDropDown()

        sinon.assert.match(vm.dropDownActive, false)

        expect(vm.hideDropDown).callCount(1)
        expect(vm.hideDropDown).calledWith()
        vm.hideDropDown.restore()
      })
    })

    describe(':: caseReminderIntervalClicked() ::', () => {
      it('should Post Interval', () => {
        let mockCase = Case.asCase(mockDashboardCustomer[0].cases[0])
        let mockIntervalValue = mockReminderIntervals['Tomorrow']
        sinon.spy(vm, 'caseReminderIntervalClicked')
        sinon.stub(vm, 'patchCaseReminderInterval').callsFake(function () {
          return new Promise((resolve) => {
            resolve(true)
          })
        })

        vm.caseReminderIntervalClicked(mockCase, mockIntervalValue)

        expect(vm.caseReminderIntervalClicked).callCount(1)
        expect(vm.patchCaseReminderInterval).callCount(1)
        expect(vm.caseReminderIntervalClicked).calledWith(mockCase, mockIntervalValue)
        vm.caseReminderIntervalClicked.restore()
        vm.patchCaseReminderInterval.restore()
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
