import { PROFILE_TYPES } from '@/api/config'
import authApi from '@/api/auth/authApi'
import mockCustomer from '@/api/mock/auth/customer'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- API: authApi --', () => {
  sinon.stub(window.location, 'replace')

  describe(':: loginUser() ::', () => {
    it('should Return User Object', (done) => {
      sinon.spy(authApi, 'loginUser')

      let user = {
        'username': PROFILE_TYPES.CUSTOMER.toString(),
        'password': ''
      }

      authApi.loginUser(user).then((response) => {
        sinon.assert.match(response.data, mockCustomer)

        expect(authApi.loginUser).callCount(1)
        expect(authApi.loginUser).calledWith(user)
        authApi.loginUser.restore()

        done()
      }).catch(function () {
      })
    })
  })

  describe(':: logoutUser() ::', () => {
    it('should Call Logout API', (done) => {
      sinon.spy(authApi, 'logoutUser')

      authApi.logoutUser().then((response) => {
        expect(authApi.logoutUser).callCount(1)
        authApi.logoutUser.restore()

        done()
      }).catch(function () {
      })
    })
  })
})
