const handleInvalidArguments = require('../../lib/handleInvalidArguments')

describe('handleInvalidArguments', () => {
  it('returns default message', () => {
    const result = handleInvalidArguments(['foo'])

    expect(result).to.equal('"foo" is not a valid command\n\nTo see all availble commands, run: iai --help')
  })

  describe('suggestions', () => {
    it('returns list', () => {
      const fakeArgs = ['sever']
      const result = handleInvalidArguments(fakeArgs)

      expect(result).to.equal('Did you mean:\n\n$ iai server\n\nTo see all availble commands, run: iai --help')
    })
  })
})
