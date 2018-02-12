export default class ProfileType {
  static MANAGER = 1
  static AUDITOR = 2
  static ADMINISTRATOR = 3
  static CUSTOMER = 4

  constructor (profileType, profileTypeDisplay) {
    this.profileType = profileType
    this.profileTypeDisplay = profileTypeDisplay
  }

  static asProfileTypes (json) {
    return json.map(customer => {
      return ProfileType.asProfileType(customer)
    })
  }

  static asProfileType (json) {
    return new ProfileType(
      json.profile_type_id,
      json.profile_type_display,
    )
  }

  isCustomer () {
    return this.profileType === ProfileType.CUSTOMER
  }

  isAuditor () {
    return this.profileType === ProfileType.AUDITOR
  }

  isAdministrator () {
    return this.profileType === ProfileType.ADMINISTRATOR
  }

  isManager () {
    return this.profileType === ProfileType.MANAGER
  }

  static getProfileTypeDisplay (profileType) {
    if (profileType === ProfileType.CUSTOMER) {
      return 'Customer'
    }
    if (profileType === ProfileType.AUDITOR) {
      return 'Auditor'
    }
    if (profileType === ProfileType.ADMINISTRATOR) {
      return 'Administrator'
    }
    if (profileType === ProfileType.MANAGER) {
      return 'Manager'
    }
  }

}
