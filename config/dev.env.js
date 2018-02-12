let merge = require('webpack-merge')
let prodEnv = require('./prod.env')

let useMock = process.argv[3] === 'use_mock'

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  USE_MOCK_DATA: useMock
})

process.stdout.write('Using mock:' + useMock + '\n')

