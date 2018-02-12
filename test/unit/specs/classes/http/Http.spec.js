import Http from '@/classes/http/Http'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Class: Http --', () => {
  sinon.stub(window.location, 'replace')

  describe(':: init() ::', () => {
    it('should Execute Init', () => {
      sinon.spy(Http, 'init')

      Http.init()

      expect(Http.init).callCount(1)
      expect(Http.init).calledWith()
      Http.init.restore()
    })
  })

  describe(':: get() ::', () => {
    let properties

    beforeEach(() => {
      properties = {
        url: '/',
        params: ''
      }

      sinon.spy(Http, 'get')
    })

    afterEach(() => {
      expect(Http.get).callCount(1)
      Http.get.restore()
    })

    it('should Return A Promise', () => {
      let result = Http.get(properties)

      sinon.assert.match(typeof result.then, 'function')

      expect(Http.get).calledWith(properties)
    })
  })

  describe(':: post() ::', () => {
    let properties

    beforeEach(() => {
      properties = {
        url: '/',
        data: ''
      }

      sinon.spy(Http, 'post')
    })

    afterEach(() => {
      expect(Http.post).callCount(1)
      Http.post.restore()
    })

    it('should Return A Promise', () => {
      let result = Http.post(properties)

      sinon.assert.match(typeof result.then, 'function')

      expect(Http.post).calledWith(properties)
    })
  })

  describe(':: patch() ::', () => {
    let properties

    beforeEach(() => {
      properties = {
        url: '/',
        data: ''
      }

      sinon.spy(Http, 'patch')
    })

    afterEach(() => {
      expect(Http.patch).callCount(1)
      Http.patch.restore()
    })

    it('should Return A Promise', () => {
      let result = Http.patch(properties)

      sinon.assert.match(typeof result.then, 'function')

      expect(Http.patch).calledWith(properties)
    })
  })
})
