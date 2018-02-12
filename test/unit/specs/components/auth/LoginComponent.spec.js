import Vue from 'vue'
import store from '@/store/public'
import LoginComponent from '@/components/auth/LoginComponent'
import { PROCESS_ENVIRONMENT, USE_MOCK_DATA, LOG_LEVELS, LOG_LEVEL } from '@/api/config'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Component: LoginComponent --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(LoginComponent)
  let vm

  beforeEach(() => {
    vm = new Ctor({ store })
  })

  describe(':: data() ::', () => {
    it('should Contain Data Properties', () => {
      vm.$mount()
      sinon.assert.match(vm.user, null)
      sinon.assert.match(vm.password, null)
      sinon.assert.match(vm.processEnvironment, PROCESS_ENVIRONMENT)
      sinon.assert.match(vm.useMockData, USE_MOCK_DATA)
      sinon.assert.match(vm.logLevels, LOG_LEVELS)
      sinon.assert.match(vm.logLevel, LOG_LEVEL)
    })
  })
})
