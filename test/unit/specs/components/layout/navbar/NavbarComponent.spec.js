import Vue from 'vue'
import store from '@/store/customer'
import router from '@/router/customer'
import NavbarComponent from '@/components/layout/navbar/NavbarComponent'
import AuthUser from '@/classes/auth/AuthUser'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Component: NavbarComponent --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(NavbarComponent)
  let vm

  beforeEach(() => {
    vm = new Ctor({ store, router })
  })

  describe(':: props() ::', () => {
    it('should Contain Props Properties By Default', () => {
      sinon.assert.match(vm.items, [])
      sinon.assert.match(vm.isPublic, true)
    })
  })

  describe(':: computed{} ::', () => {
    it('should Contain Computed Properties', () => {
      vm.$mount()
      sinon.assert.match(vm.authUser, new AuthUser())
    })
  })
})
