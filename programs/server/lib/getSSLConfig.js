const fs = require('fs')
const path = require('path')

const cliNodeModules = path.resolve(__dirname, '..', '..', '..')
const certsPath = path.join(cliNodeModules, 'node_modules', 'localhost.daplie.com-certificates')

module.exports = function getSSLConfig() {
  return {
    certificate: fs.readFileSync(path.join(certsPath, 'fullchain.pem'), 'ascii'),
    key: fs.readFileSync(path.join(certsPath, 'privkey.pem'), 'ascii'),
  }
}
