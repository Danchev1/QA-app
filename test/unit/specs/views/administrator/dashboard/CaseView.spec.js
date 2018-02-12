import Vue from 'vue'
import store from '@/store/administrator'
import router from '@/router/administrator'
import CaseView from '@/views/administrator/dashboard/CaseView'
import { CASE_STATES } from '@/api/config'
import mockAuditors from '@/api/mock/dashboard/auditors'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- View: CaseView - Administrator --', () => {
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
      sinon.assert.match(vm.chosenAuditor, null)
      sinon.assert.match(vm.documentReady, false)
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
      sinon.assert.match(vm.auditors, [])
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

    describe(':: caseAuditorClicked() ::', () => {
      it('should Set Chosen Auditor', () => {
        let auditor = mockAuditors[0]
        sinon.spy(vm, 'caseAuditorClicked')

        vm.caseAuditorClicked(auditor)

        sinon.assert.match(vm.chosenAuditor, auditor)

        expect(vm.caseAuditorClicked).callCount(1)
        expect(vm.caseAuditorClicked).calledWith(auditor)
        vm.caseAuditorClicked.restore()
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

    describe(':: submitAuditor() ::', () => {
      it('should Post Case Auditor', () => {
        let flowCase = {}
        let auditor = {}
        sinon.spy(vm, 'submitAuditor')
        sinon.spy(vm, 'patchCaseAuditor')

        vm.submitAuditor(flowCase, auditor)

        expect(vm.submitAuditor).callCount(1)
        expect(vm.patchCaseAuditor).callCount(1)
        expect(vm.submitAuditor).calledWith(flowCase, auditor)
        vm.submitAuditor.restore()
        vm.patchCaseAuditor.restore()
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

    describe(':: auditor() ::', () => {
      describe('> IF value <', () => {
        it('should Return String As Concatenate', () => {
          let mockValue = mockAuditors[0]
          sinon.spy(vm.$options.filters, 'auditor')

          let result = vm.$options.filters.auditor(mockValue)

          sinon.assert.match(result, mockValue.fullname + ' (' + mockValue.email + ')')

          expect(vm.$options.filters.auditor).callCount(1)
          expect(vm.$options.filters.auditor).calledWith(mockValue)
          vm.$options.filters.auditor.restore()
        })
      })

      describe('> ELSE <', () => {
        it('should Return Nothing', () => {
          sinon.spy(vm.$options.filters, 'auditor')

          let result = vm.$options.filters.auditor(null)

          sinon.assert.match(result, 'None')

          expect(vm.$options.filters.auditor).callCount(1)
          expect(vm.$options.filters.auditor).calledWith(null)
          vm.$options.filters.auditor.restore()
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
