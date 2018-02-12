import mockCustomer from '@/api/mock/auth/customer'
import mockAdministrator from '@/api/mock/auth/administrator'
import mockAuditor from '@/api/mock/auth/auditor'
import AuthUser from '@/classes/auth/AuthUser'
import { PROFILE_TYPES } from '@/api/config'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

const Cookies = require('js-cookie')
Cookies.remove('AuthUser')

describe('-- Class: AuthUser --', () => {
  sinon.stub(window.location, 'replace')

  describe(':: setAuthUserFromCookie() ::', () => {
    let authUser

    beforeEach(() => {
      authUser = new AuthUser()
      sinon.spy(authUser, 'setAuthUserFromCookie')
    })

    afterEach(() => {
      expect(authUser.setAuthUserFromCookie).callCount(1)
      authUser.setAuthUserFromCookie.restore()
      Cookies.remove('AuthUser')
    })

    describe('> IF NOT Cookie <', () => {
      it('should Assign Undefined Values', () => {
        authUser.setAuthUserFromCookie()

        sinon.assert.match(authUser.id, undefined)

        expect(authUser.setAuthUserFromCookie).calledWith()
      })
    })

    describe('> ELSE IF Cookie <', () => {
      it('should Assign Defined Values', () => {
        Cookies.set('AuthUser', JSON.stringify(mockCustomer))
        authUser.setAuthUserFromCookie()

        sinon.assert.match(authUser.id, mockCustomer.id)

        expect(authUser.setAuthUserFromCookie).calledWith()
      })
    })
  })

  describe(':: loginAuthUser() ::', () => {
    afterEach(() => {
      Cookies.remove('AuthUser')
    })

    it('should Assign Defined Values and set Cookie', () => {
      let authUser = new AuthUser()
      sinon.spy(authUser, 'loginAuthUser')

      authUser.loginAuthUser(mockCustomer)

      sinon.assert.match(authUser.id, mockCustomer.id)
      sinon.assert.match(JSON.parse(Cookies.get('AuthUser')), mockCustomer)

      expect(authUser.loginAuthUser).callCount(1)
      expect(authUser.loginAuthUser).calledWith(mockCustomer)
      authUser.loginAuthUser.restore()
    })
  })

  describe(':: logoutAuthUser() ::', () => {
    afterEach(() => {
      Cookies.remove('AuthUser')
    })

    it('should Assign Undefined Values and remove Cookie', () => {
      let authUser = new AuthUser()
      authUser.loginAuthUser(mockCustomer)
      sinon.spy(authUser, 'logoutAuthUser')

      authUser.logoutAuthUser()

      sinon.assert.match(authUser.id, undefined)
      sinon.assert.match(Cookies.get('AuthUser'), undefined)

      expect(authUser.logoutAuthUser).callCount(1)
      expect(authUser.logoutAuthUser).calledWith()
      authUser.logoutAuthUser.restore()
    })
  })

  describe(':: isLoggedIn() ::', () => {
    let authUser

    beforeEach(() => {
      sinon.spy(AuthUser, 'isLoggedIn')
    })

    afterEach(() => {
      expect(AuthUser.isLoggedIn).callCount(1)
      AuthUser.isLoggedIn.restore()
      Cookies.remove('AuthUser')
    })

    describe('> IF Cookie <', () => {
      it('should Return True', () => {
        authUser = new AuthUser()
        authUser.loginAuthUser(mockCustomer)

        let result = AuthUser.isLoggedIn()

        sinon.assert.match(result, true)

        expect(AuthUser.isLoggedIn).calledWith()
      })
    })

    describe('> IF NOT Cookie <', () => {
      it('should Return False', () => {
        let result = AuthUser.isLoggedIn()

        sinon.assert.match(result, false)

        expect(AuthUser.isLoggedIn).calledWith()
      })
    })
  })

  describe(':: getProfileType() ::', () => {
    let authUser

    beforeEach(() => {
      authUser = new AuthUser()
      authUser.loginAuthUser(mockCustomer)

      sinon.spy(AuthUser, 'getProfileType')
    })

    afterEach(() => {
      authUser.logoutAuthUser()

      expect(AuthUser.getProfileType).callCount(1)
      AuthUser.getProfileType.restore()
    })

    it('should Return Customer Profile Type', () => {
      let result = AuthUser.getProfileType()

      sinon.assert.match(result, PROFILE_TYPES.CUSTOMER)

      expect(AuthUser.getProfileType).calledWith()
    })
  })

  describe(':: isAdministrator() ::', () => {
    beforeEach(() => {
      sinon.spy(AuthUser, 'isAdministrator')
    })

    afterEach(() => {
      expect(AuthUser.isAdministrator).callCount(1)
      AuthUser.isAdministrator.restore()
    })

    describe('> IF profileType <', () => {
      describe('> IF profileType EQUALS administrator <', () => {
        it('should Return True', () => {
          let result = AuthUser.isAdministrator(PROFILE_TYPES.ADMINISTRATOR)

          sinon.assert.match(result, true)

          expect(AuthUser.isAdministrator).calledWith(PROFILE_TYPES.ADMINISTRATOR)
        })
      })

      describe('> IF profileType NOT EQUALS administrator <', () => {
        it('should Return False', () => {
          let result = AuthUser.isAdministrator(PROFILE_TYPES.CUSTOMER)

          sinon.assert.match(result, false)

          expect(AuthUser.isAdministrator).calledWith(PROFILE_TYPES.CUSTOMER)
        })
      })
    })

    describe('> IF NOT profileType <', () => {
      let authUser

      beforeEach(() => {
        authUser = new AuthUser()
      })

      afterEach(() => {
        authUser.logoutAuthUser()
      })

      describe('> IF authUser.profileType EQUALS administrator <', () => {
        it('should Return True', () => {
          authUser.loginAuthUser(mockAdministrator)

          let result = AuthUser.isAdministrator()

          sinon.assert.match(result, true)

          expect(AuthUser.isAdministrator).calledWith()
        })
      })

      describe('> IF authUser.profileType NOT EQUALS administrator <', () => {
        it('should Return False', () => {
          authUser.loginAuthUser(mockCustomer)

          let result = AuthUser.isAdministrator()

          sinon.assert.match(result, false)

          expect(AuthUser.isAdministrator).calledWith()
        })
      })
    })
  })

  describe(':: isAuditor() ::', () => {
    beforeEach(() => {
      sinon.spy(AuthUser, 'isAuditor')
    })

    afterEach(() => {
      expect(AuthUser.isAuditor).callCount(1)
      AuthUser.isAuditor.restore()
    })

    describe('> IF profileType <', () => {
      describe('> IF profileType EQUALS auditor <', () => {
        it('should Return True', () => {
          let result = AuthUser.isAuditor(PROFILE_TYPES.AUDITOR)

          sinon.assert.match(result, true)

          expect(AuthUser.isAuditor).calledWith(PROFILE_TYPES.AUDITOR)
        })
      })

      describe('> IF profileType NOT EQUALS auditor <', () => {
        it('should Return False', () => {
          let result = AuthUser.isAuditor(PROFILE_TYPES.CUSTOMER)

          sinon.assert.match(result, false)

          expect(AuthUser.isAuditor).calledWith(PROFILE_TYPES.CUSTOMER)
        })
      })
    })

    describe('> IF NOT profileType <', () => {
      let authUser

      beforeEach(() => {
        authUser = new AuthUser()
      })

      afterEach(() => {
        authUser.logoutAuthUser()
      })

      describe('> IF authUser.profileType EQUALS auditor <', () => {
        it('should Return True', () => {
          authUser.loginAuthUser(mockAuditor)

          let result = AuthUser.isAuditor()

          sinon.assert.match(result, true)

          expect(AuthUser.isAuditor).calledWith()
        })
      })

      describe('> IF authUser.profileType NOT EQUALS auditor <', () => {
        it('should Return False', () => {
          authUser.loginAuthUser(mockCustomer)

          let result = AuthUser.isAuditor()

          sinon.assert.match(result, false)

          expect(AuthUser.isAuditor).calledWith()
        })
      })
    })
  })

  describe(':: isCustomer() ::', () => {
    beforeEach(() => {
      sinon.spy(AuthUser, 'isCustomer')
    })

    afterEach(() => {
      expect(AuthUser.isCustomer).callCount(1)
      AuthUser.isCustomer.restore()
    })

    describe('> IF profileType <', () => {
      describe('> IF profileType EQUALS customer <', () => {
        it('should Return True', () => {
          let result = AuthUser.isCustomer(PROFILE_TYPES.CUSTOMER)

          sinon.assert.match(result, true)

          expect(AuthUser.isCustomer).calledWith(PROFILE_TYPES.CUSTOMER)
        })
      })

      describe('> IF profileType NOT EQUALS customer <', () => {
        it('should Return False', () => {
          let result = AuthUser.isCustomer(PROFILE_TYPES.ADMINISTRATOR)

          sinon.assert.match(result, false)

          expect(AuthUser.isCustomer).calledWith(PROFILE_TYPES.ADMINISTRATOR)
        })
      })
    })

    describe('> IF NOT profileType <', () => {
      let authUser

      beforeEach(() => {
        authUser = new AuthUser()
      })

      afterEach(() => {
        authUser.logoutAuthUser()
      })

      describe('> IF authUser.profileType EQUALS customer <', () => {
        it('should Return True', () => {
          authUser.loginAuthUser(mockCustomer)

          let result = AuthUser.isCustomer()

          sinon.assert.match(result, true)

          expect(AuthUser.isCustomer).calledWith()
        })
      })

      describe('> IF authUser.profileType NOT EQUALS customer <', () => {
        it('should Return False', () => {
          authUser.loginAuthUser(mockAdministrator)

          let result = AuthUser.isCustomer()

          sinon.assert.match(result, false)

          expect(AuthUser.isCustomer).calledWith()
        })
      })
    })
  })

  describe(':: getProfileTypeVerbose() ::', () => {
    let authUser

    beforeEach(() => {
      sinon.spy(AuthUser, 'getProfileTypeVerbose')
    })

    afterEach(() => {
      expect(AuthUser.getProfileTypeVerbose).callCount(1)
      AuthUser.getProfileTypeVerbose.restore()
    })

    describe('> IF profileType EQUALS administrator <', () => {
      beforeEach(() => {
        authUser = new AuthUser()
        authUser.loginAuthUser(mockAdministrator)
      })

      afterEach(() => {
        authUser.logoutAuthUser()
      })

      it('should Return Administrator String', () => {
        let result = AuthUser.getProfileTypeVerbose()

        sinon.assert.match(result, 'Administrator')

        expect(AuthUser.getProfileTypeVerbose).calledWith()
      })
    })

    describe('> IF profileType EQUALS auditor <', () => {
      beforeEach(() => {
        authUser = new AuthUser()
        authUser.loginAuthUser(mockAuditor)
      })

      afterEach(() => {
        authUser.logoutAuthUser()
      })

      it('should Return Auditor String', () => {
        let result = AuthUser.getProfileTypeVerbose()

        sinon.assert.match(result, 'Auditor')

        expect(AuthUser.getProfileTypeVerbose).calledWith()
      })
    })

    describe('> IF profileType EQUALS customer <', () => {
      beforeEach(() => {
        authUser = new AuthUser()
        authUser.loginAuthUser(mockCustomer)
      })

      afterEach(() => {
        authUser.logoutAuthUser()
      })

      it('should Return Customer String', () => {
        let result = AuthUser.getProfileTypeVerbose()

        sinon.assert.match(result, 'Customer')

        expect(AuthUser.getProfileTypeVerbose).calledWith()
      })
    })

    describe('> IF NOT profileType', () => {
      it('should Return Empty String', () => {
        let result = AuthUser.getProfileTypeVerbose()

        sinon.assert.match(result, '')

        expect(AuthUser.getProfileTypeVerbose).calledWith()
      })
    })
  })
})
