import Vue from 'vue'
import store from '@/store/administrator'
import router from '@/router/administrator'
import StartView from '@/views/administrator/StartView'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- View: StartView - Administrator --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(StartView)
  let vm

  beforeEach(() => {
    vm = new Ctor({ store })
  })
})
