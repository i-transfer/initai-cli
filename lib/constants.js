const emune = require('emune')

const Environments = {
  TEST: 'test',
}

const Errors = {
  FILE_NOT_FOUND: 'The given file was not found.',
  GENERATOR: 'The generator failed to process your request.',
  PARSER: 'The parser failed to process your request.',
  PARSER_RESPONSE_INVALID: 'The parser returned a non-JSON output.',
  WALKER: 'The file system walker encountered an error.',
}

const SocketEvents = Object.assign({},
  emune([
    'CONVERSATION_DATA',
    'CONVERT_JSON_TO_CML',
    'ERROR',
    'FILE_CHANGED',
    'REQUEST_CONVERSATION_DATA',
  ]),
  {DISCONNECT: 'disconnect'}
)

const OriginList = [
  'http://localhost',
  'http://s-csi.init.ai.s3-website-us-east-1.amazonaws.com',
  'https://p-csi.init.ai',
]

const Origins = {
  CORS: {
    ALL: OriginList.map(origin => {
      return (origin.indexOf('localhost') !== -1) ? (
        origin += ':3045'
      ) : origin
    }),
  },
  Sockets: {
    ALL: OriginList.map(origin => origin + ':*'),
  },
}

const PATH_PREFIX = 'language/conversations/'
const PATH_REGEX = /\/language\/conversations\/(.*)/

module.exports = {
  Environments,
  Errors,
  LOG_LEVEL: {
    VERBOSE: 'verbose',
  },
  LOG_TYPES: {
    ACTION: 'logAction',
    MESSAGE: 'logMessage',
  },
  OriginList,
  Origins,
  PATH_PREFIX,
  PATH_REGEX,
  SocketEvents,
}
