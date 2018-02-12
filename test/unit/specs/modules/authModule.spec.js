import mockCustomer from '@/api/mock/auth/customer'
import AuthUser from '@/classes/auth/AuthUser'
import authModule from '@/store/modules/auth/authModule'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

const Cookies = require('js-cookie')
Cookies.remove('AuthUser')

describe('-- Module: authModule --', () => {
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
      authUser: new AuthUser()
    }
    originalState = state
  })

  afterEach(() => {
    Cookies.remove('AuthUser')
  })

  describe('-- MUTATIONS --', () => {
    describe(':: setAuthUser() ::', () => {
      it('should Set State Auth User', () => {
        sinon.spy(authModule.mutations, 'setAuthUser')
        sinon.spy(state.authUser, 'loginAuthUser')

        authModule.mutations.setAuthUser(state, mockCustomer)

        sinon.assert.match(state.authUser.id, mockCustomer.id)

        expect(authModule.mutations.setAuthUser).callCount(1)
        expect(state.authUser.loginAuthUser).callCount(1)
        expect(authModule.mutations.setAuthUser).calledWith(originalState, mockCustomer)
        expect(state.authUser.loginAuthUser).calledWith(mockCustomer)
        authModule.mutations.setAuthUser.restore()
        state.authUser.loginAuthUser.restore()
      })
    })

    describe(':: setLoggedOut() ::', () => {
      it('should Unset State Auth User', () => {
        sinon.spy(authModule.mutations, 'setLoggedOut')
        sinon.spy(state.authUser, 'logoutAuthUser')

        authModule.mutations.setAuthUser(state, mockCustomer)
        originalState = state
        authModule.mutations.setLoggedOut(state)

        sinon.assert.match(state.authUser.id, undefined)

        expect(authModule.mutations.setLoggedOut).callCount(1)
        expect(state.authUser.logoutAuthUser).callCount(1)
        expect(authModule.mutations.setLoggedOut).calledWith(originalState)
        expect(state.authUser.logoutAuthUser).calledWith()
        authModule.mutations.setLoggedOut.restore()
        state.authUser.logoutAuthUser.restore()
      })
    })
  })
})
