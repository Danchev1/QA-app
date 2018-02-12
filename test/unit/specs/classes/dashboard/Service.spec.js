import mockDashboardCustomer from '@/api/mock/dashboard/dashboardCustomer'
import Service from '@/classes/dashboard/Service'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Class: Service --', () => {
  sinon.stub(window.location, 'replace')

  describe(':: asServices() ::', () => {
    it('should Create An Array Of Services', () => {
      let mockServices = [mockDashboardCustomer[0].service]
      sinon.spy(Service, 'asServices')

      let services = Service.asServices(mockServices)

      sinon.assert.match(services[0].id, mockServices[0].id)
      sinon.assert.match(services.length, mockServices.length)

      expect(Service.asServices).callCount(1)
      expect(Service.asServices).calledWith(mockServices)
      Service.asServices.restore()
    })
  })

  describe(':: asService() ::', () => {
    it('should Create A Service', () => {
      let mockService = mockDashboardCustomer[0].service
      sinon.spy(Service, 'asService')

      let service = Service.asService(mockService)

      sinon.assert.match(service.id, mockService.id)

      expect(Service.asService).callCount(1)
      expect(Service.asService).calledWith(mockService)
      Service.asService.restore()
    })
  })
})
