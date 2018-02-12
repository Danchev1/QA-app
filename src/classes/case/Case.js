import State from './State'
import Service from './Service'
import Customer from './Customer'
import ProfileType from './ProfileType'
import { Auditor } from './Auditor'
import Document from './Document'
import { InvalidStateError } from '../errors'
import { dateTimeFormat } from '@/utility/utility_functions'

class Case {

  static ACCEPT_CASE = 1
  static REJECT_CASE = 2
  static BEGIN_REVIEW = 3

  constructor (id, state, caseNumber, applicationDate, expires, level, modified, documents, responsible, service, auditor, customer, progress) {
    this.id = id
    this.state = state
    this.caseNumber = caseNumber
    this.applicationDate = applicationDate
    this.expires = expires
    this.level = level
    this.modified = modified
    this.documents = documents
    this.responsible = responsible
    this.service = service
    this.auditor = auditor
    this.customer = customer
    this.progress = progress
  }

  static asCases (json) {
    return json.map(jsonCase => {
      return Case.asCase(jsonCase)
    })
  }

  static asCase (json) {
    return new Case(
      json.id,
      CaseState.asState(json.state),
      json.case_id,
      json.application.application_date ? dateTimeFormat(json.application.application_date) : '',
      json.expires,
      json.level,
      json.modified ? dateTimeFormat(json.modified, 'YYYY-MM-DD HH:mm') : '',
      json.documents ? Document.asDocuments(json.documents) : [],
      ProfileType.asProfileType(json.responsible),
      Service.asService(json.service),
      json.auditor ? Auditor.asAuditor(json.auditor) : null,
      Customer.asCustomer(json.customer),
      json.progress ? json.progress : 0,
    )
  }

  updateCurrentCase (_case) {
    if (this.id !== _case.id) {
      throw new Error('Objects missmatch')
    }
    this.state = _case.state
    this.caseNumber = _case.caseNumber
    this.applicationDate = _case.applicationDate
    this.expires = _case.expires
    this.level = _case.level
    this.modified = _case.modified
    this.documents = _case.documents
    this.responsible = _case.responsible
    this.service = _case.service
    this.auditor = _case.auditor
    this.customer = _case.customer
    this.progress = _case.progress
  }

  isInReview () {
    return this.state.value === CaseState.IN_REVIEW
  }

  getCaseActions () {
    if (this.state.value === CaseState.AUDITOR_REQUESTED) {
      return [
        {
          action_type: Case.ACCEPT_CASE,
          name: 'Accept case'
        },
        {
          action_type: Case.REJECT_CASE,
          name: 'Reject case'
        }
      ]
    }
    if (this.state.value === CaseState.AUDITOR_ASSIGNED) {
      return [
        {
          action_type: Case.BEGIN_REVIEW,
          name: 'Begin review'
        }
      ]
    }
    return []
  }
}

class CaseState {
  static CREATED = 1
  static AUDITOR_REQUESTED = 2
  static AUDITOR_ASSIGNED = 3
  static IN_REVIEW = 4
  static DONE = 5

  static VALID_STATES = [
    CaseState.CREATED,
    CaseState.AUDITOR_REQUESTED,
    CaseState.AUDITOR_ASSIGNED,
    CaseState.IN_REVIEW,
    CaseState.DONE]

  static STATES = {
    [CaseState.CREATED]: {
      value: CaseState.CREATED,
      display: 'Created',
      level: State.INFO
    },
    [CaseState.AUDITOR_REQUESTED]: {
      value: CaseState.AUDITOR_REQUESTED,
      display: 'Auditor requested',
      level: State.INFO
    },
    [CaseState.AUDITOR_ASSIGNED]: {
      value: CaseState.AUDITOR_ASSIGNED,
      display: 'Auditor assigned',
      level: State.SUCCESS
    },
    [CaseState.IN_REVIEW]: {
      value: CaseState.IN_REVIEW,
      display: 'In review',
      level: State.INFO
    },
    [CaseState.DONE]: {
      value: CaseState.DONE,
      display: 'Done',
      level: State.DONE
    }
  }

  constructor (value, display, level) {
    if (!CaseState.VALID_STATES.includes(value)) throw InvalidStateError()
    this.value = value
    this.display = display
    this.level = level
  }

  static asState (json) {
    return new State(
      json.value,
      json.display,
      json.level
    )
  }

}

export {
  Case,
  CaseState
}
