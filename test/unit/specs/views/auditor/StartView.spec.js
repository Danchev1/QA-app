import Vue from 'vue'
import store from '@/store/auditor'
import StartView from '@/views/auditor/StartView'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- View: StartView - Auditor --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(StartView)
  let vm

  beforeEach(() => {
    vm = new Ctor({ store })
  })

})
