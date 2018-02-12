var merge = require('webpack-merge')
var appsEnv = require('./apps.env')

module.exports = merge(appsEnv, {
  NODE_ENV: '"production"',
  USE_MOCK_DATA: false
})
