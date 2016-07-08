'use strict'

const chalk = require('chalk')

const rollbar = require('./rollbar')
const Environments = require('./constants').Environments

const logger = {
  log() {
    console.log.apply(console, [chalk.bold.blue('[LOG]')].concat([].slice.call(arguments)))
  },

  logError() {
    console.log.apply(console, [chalk.bold.red('[ERROR]')].concat([].slice.call(arguments)))

    if (process.env.NODE_ENV !== Environments.TEST) {
      rollbar.handleError(arguments[0])
    }
  },

  logWarning() {
    console.log.apply(console, [chalk.bold.yellow('[WARNING]')].concat([].slice.call(arguments)))

    if (process.env.NODE_ENV !== Environments.TEST) {
      rollbar.reportMessage(arguments[0], 'warning')
    }
  },

  /**
   * Print a help message or directive
   */
  print() {
    if (arguments.length === 1) {
      console.log(chalk.gray('---------------------------------------------'))
      console.log(arguments[0])
      console.log(chalk.gray('---------------------------------------------'))
    } else {
      console.log.apply(console, [].slice.call(arguments))
    }
  },

  getCommonAppendix() {
    return chalk.gray('\n\nTo see all availble commands, run: ') + chalk.reset.bold.blue.underline('iai --help')
  },
}

module.exports = logger
