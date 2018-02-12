import { PROFILE_TYPES, USE_MOCK_DATA } from '@/api/config'
import Profile from './Profile'

const Cookies = require('js-cookie')

export default class AuthUser {

  constructor () {
    this.setAuthUserFromCookie()
  }

  setAuthUserFromCookie () {
    let json
    try {
      json = JSON.parse(Cookies.get('AuthUser'))
    } catch (err) {
      json = {}
    }

    if (json.id !== undefined) {
      this.id = json.id
      this.username = json.username
      this.fullName = json.get_full_name
      this.profileType = json.profile_type
      this.profileTypeDisplay = json.profileTypeDisplay
      this.profile = Profile.asProfile(json.profile)
    }
  }

  loginAuthUser (json) {
    Cookies.set('AuthUser', JSON.stringify(json))
    this.setAuthUserFromCookie()
  }

  logoutAuthUser () {
    Cookies.remove('AuthUser')
    this.setAuthUserFromCookie()
  }

  isSwitchedProfile () {
    return this.id !== this.profile.userId
  }

  static isLoggedIn () {
    if (!USE_MOCK_DATA) {
      return !!Cookies.get('csrftoken') && !!Cookies.get('AuthUser')
    } else {
      return !!Cookies.get('AuthUser')
    }
  }

  static getProfileType () {
    let authUser = new AuthUser()
    return authUser.profile.profileType
  }

  static isAdministrator (profileType) {
    if (profileType) {
      return profileType === PROFILE_TYPES.ADMINISTRATOR
    } else {
      return AuthUser.getProfileType() === PROFILE_TYPES.ADMINISTRATOR
    }
  }

  static isAuditor (profileType) {
    if (profileType) {
      return profileType === PROFILE_TYPES.AUDITOR
    } else {
      return AuthUser.getProfileType() === PROFILE_TYPES.AUDITOR
    }
  }

  static isCustomer (profileType) {
    if (profileType) {
      return profileType === PROFILE_TYPES.CUSTOMER
    } else {
      return AuthUser.getProfileType() === PROFILE_TYPES.CUSTOMER
    }
  }

  static getProfileTypeVerbose (profileType) {
    if (AuthUser.isAdministrator(profileType)) {
      return 'Administrator'
    } else if (AuthUser.isAuditor(profileType)) {
      return 'Auditor'
    } else if (AuthUser.isCustomer(profileType)) {
      return 'Customer'
    }

    return ''
  }

}
