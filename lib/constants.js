const os = require('os')

const emune = require('emune')

const Environments = {
  PRODUCTION: 'production',
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

const CML_BINARY = os.platform() === 'win32' ? 'cml-windows.exe' : 'cml'
const PATH_PREFIX = 'language/conversations/'
const URL_PATH_REGEX = /language\/conversations\/(.*)/
const FILE_PATH_REGEX = os.platform() === 'win32' ? /language\\conversations\\(.*)/ : URL_PATH_REGEX
const ROLLBAR_KEY = '0c840d94cb08418fa26681fa4cc03784'

module.exports = {
  CML_BINARY,
  Environments,
  Errors,
  FILE_PATH_REGEX,
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
  ROLLBAR_KEY,
  SocketEvents,
  URL_PATH_REGEX,
}
