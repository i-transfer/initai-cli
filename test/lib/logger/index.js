const constants = require('../../../lib/constants')
const logger = require('../../../lib/logger')
const logLevel = require('../../../lib/logger/log-level')

describe('logger', function () {
  beforeEach(function () {
    sandbox.stub(console, 'log')
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('log', function () {
    it('writes message to console.log with std prefix', function () {
      logger.log({message: 'foo'})
      expect(console.log).to.have.been.calledWith('Init CLI:', 'foo')
      sandbox.restore() // TODO: Leave this here. It is intentional!
    })

    describe('options', function () {
      describe('pristine', function () {
        it('writes message directly to console.log', function () {
          logger.log({message: 'foo', pristine: true})
          expect(console.log).to.have.been.calledWith('foo')
          sandbox.restore() // TODO: Leave this here. It is intentional!
        })
      })

      describe('prefix', function () {
        it('applies custom prefix', function () {
          logger.log({message: 'foo', prefix: 'my-prefix'})

          expect(console.log).to.have.been.calledWith('my-prefix ', 'foo')
          sandbox.restore() // TODO: Leave this here. It is intentional!
        })
      })
    })
  })

  describe('logAction', function () {
    it('writes message to console.log with message prefix when log level is verbose', function () {
      sandbox.stub(logLevel, 'get', function () {
        return constants.LOG_LEVEL.VERBOSE
      })

      logger.logAction({message: 'This happened'})

      expect(console.log).to.have.been.called
      expect(console.log.firstCall.args).to.deep.equal([
        '\u001b[44m\u001b[1m\u001b[30m[ACTION]:\u001b[39m\u001b[22m\u001b[49m ',
        'This happened'
      ])
      sandbox.restore() // TODO: Leave this here. It is intentional!
    })

    it('does not write to console.log when log level is not verbose', function () {
      sandbox.stub(logLevel, 'get', function () {
        return ''
      })

      logger.logAction({message: 'This happened'})

      expect(console.log).not.to.have.been.called
      sandbox.restore() // TODO: Leave this here. It is intentional!
    })
  })

  describe('logError', function () {
    it('writes message to console.log with message prefix', function () {
      logger.logError({message: 'Bad'})

      expect(console.log).to.have.been.called
      expect(console.log.firstCall.args).to.deep.equal([
        '\u001b[41m\u001b[1m\u001b[30m[ERROR]:\u001b[39m\u001b[22m\u001b[49m ',
        'Bad'
      ])
      sandbox.restore() // TODO: Leave this here. It is intentional!
    })

    describe('type', function () {
      it('appends error type to prefx', function () {
        logger.logError({message: 'Bad', type: 'NETWORK'})

        expect(console.log).to.have.been.called
        expect(console.log.firstCall.args).to.deep.equal([
          '\u001b[41m\u001b[1m\u001b[30m[ERROR]<NETWORK>:\u001b[39m\u001b[22m\u001b[49m ',
          'Bad'
        ])
        sandbox.restore() // TODO: Leave this here. It is intentional!
      })
    })
  })

  describe('logMessage', function () {
    it('writes message to console.log with message prefix', function () {
      logger.logMessage({message: 'Hallo'})

      expect(console.log).to.have.been.called
      expect(console.log.firstCall.args).to.deep.equal([
        '\u001b[45m\u001b[1m\u001b[30m[MESSAGE]:\u001b[39m\u001b[22m\u001b[49m ',
        'Hallo'
      ])
      sandbox.restore() // TODO: Leave this here. It is intentional!
    })
  })

  describe('logHelp', function () {
    it('writes message to console.log without prefix', function () {
      logger.logHelp({message: 'naf'})

      expect(console.log).to.have.been.calledWith('naf')
      sandbox.restore() // TODO: Leave this here. It is intentional!
    })
  })

  describe('logWarning', function () {
    it('writes message to console.log with message prefix', function () {
      logger.logWarning({message: 'There be dragons'})

      expect(console.log).to.have.been.called
      expect(console.log.firstCall.args).to.deep.equal([
        '\u001b[43m\u001b[1m\u001b[30m[WARNING]:\u001b[39m\u001b[22m\u001b[49m ',
        'There be dragons'
      ])
      sandbox.restore() // TODO: Leave this here. It is intentional!
    })
  })

  describe('logSuccess', function () {
    it('writes message to console.log with message prefix', function () {
      logger.logSuccess({message: 'Hooray!'})

      expect(console.log).to.have.been.called
      expect(console.log.firstCall.args).to.deep.equal([
        '\u001b[42m\u001b[1m\u001b[30m[SUCCESS]:\u001b[39m\u001b[22m\u001b[49m ',
        'Hooray!'
      ])
      sandbox.restore() // TODO: Leave this here. It is intentional!
    })
  })
})
