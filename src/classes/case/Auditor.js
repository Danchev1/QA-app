import { Case } from './Case'
import ProfileType from './ProfileType'

class Auditor {
  constructor (id, name) {
    this.id = id
    this.profileType = ProfileType.AUDITOR
    this.name = name
    this.profileTypeDisplay = ProfileType.getProfileTypeDisplay(ProfileType.AUDITOR)
  }

  static asAuditors (json) {
    return json.map(auditor => {
      return Auditor.asAuditor(auditor)
    })
  }

  static asAuditor (json) {
    return new Auditor(
      json.id,
      json.fullname ? json.fullname : json.name,
    )
  }
}

class AuditorRequest {
  static PENDING = 1
  static ACCEPTED = 2
  static DECLINED = 3

  constructor (id, _case, state, auditor) {
    this.id = id
    this.case = _case
    this.state = state
    this.auditor = auditor
  }

  static asAuditorRequests (json) {
    return json.map(json => {
      return AuditorRequest.asAuditorRequest(json)
    })
  }

  static asAuditorRequest (json) {
    return new AuditorRequest(
      json.id,
      json.case ? Case.asCase(json.case) : null,
      json.state,
      json.auditor ? Auditor.asAuditor(json.auditor) : null
    )
  }
}

export {
  Auditor,
  AuditorRequest
}
