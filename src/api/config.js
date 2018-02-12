let APPS_ENV = require('../../config/apps.env')
let APPS_CONFIG = APPS_ENV.APPS_CONFIG

/**
 * @return {String} PROCESS_ENVIRONMENTS
 * The available process Environments
 */
export const PROCESS_ENVIRONMENTS = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  TEST: 'testing'
}

/**
 * @return {String} PROCESS_ENVIRONMENT
 * The currently used process Environment
 */
export const PROCESS_ENVIRONMENT = process.env.NODE_ENV ? process.env.NODE_ENV : PROCESS_ENVIRONMENTS.PRODUCTION

/**
 * @return {String} API_ROOT
 * The Root URL for back-end calls
 */
export const API_ROOT = (PROCESS_ENVIRONMENT === PROCESS_ENVIRONMENTS.PRODUCTION) ? 'http://idun.veridens.com' : 'http://localhost:8000'

/**
 * @return {Boolean} USE_MOCK_DATA
 * Whether API calls should return real or mock data
 */
export const USE_MOCK_DATA = process.env.USE_MOCK_DATA

/**
 * @return {Number} LOG_LEVELS
 * The available Log Levels
 */
export const LOG_LEVELS = {
  TEST: 0,
  DEBUG: 1,
  ERROR: 2
}

function getLogLevel () {
  if (PROCESS_ENVIRONMENT === PROCESS_ENVIRONMENTS.PRODUCTION) {
    return LOG_LEVELS.ERROR
  } else if (PROCESS_ENVIRONMENT === PROCESS_ENVIRONMENTS.DEVELOPMENT) {
    return LOG_LEVELS.DEBUG
  } else {
    return LOG_LEVELS.TEST
  }
}

/**
 * @return {Number} LOG_LEVEL
 * The currently used Log Level
 */
export const LOG_LEVEL = getLogLevel()

/**
 * @return {String} API_APPS
 * The URLs for the different front-end APPs
 */
export const API_APPS = {
  PUBLIC: (PROCESS_ENVIRONMENT === PROCESS_ENVIRONMENTS.PRODUCTION) ? 'http://idun.veridens.com/#' : 'http://localhost:' + APPS_CONFIG['public'].dev.port + '/#',
  CUSTOMER: (PROCESS_ENVIRONMENT === PROCESS_ENVIRONMENTS.PRODUCTION) ? 'http://idun.veridens.com/customer/dashboard/#' : 'http://localhost:' + APPS_CONFIG['customer'].dev.port + '/#',
  ADMINISTRATOR: (PROCESS_ENVIRONMENT === PROCESS_ENVIRONMENTS.PRODUCTION) ? 'http://idun.veridens.com/administrator/dashboard/#' : 'http://localhost:' + APPS_CONFIG['administrator'].dev.port + '/#',
  AUDITOR: (PROCESS_ENVIRONMENT === PROCESS_ENVIRONMENTS.PRODUCTION) ? 'http://idun.veridens.com/auditor/dashboard/#' : 'http://localhost:' + APPS_CONFIG['auditor'].dev.port + '/#'
}

/**
 * @return {String} FORM_CERTIFICATES
 * The identifiers for the different Norse_Services
 */
export const FORM_CERTIFICATES = {
  ENEXP: 'ENEXP',
  CEX: 'CEX',
  FUNK: 'FUNK',
  CUSTOMER: 'CUSTOMER'
}

/**
 * @return {String} FORM_TYPES
 * The types for the different Norse_Services_Forms
 */
export const FORM_TYPES = {
  APPLICATION: 'application'
}

/**
 * @return {Number} PROFILE_TYPES
 * The identifiers for the different Profile Types
 */
export const PROFILE_TYPES = {
  MANAGER: 1,
  AUDITOR: 2,
  ADMINISTRATOR: 3,
  CUSTOMER: 4
}

/**
 * @return {String} CASE_STATES
 * The identifiers for the different Case States
 */
export const CASE_STATES = {
  ACTION_REQUIRED: 'Action Required',
  DONE: 'Done',
  ASSIGNING_REVIEWER: 'Assigning Reviewer',
  IN_REVIEW: 'In Review'
}

/**
 * @return {String} ROUTER_MODE
 * The router mode can be set here
 */

export const ROUTER_MODE = (PROCESS_ENVIRONMENT === PROCESS_ENVIRONMENTS.PRODUCTION) ? 'hash' : 'hash'
