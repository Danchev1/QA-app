import { LOG_LEVEL, LOG_LEVELS } from '@/api/config'

export default class Log {

  static test (...objects) {
    if (Log.hasLogLevel(LOG_LEVELS.TEST)) {
      objects.forEach(object => {
        console.log(object)
      })
    }
  }

  static debug (...objects) {
    if (Log.hasLogLevel(LOG_LEVELS.DEBUG)) {
      objects.forEach(object => {
        console.log(object)
      })
    }
  }

  static error (...objects) {
    if (Log.hasLogLevel(LOG_LEVELS.ERROR)) {
      objects.forEach(object => {
        console.error(object)
      })
    }
  }

  static hasLogLevel (logLevel) {
    return LOG_LEVEL <= logLevel
  }

}
