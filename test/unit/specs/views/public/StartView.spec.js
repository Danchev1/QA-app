import Vue from 'vue'
import store from '@/store/public'
import router from '@/router/public'
import StartView from '@/views/public/StartView'

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
})
