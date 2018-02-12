import Vue from 'vue'
import store from '@/store/public'
import ApplicationComponent from '@/components/application/ApplicationView'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Component: ApplicationComponent --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(ApplicationComponent)
  let vm

  beforeEach(() => {
    vm = new Ctor({ store })
  })

  describe(':: computed{} ::', () => {
    it('should Contain Computed Properties', () => {
      sinon.assert.match(vm.title, '')
      sinon.assert.match(vm.description, '')
      sinon.assert.match(vm.layout, {})
      sinon.assert.match(vm.formDescriptors, [])
      sinon.assert.match(vm.formDatas, [])
      sinon.assert.match(vm.service, {})
    })
  })

  describe(':: methods{} ::', () => {
    describe(':: getFormDataForDescriptor() ::', () => {
      it('should Search Through FormDatas', () => {
        sinon.spy(vm, 'getFormDataForDescriptor')
        sinon.spy(vm.formDatas, 'find')

        vm.getFormDataForDescriptor()

        expect(vm.getFormDataForDescriptor).callCount(1)
        expect(vm.formDatas.find).callCount(1)
        expect(vm.getFormDataForDescriptor).calledWith()
        vm.getFormDataForDescriptor.restore()
        vm.formDatas.find.restore()
      })
    })

    describe(':: submitForm() ::', () => {
      it('should Call Function', () => {
        sinon.spy(vm, 'submitForm')

        vm.submitForm()

        expect(vm.submitForm).callCount(1)
        expect(vm.submitForm).calledWith()
        vm.submitForm.restore()
      })
    })

    describe(':: postCurrentFormDatas() ::', () => {
      beforeEach(() => {
        sinon.spy(vm, 'postCurrentFormDatas')
      })

      afterEach(() => {
        expect(vm.postCurrentFormDatas).callCount(1)
        vm.postCurrentFormDatas.restore()
      })

      describe('> IF NOT response <', () => {
        it('should Scroll To Top', (done) => {
          sinon.stub(vm, 'postFormDatas').callsFake(function () {
            return new Promise((resolve) => {
              resolve(null)
            })
          })

          document.body.scrollTop = 1

          vm.postCurrentFormDatas({})

          setTimeout(function () {
            sinon.assert.match(document.body.scrollTop, 0)

            expect(vm.postFormDatas).callCount(1)
            expect(vm.postCurrentFormDatas).calledWith({})
            vm.postFormDatas.restore()
            done()
          }, 50)
        })
      })

      describe('> ELSE <', () => {
        describe('> IF response EQUALS 409 <', () => {
          it('should Call Response Handler', (done) => {
            sinon.stub(vm, 'postFormDatas').callsFake(function () {
              return new Promise((resolve) => {
                resolve({
                  status: 409
                })
              })
            })
            sinon.stub(vm, 'handleResponseInvalidSyntax')

            vm.postCurrentFormDatas({})

            setTimeout(function () {
              expect(vm.postFormDatas).callCount(1)
              expect(vm.handleResponseInvalidSyntax).callCount(1)
              expect(vm.postCurrentFormDatas).calledWith({})
              vm.postFormDatas.restore()
              vm.handleResponseInvalidSyntax.restore()
              done()
            }, 50)
          })
        })

        describe('> ELSE <', () => {
          it('should Do Nothing', (done) => {
            sinon.stub(vm, 'postFormDatas').callsFake(function () {
              return new Promise((resolve) => {
                resolve([
                  200
                ])
              })
            })
            sinon.stub(vm, 'handleResponseInvalidSyntax')

            vm.postCurrentFormDatas({})

            setTimeout(function () {
              expect(vm.postFormDatas).callCount(1)
              expect(vm.handleResponseInvalidSyntax).callCount(0)
              expect(vm.postCurrentFormDatas).calledWith({})
              vm.postFormDatas.restore()
              vm.handleResponseInvalidSyntax.restore()
              done()
            }, 50)
          })
        })
      })
    })

    describe(':: patchCurrentFormDatas() ::', () => {
      beforeEach(() => {
        sinon.spy(vm, 'patchCurrentFormDatas')
      })

      afterEach(() => {
        expect(vm.patchCurrentFormDatas).callCount(1)
        vm.patchCurrentFormDatas.restore()
      })

      describe('> IF NOT response <', () => {
        it('should Scroll To Top', (done) => {
          sinon.stub(vm, 'patchFormData').callsFake(function () {
            return new Promise((resolve) => {
              resolve(null)
            })
          })

          document.body.scrollTop = 1

          vm.patchCurrentFormDatas([{}])

          setTimeout(function () {
            sinon.assert.match(document.body.scrollTop, 0)

            expect(vm.patchFormData).callCount(1)
            expect(vm.patchCurrentFormDatas).calledWith([{}])
            vm.patchFormData.restore()
            done()
          }, 50)
        })
      })

      describe('> ELSE <', () => {
        describe('> IF response EQUALS 409 <', () => {
          it('should Call Response Handler', (done) => {
            sinon.stub(vm, 'patchFormData').callsFake(function () {
              return new Promise((resolve) => {
                resolve({
                  status: 409
                })
              })
            })
            sinon.stub(vm, 'handleResponseInvalidSyntax')

            vm.patchCurrentFormDatas([{}])

            setTimeout(function () {
              expect(vm.patchFormData).callCount(1)
              expect(vm.handleResponseInvalidSyntax).callCount(1)
              expect(vm.patchCurrentFormDatas).calledWith([{}])
              vm.patchFormData.restore()
              vm.handleResponseInvalidSyntax.restore()
              done()
            }, 50)
          })
        })

        describe('> ELSE <', () => {
          it('should Do Nothing', (done) => {
            sinon.stub(vm, 'patchFormData').callsFake(function () {
              return new Promise((resolve) => {
                resolve([
                  200
                ])
              })
            })
            sinon.stub(vm, 'handleResponseInvalidSyntax')

            vm.patchCurrentFormDatas([{}])

            setTimeout(function () {
              expect(vm.patchFormData).callCount(1)
              expect(vm.handleResponseInvalidSyntax).callCount(0)
              expect(vm.patchCurrentFormDatas).calledWith([{}])
              vm.patchFormData.restore()
              vm.handleResponseInvalidSyntax.restore()
              done()
            }, 50)
          })
        })
      })
    })

    describe(':: handleResponseInvalidSyntax() ::', () => {
      it('should Loop Through Response Data', () => {
        sinon.spy(vm, 'handleResponseInvalidSyntax')

        vm.handleResponseInvalidSyntax([{}])

        expect(vm.handleResponseInvalidSyntax).callCount(1)
        vm.handleResponseInvalidSyntax.restore()
      })
    })
  })

  describe(':: mounted() ::', () => {
    it('should Call Function', () => {
      sinon.spy(vm, 'getFormDescriptorsAndData')

      vm.$mount()

      expect(vm.getFormDescriptorsAndData).callCount(1)
      vm.getFormDescriptorsAndData.restore()
    })
  })

  describe(':: beforeDestroy() ::', () => {
    it('should Call Function', () => {
      sinon.spy(vm, 'clearData')

      vm.$mount()
      vm.$destroy()

      expect(vm.clearData).callCount(1)
      vm.clearData.restore()
    })
  })
})
