'use strict'

const natural = require('natural')

const spellcheckCorpus = ['server']
const programSpellcheck = new natural.Spellcheck(spellcheckCorpus)

const appendix = '\n\nTo see all availble commands, run: iai --help'

module.exports = function handleInvalidArguments(args) {
  const programName = args[0] || ''
  const suggestions = programSpellcheck.getCorrections(programName)

  let reply = '"' + args[0] + '" is not a valid command'

  if (suggestions.length) {
    reply = 'Did you mean:\n'

    suggestions.forEach(suggestion => {
      reply += '\n$ iai ' + suggestion
    })
  }

  return reply + appendix
}
