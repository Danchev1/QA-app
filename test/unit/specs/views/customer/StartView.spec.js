import Vue from 'vue'
import store from '@/store/customer'
import StartView from '@/views/customer/StartView'
import { FORM_CERTIFICATES } from '@/api/config'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Component: StartView --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(StartView)
  let vm

  beforeEach(() => {
    vm = new Ctor({ store })
  })

  describe(':: data() ::', () => {
    it('should Contain Data Properties', () => {
      vm.$mount()
      sinon.assert.match(vm.formCertificates, FORM_CERTIFICATES)
    })
  })
})
