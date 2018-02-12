var path = require('path')

module.exports = {
  APPS_CONFIG: {
    'public': {
      entry: {
        app: './src/main-public.js'
      },
      dev: {
        port: 8085,
        autoOpenBrowser: false
      },
      build: {
        index: path.resolve(__dirname, '../../templates/index.html'),
        index_public: path.resolve(__dirname, '../../static/public/index.html'),
        assetsRoot: path.resolve(__dirname, '../../static/'),
        assetsSubDirectory: 'public',
        assetsPublicPath: '/static/'
      }
    },
    'customer': {
      entry: {
        app: './src/main-customer.js'
      },
      dev: {
        port: 8086,
        autoOpenBrowser: false
      },
      build: {
        index: path.resolve(__dirname, '../../templates/idun_customer/dashboard.html'),
        index_public: path.resolve(__dirname, '../../static/customer/dashboard.html'),
        assetsRoot: path.resolve(__dirname, '../../static/'),
        assetsSubDirectory: 'customer',
        assetsPublicPath: '/static/'
      }
    },
    'administrator': {
      entry: {
        app: './src/main-administrator.js'
      },
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': path.resolve('src')
        }
      },
      dev: {
        port: 8087,
        autoOpenBrowser: false
      },
      build: {
        index: path.resolve(__dirname, '../../templates/idun_administrator/dashboard.html'),
        index_public: path.resolve(__dirname, '../../static/administrator/dashboard.html'),
        assetsRoot: path.resolve(__dirname, '../../static/'),
        assetsSubDirectory: 'administrator',
        assetsPublicPath: '/static/'
      }
    },
    'auditor': {
      entry: {
        app: './src/main-auditor.js'
      },
      dev: {
        port: 8088,
        autoOpenBrowser: false
      },
      build: {
        index: path.resolve(__dirname, '../../templates/idun_auditor/dashboard.html'),
        index_public: path.resolve(__dirname, '../../static/auditor/dashboard.html'),
        assetsRoot: path.resolve(__dirname, '../../static/'),
        assetsSubDirectory: 'auditor',
        assetsPublicPath: '/static/'
      }
    }
  }
}
