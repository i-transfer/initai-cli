'use strict'

const fs = require('fs')
const isFunction = require('lodash.isfunction')
const constants = require('../../lib/constants')
const getConversationData = require('./lib/getConversationData')
const convertJSONtoCML = require('./lib/convertJSONtoCML')

const SocketEvents = constants.SocketEvents

class SocketApp {
  constructor(options) {
    if (process.env.NODE_ENV !== constants.Environments.TEST) {
      console.log('[Socket Connection]')
    }
    this.socket = options.socket
    this.attachEvents()
    this.watchForChanges()
  }

  attachEvents() {
    this.socket.on(SocketEvents.REQUEST_CONVERSATION_DATA, this.handleRequestConversationData)
    this.socket.on(SocketEvents.CONVERT_JSON_TO_CML, this.handleConvertJSONToCML)
    this.socket.on(SocketEvents.DISCONNECT, this.handleDisconnect)
  }

  handleDisconnect() {
    console.log('Socket disconnected')
  }

  handleRequestConversationData(reply) {
    if (!isFunction(reply)) {
      reply = () => {}
    }

    getConversationData(reply)
  }

  handleConvertJSONToCML(data, reply) {
    if (!isFunction(reply)) {
      reply = () => {}
    }

    convertJSONtoCML(data, reply)
  }

  watchForChanges() {
    try {
      const watcher = fs.watch(constants.PATH_PREFIX, {
        persistent: false,
        recursive: true,
      })

      watcher.on('change', () => {
        this.socket.emit(SocketEvents.FILE_CHANGED)
      })

      // TODO Handle error
      // watcher.on('error', () => {})
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = SocketApp
