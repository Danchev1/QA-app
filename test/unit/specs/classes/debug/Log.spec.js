import { LOG_LEVELS } from '@/api/config'
import Log from '@/classes/debug/Log'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

describe('-- Class: Log --', () => {
  sinon.stub(window.location, 'replace')

  describe(':: hasLogLevel() ::', () => {
    beforeEach(() => {
      sinon.spy(Log, 'hasLogLevel')
    })

    afterEach(() => {
      expect(Log.hasLogLevel).callCount(1)
      Log.hasLogLevel.restore()
    })

    describe('> IF logLevel GREATER EQUAL log_level <', () => {
      it('should Return True', () => {
        let result = Log.hasLogLevel(LOG_LEVELS.ERROR + 1)

        sinon.assert.match(result, true)

        expect(Log.hasLogLevel).calledWith(LOG_LEVELS.ERROR + 1)
      })
    })

    describe('> IF logLevel LOWER log_level <', () => {
      it('should Return False', () => {
        let result = Log.hasLogLevel(LOG_LEVELS.TEST - 1)

        sinon.assert.match(result, false)

        expect(Log.hasLogLevel).calledWith(LOG_LEVELS.TEST - 1)
      })
    })
  })

  describe(':: test() ::', () => {
    beforeEach(() => {
      sinon.spy(Log, 'test')
    })

    afterEach(() => {
      expect(Log.test).callCount(1)
      expect(Log.test).calledWith('test')
      Log.test.restore()
    })

    describe('> IF hasLogLevel <', () => {
      it('should Log Console', () => {
        sinon.stub(Log, 'hasLogLevel').returns(true)
        sinon.stub(console, 'log')

        Log.test('test')

        expect(console.log).callCount(1)
        expect(console.log).calledWith('test')
        expect(Log.hasLogLevel).callCount(1)
        console.log.restore()
        Log.hasLogLevel.restore()
      })
    })

    describe('> IF NOT hasLogLevel <', () => {
      it('should Not Log Console', () => {
        sinon.stub(Log, 'hasLogLevel').returns(false)
        sinon.stub(console, 'log')

        Log.test('test')

        expect(console.log).callCount(0)
        expect(Log.hasLogLevel).callCount(1)
        console.log.restore()
        Log.hasLogLevel.restore()
      })
    })
  })

  describe(':: debug() ::', () => {
    beforeEach(() => {
      sinon.spy(Log, 'debug')
    })

    afterEach(() => {
      expect(Log.debug).callCount(1)
      expect(Log.debug).calledWith('debug')
      Log.debug.restore()
    })

    describe('> IF hasLogLevel <', () => {
      it('should Log Console', () => {
        sinon.stub(Log, 'hasLogLevel').returns(true)
        sinon.stub(console, 'log')

        Log.debug('debug')

        expect(console.log).callCount(1)
        expect(console.log).calledWith('debug')
        expect(Log.hasLogLevel).callCount(1)
        console.log.restore()
        Log.hasLogLevel.restore()
      })
    })

    describe('> IF NOT hasLogLevel <', () => {
      it('should Not Log Console', () => {
        sinon.stub(Log, 'hasLogLevel').returns(false)
        sinon.stub(console, 'log')

        Log.debug('debug')

        expect(console.log).callCount(0)
        expect(Log.hasLogLevel).callCount(1)
        console.log.restore()
        Log.hasLogLevel.restore()
      })
    })
  })

  describe(':: error() ::', () => {
    beforeEach(() => {
      sinon.spy(Log, 'error')
    })

    afterEach(() => {
      expect(Log.error).callCount(1)
      expect(Log.error).calledWith('error')
      Log.error.restore()
    })

    describe('> IF hasLogLevel <', () => {
      it('should Log Console', () => {
        sinon.stub(Log, 'hasLogLevel').returns(true)
        sinon.stub(console, 'error')

        Log.error('error')

        expect(console.error).callCount(1)
        expect(console.error).calledWith('error')
        expect(Log.hasLogLevel).callCount(1)
        console.error.restore()
        Log.hasLogLevel.restore()
      })
    })

    describe('> IF NOT hasLogLevel <', () => {
      it('should Not Log Console', () => {
        sinon.stub(Log, 'hasLogLevel').returns(false)
        sinon.stub(console, 'error')

        Log.error('error')

        expect(console.error).callCount(0)
        expect(Log.hasLogLevel).callCount(1)
        console.error.restore()
        Log.hasLogLevel.restore()
      })
    })
  })
})
