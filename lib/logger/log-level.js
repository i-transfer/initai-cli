module.exports = {
  get: function () {
    return process.env.LOG_LEVEL || ''
  },
}
