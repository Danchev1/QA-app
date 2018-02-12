import formApi from '@/api/form/formApi'
import { FORM_CERTIFICATES } from '@/api/config'
import mockCEXServiceForm from '@/api/mock/form/CEXServiceForm'
import mockCEXChecklist from '@/api/mock/form/CEXChecklist'
import mockCustomerInformationForm from '@/api/mock/form/customerInformationForm'
import mockDashboardCustomer from '@/api/mock/dashboard/dashboardCustomer'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- API: formApi --', () => {
  sinon.stub(window.location, 'replace')

  describe(':: getFormDescriptorsAndData() ::', () => {
    beforeEach(() => {
      sinon.spy(formApi, 'getFormDescriptorsAndData')
    })

    afterEach(() => {
      expect(formApi.getFormDescriptorsAndData).callCount(1)
      formApi.getFormDescriptorsAndData.restore()
    })

    describe('> IF certificateType EQUALS CEX <', () => {
      it('should Return CEX Forms With Data', (done) => {
        formApi.getFormDescriptorsAndData(FORM_CERTIFICATES.CEX).then((response) => {
          sinon.assert.match(response.data, mockCEXServiceForm)

          expect(formApi.getFormDescriptorsAndData).calledWith(FORM_CERTIFICATES.CEX)

          done()
        }).catch(function () {
        })
      })
    })

    describe('> ELSE IF certificateType EQUALS CUSTOMER <', () => {
      it('should Return Customer Information Forms With Data', (done) => {
        formApi.getFormDescriptorsAndData(FORM_CERTIFICATES.CUSTOMER).then((response) => {
          sinon.assert.match(response.data, mockCustomerInformationForm)

          expect(formApi.getFormDescriptorsAndData).calledWith(FORM_CERTIFICATES.CUSTOMER)

          done()
        }).catch(function () {
        })
      })
    })

    describe('> ELSE <', () => {
      it('should Return Null', (done) => {
        formApi.getFormDescriptorsAndData(null).then(
          (response) => {
          },
          (reject) => {
            expect(formApi.getFormDescriptorsAndData).calledWith(null)

            done()
          }).catch(function () {
          })
      })
    })
  })

  describe(':: getFormDescriptorsForChecklist() ::', () => {
    it('should Return Checklist Forms With Data', (done) => {
      sinon.spy(formApi, 'getFormDescriptorsForChecklist')

      formApi.getFormDescriptorsForChecklist(mockDashboardCustomer[0].cases[0].id).then((response) => {
        sinon.assert.match(response.data, mockCEXChecklist)

        expect(formApi.getFormDescriptorsForChecklist).callCount(1)
        expect(formApi.getFormDescriptorsForChecklist).calledWith(mockDashboardCustomer[0].cases[0].id)
        formApi.getFormDescriptorsForChecklist.restore()

        done()
      }).catch(function () {
      })
    })
  })

  describe(':: postFormDataAsGuest() ::', () => {
    it('should Call Post Form Data Guest API', (done) => {
      sinon.spy(formApi, 'postFormDataAsGuest')

      formApi.postFormDataAsGuest(mockCEXServiceForm[0].service.code, {}).then((response) => {
        expect(formApi.postFormDataAsGuest).callCount(1)
        expect(formApi.postFormDataAsGuest).calledWith(mockCEXServiceForm[0].service.code, {})
        formApi.postFormDataAsGuest.restore()

        done()
      }).catch(function () {
      })
    })
  })

  describe(':: postFormDataAsAuthUser() ::', () => {
    it('should Call Post Form Data User API', (done) => {
      sinon.spy(formApi, 'postFormDataAsAuthUser')

      formApi.postFormDataAsAuthUser(mockCEXServiceForm[0].service.id, {}).then((response) => {
        expect(formApi.postFormDataAsAuthUser).callCount(1)
        expect(formApi.postFormDataAsAuthUser).calledWith(mockCEXServiceForm[0].service.id, {})
        formApi.postFormDataAsAuthUser.restore()

        done()
      }).catch(function () {
      })
    })
  })

  describe(':: patchFormData() ::', () => {
    it('should Call Patch Form Data API', (done) => {
      sinon.spy(formApi, 'patchFormData')

      formApi.patchFormData({id: 1}).then((response) => {
        expect(formApi.patchFormData).callCount(1)
        expect(formApi.patchFormData).calledWith({id: 1})
        formApi.patchFormData.restore()

        done()
      }, (reject) => {
      }).catch(function () {
      })
    })
  })

  describe(':: postFormDataForChecklist() ::', () => {
    it('should Call Post Form Data Checklist API', (done) => {
      sinon.spy(formApi, 'postFormDataForChecklist')

      formApi.postFormDataForChecklist(mockDashboardCustomer[0].cases[0].id, {}).then((response) => {
        expect(formApi.postFormDataForChecklist).callCount(1)
        expect(formApi.postFormDataForChecklist).calledWith(mockDashboardCustomer[0].cases[0].id, {})
        formApi.postFormDataForChecklist.restore()

        done()
      }).catch(function () {
      })
    })
  })
})
