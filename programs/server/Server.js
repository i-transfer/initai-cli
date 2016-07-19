'use strict'

const restify = require('restify')
const socketio = require('socket.io')

const constants = require('../../lib/constants')
const logger = require('../../lib/logger')

const convertJSONtoCML = require('./lib/convertJSONtoCML')
const getConversationData = require('./lib/getConversationData')
const saveCML = require('./lib/saveCML')
const getSSLConfig = require('./lib/getSSLConfig')

const port = 8443

class Server {
  constructor() {
    this.httpServer = this.configureHTTPServer()
    this.socketServer = this.configureSocketServer()

    this.configureHandlers()
    this.startHTTPServer()
  }

  configureHTTPServer() {
    const server = restify.createServer(Object.assign(
      {},
      getSSLConfig(),
      {name: 'Init.ai Training Server'}
    ))

    server.use(restify.CORS({
      origins: constants.Origins.CORS.ALL,
    }))

    server.use(restify.bodyParser())

    return server
  }

  configureSocketServer() {
    const io = socketio.listen(this.httpServer.server)
    const SocketApp = require('./SocketApp')

    io.set.apply(io, ['origins', constants.Origins.Sockets.ALL.join(', ')])
    io.on('connection', socket => new SocketApp({socket}))

    return io
  }

  configureHandlers() {
    this.httpServer.get('/', (_, response) => {
      getConversationData((err, data) => {
        if (err) {
          response.send(err.status || 500, {
            error: err.error,
            detail: err.detail,
          })
        } else {
          response.json(data)
        }
      })
    })

    this.httpServer.post('/json2cml', (request, response) => {
      convertJSONtoCML(request.body, (err, data) => {
        if (err) {
          response.send(err.status || 500, {
            error: err.error,
            detail: err.detail,
          })
        } else {
          response.json(data)
        }
      })
    })

    this.httpServer.del(constants.URL_PATH_REGEX, require('./handlers/delete'))
    this.httpServer.get(constants.URL_PATH_REGEX, require('./handlers/get'))
    this.httpServer.head(constants.URL_PATH_REGEX, require('./handlers/get'))

    this.httpServer.put(constants.URL_PATH_REGEX, (request, response) => {
      convertJSONtoCML(request.body, (err, data) => {
        if (err) {
          response.send(err.status || 500, {
            error: err.error,
            detail: err.detail,
          })
        } else {
          saveCML(request.params[0], data.content).then(() => {
            response.json(data)
          }, (err) => {
            response.send(500, err)
          }).catch(err => {
            response.send(500, err)
          })
        }
      })
    })
  }

  startHTTPServer() {
    this.httpServer.listen(port, () => {
      logger.log(`${this.httpServer.name} running at ${this.httpServer.url}`)
    })
  }
}

module.exports = Server
