export default class Profile {
  static MANAGER = 1
  static AUDITOR = 2
  static ADMINISTRATOR = 3
  static CUSTOMER = 4

  constructor (id, name, userId, profileType, profileTypeDisplay) {
    this.id = id
    this.name = name
    this.userId = userId
    this.profileType = profileType
    this.profileTypeDisplay = profileTypeDisplay
  }

  static asProfiles (json) {
    return json.map(profile => {
      return Profile.asProfile(profile)
    })
  }

  static asProfile (json) {
    return new Profile(
      json.pk,
      json.name,
      json.user_pk,
      json.profile_type,
      json.profile_type_display
    )
  }

  isCustomer () {
    return this.profileType === Profile.CUSTOMER
  }

  isAuditor () {
    return this.profileType === Profile.AUDITOR
  }

  isAdministrator () {
    return this.profileType === Profile.ADMINISTRATOR
  }

  static getProfileTypeDisplay (profileType) {
    if (profileType === Profile.CUSTOMER) {
      return 'Customer'
    }
    if (profileType === Profile.AUDITOR) {
      return 'Auditor'
    }
    if (profileType === Profile.ADMINISTRATOR) {
      return 'Administrator'
    }
  }
}
