'use strict'

const chalk = require('chalk')
const logLevel = require('./log-level')
const constants = require('../constants')

let prefixes = {
  std: 'Init CLI:',
}

function log(options) {
  options = options || {}

  if (options.pristine) {
    console.log(options.message)
  } else {
    console.log(options.prefix ? options.prefix + ' ' : prefixes.std, options.message)
  }
}

function logAction(options) {
  if (logLevel.get() === constants.LOG_LEVEL.VERBOSE) {
    log({
      message: options.message,
      prefix: chalk.bgBlue.bold.black('[ACTION]:'),
    })
  }
}

function logError(options) {
  let prefix = '[ERROR]'

  if (options.type) {
    prefix = prefix + '<' + options.type + '>'
  }

  log({
    message: options.message,
    prefix: chalk.bgRed.bold.black(prefix + ':'),
  })
}

function logMessage(options) {
  log({
    message: options.message,
    prefix: chalk.bgMagenta.bold.black('[MESSAGE]:'),
  })
}

function logHelp(options) {
  log({
    message: options.message,
    pristine: true,
  })
}

function logWarning(options) {
  log({
    message: options.message,
    prefix: chalk.bgYellow.bold.black('[WARNING]:'),
  })
}

function logSuccess(options) {
  log({
    message: options.message,
    prefix: chalk.bgGreen.bold.black('[SUCCESS]:'),
  })
}

module.exports = {
  log,
  logAction,
  logError,
  logHelp,
  logMessage,
  logSuccess,
  logWarning,
}
