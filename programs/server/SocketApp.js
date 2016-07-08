'use strict'

const fs = require('fs')
const isFunction = require('lodash.isfunction')
const constants = require('../../lib/constants')
const logger = require('../../lib/logger')
const getConversationData = require('./lib/getConversationData')
const convertJSONtoCML = require('./lib/convertJSONtoCML')

const SocketEvents = constants.SocketEvents

class SocketApp {
  constructor(options) {
    logger.log('Socket connection established')

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
    logger.log('Socket disconnected')
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
    } catch (error) {
      if (error.code === 'ENOENT') {
        logger.logWarning('It appears you may not be in an Init.ai project repository. Make sure to run the CLI from the appropraite directory.')
      } else {
        logger.logError(error)
      }
    }
  }
}

module.exports = SocketApp
