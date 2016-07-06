'use strict'

const fs = require('fs')
const path = require('path')

const getSSLConfig = require('../../../../programs/server/lib/getSSLConfig')

describe('getSSLConfig', () => {
  it('returns a cetificate and key', () => {
    expect(getSSLConfig()).to.have.all.keys(['certificate', 'key'])
  })
})
