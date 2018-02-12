import Vue from 'vue'
import store from '@/store/customer'
import CustomerCertificateView from '@/views/customer/CertificateView'
import { FORM_CERTIFICATES } from '@/api/config'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Component: CustomerCertificateView --', () => {
  sinon.stub(window.location, 'replace')
  const Ctor = Vue.extend(CustomerCertificateView)
  let vm

  beforeEach(() => {
    vm = new Ctor({ store })
  })

  describe(':: data() ::', () => {
    it('should Contain Data Properties', () => {
      vm.$mount()
      sinon.assert.match(vm.currentFormDescriptors, [])
    })
  })

  describe(':: props() ::', () => {
    it('should Contain Props Properties By Default', () => {
      sinon.assert.match(vm.serviceType, '')
    })
  })

  describe(':: computed{} ::', () => {
    it('should Contain Computed Properties', () => {
      sinon.assert.match(vm.title, '')
      sinon.assert.match(vm.description, '')
      sinon.assert.match(vm.layout, {})
      sinon.assert.match(vm.formDescriptors, [])
      sinon.assert.match(vm.formDatas, [])
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

    describe(':: filterFormDescriptors() ::', () => {
      describe('> IF certificateType EQUALS customer <', () => {
        it('should Slice First', () => {
          sinon.spy(vm, 'filterFormDescriptors')
          sinon.spy(vm.formDescriptors, 'slice')

          vm.filterFormDescriptors(FORM_CERTIFICATES.CUSTOMER)

          expect(vm.filterFormDescriptors).callCount(1)
          expect(vm.formDescriptors.slice).callCount(1)
          expect(vm.filterFormDescriptors).calledWith()
          expect(vm.formDescriptors.slice).calledWith(0, 1)
          vm.filterFormDescriptors.restore()
          vm.formDescriptors.slice.restore()
        })
      })

      describe('> ELSE IF NOT certificateType EQUALS customer <', () => {
        it('should Slice After First', () => {
          sinon.spy(vm, 'filterFormDescriptors')
          sinon.spy(vm.formDescriptors, 'slice')

          vm.filterFormDescriptors(FORM_CERTIFICATES.CEX)

          expect(vm.filterFormDescriptors).callCount(1)
          expect(vm.formDescriptors.slice).callCount(1)
          expect(vm.filterFormDescriptors).calledWith()
          expect(vm.formDescriptors.slice).calledWith(1)
          vm.filterFormDescriptors.restore()
          vm.formDescriptors.slice.restore()
        })
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
})
