'use strict'

const fs = require('fs')
const SocketApp = require('../../../programs/server/SocketApp')

describe('SocketApp', () => {
  let fakeSocket

  beforeEach(() => {
    fakeSocket = {
      on: sandbox.stub(),
      emit: sandbox.stub(),
    }
  })

  describe('constructor', () => {
    beforeEach(() => {
      sandbox.stub(SocketApp.prototype, 'attachEvents')
      sandbox.stub(SocketApp.prototype, 'watchForChanges')
    })

    it('sets instance properties', () => {
      const socketApp = new SocketApp({socket: fakeSocket})

      expect(socketApp.socket).to.deep.equal(fakeSocket)
    })

    it('calls attachEvents', () => {
      const socketApp = new SocketApp({socket: fakeSocket})

      expect(socketApp.attachEvents).to.have.been.called
    })
  })

  describe('attachEvents', () => {
    it('binds handlers', () => {
      SocketApp.prototype.attachEvents.call({
        socket: fakeSocket,
        watchForChanges: sandbox.stub()
      })

      expect(fakeSocket.on.args).to.have.length(3)
      expect(fakeSocket.on.args[0][0]).to.equal('REQUEST_CONVERSATION_DATA')
      expect(fakeSocket.on.args[1][0]).to.equal('CONVERT_JSON_TO_CML')
      expect(fakeSocket.on.args[2][0]).to.equal('disconnect')
    })
  })

  describe('watchForChanges', () => {
    let fakeWatcher

    beforeEach(() => {
      fakeWatcher = {
        events: {},
        on(evt, fn) {
          if (fakeWatcher.events.hasOwnProperty(evt)) {
            fakeWatcher.events[evt].push(fn)
          } else {
            fakeWatcher.events[evt] = [fn]
          }
        },
        emit(evt) {
          fakeWatcher.events[evt].forEach(fn => {
            fn()
          })
        }
      }

      sandbox.stub(fs, 'watch').returns(fakeWatcher)
    })

    it('emits a FILE_CHANGED event', () => {
      SocketApp.prototype.watchForChanges.call({socket: fakeSocket})

      fakeWatcher.emit('change')

      expect(fakeSocket.emit).to.have.been.calledWith('FILE_CHANGED')
    })
  })
})
