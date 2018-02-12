import ProfileType from './ProfileType'
import FormDescriptor from '@/classes/form/FormDescriptor'
import FormData from '@/classes/form/FormData'
import Profile from '@/classes/auth/Profile'
import State from '@/classes/case/State'
import FormField from '../form/FormField'
import { dateTimeFormat } from '@/utility/utility_functions'

class ReviewResult {
  constructor (id, state, formDescriptor, formData, finding, _case, responsible) {
    this.id = id
    this.state = state
    this.formDescriptor = formDescriptor
    this.formData = formData
    this.finding = finding
    this.pendingFinding = null
    this.case = _case
    this.responsible = responsible
  }

  static asReviewResults (json) {
    return json.map(jsonCase => {
      return ReviewResult.asReviewResult(jsonCase)
    })
  }

  static asReviewResult (json) {
    let formDescriptors = FormDescriptor.asFormDescriptors([{
      id: 1,
      field_sets: json.field_sets
    }])
    let formDatas = FormData.initiateFormDatas(formDescriptors)
    FormData.loadInitialFormDatas([json.form_data], formDatas)
    let finding = null
    if (json.findings && json.findings.length > 0) {
      finding = json.findings[0]
    }

    return new ReviewResult(
      json.id,
      ReviewResultState.asState(json.state),
      formDescriptors[0],
      formDatas[0],
      finding ? Finding.asFinding(finding) : null,
      json.case,
      json.responsible ? ProfileType.asProfileType(json.responsible) : {},
    )
  }

  static updateListFormResults (currentResults, updatedResults) {
    currentResults.forEach(currentResult => {
      let updated = updatedResults.find(updatedResult => {
        return updatedResult.id === currentResult.id
      })
      updated ? currentResult.updateFromResult(updated) : ''
    })
  }

  updateFromResult (result) {
    if (this.id !== result.id) {
      throw new Error('Objects missmatch')
    }
    this.state = result.state
    this.value = result.value
    this.formDescriptor = result.formDescriptor
    this.formData = result.formData
    this.finding = result.finding
    this.case = result.case
    this.responsible = result.responsible
  }

  setResponsible (json) {
    this.responsible = new ProfileType(json.profile_type_id, json.profile_type_display)
  }

  addOrSetPendingFinding (json) {
    if (!isEmpty(this.finding)) {
      // We are adding a new comment if the finding already exists
      this.finding.addPendingComment(json.created_by)
      return
    }
    this.pendingFinding = new Finding(null, '', json.created_by, [])
  }

  commitPendingFinding () {
    this.finding = this.pendingFinding
    this.pendingFinding = null
  }

  getLabel () {
    return this.formDescriptor.fieldSets[0].fields[0].label
  }

  getValue () {
    return this.formData.fields[this.formDescriptor.fieldSets[0].fields[0].id].value
  }

  getDownloadURL () {
    let formData = this.formData.fields[this.formDescriptor.fieldSets[0].fields[0].id]
    if (FormField.isFileField(formData.type) && formData.file) {
      return `${formData.file.url}`
    }
  }

  getUploadedDate () {
    let formData = this.formData.fields[this.formDescriptor.fieldSets[0].fields[0].id]
    if (FormField.isFileField(formData.type) && formData.file) {
      return dateTimeFormat(formData.file.updated_at)
    }
  }

  getDataGroup () {
    return this.formDescriptor.fieldSets[0].fields[0].dataGroup
  }

  setState (state) {
    this.state = ReviewResultState.getStateByValue(state)
    return this.state
  }

  isPending () {
    return this.state.value === ReviewResultState.PENDING
  }

  isOK () {
    return this.state.value === ReviewResultState.OK
  }

  isNotOK () {
    return this.state.value === ReviewResultState.NOT_OK
  }

  hasPendingFinding () {
    return !isEmpty(this.pendingFinding)
  }

  hasFinding () {
    return !isEmpty(this.finding)
  }

  waitingOnCustomer () {
    return this.responsible.isCustomer() && this.hasFinding()
  }

  waitingOnAuditor () {
    return this.responsible.isAuditor()
  }

  waitingOnReview () {
    if (this.hasPendingFinding()) return false
    return this.responsible.isAuditor() && this.hasFinding()
  }

  getStateClass () {
    if (this.waitingOnCustomer()) {
      return State.STATE_TAG_CLASS[1]
    }
    if (this.waitingOnAuditor()) {
      return State.STATE_TAG_CLASS[1]
    }
    return State.STATE_TAG_CLASS[0]
  }

  getStateLevel () {
    if (this.waitingOnCustomer()) {
      return State.INFO
    }
    if (this.waitingOnAuditor()) {
      return State.INFO
    }
    return State.DEFAULT
  }

  getStateDisplay () {
    if (this.waitingOnCustomer()) {
      return 'Waiting on customer'
    }
    if (this.waitingOnAuditor()) {
      return 'Waiting on auditor'
    }
    return 'Undefined'
  }

  isRejected () {
    let lastComment = this.finding.comments[this.finding.comments.length - 1]
    return lastComment &&
      lastComment.owner.isAuditor() &&
      this.responsible.isCustomer()
  }

}

class ReviewResultState {

  static PENDING = 1
  static OK = 2
  static NOT_OK = 3

  static STATES = {
    [ReviewResultState.PENDING]: {
      value: ReviewResultState.PENDING,
      display: 'Pending',
      level: State.INFO
    },
    [ReviewResultState.OK]: {
      value: ReviewResultState.OK,
      display: 'OK',
      level: State.INFO
    },
    [ReviewResultState.NOT_OK]: {
      value: ReviewResultState.NOT_OK,
      display: 'Not OK',
      level: State.DANGER
    }
  }

  constructor (value, display, level) {
    this.value = value
    this.display = display
    this.level = level
  }

  static asStates (json) {
    return json.map(state => {
      return ReviewResultState.asState(state)
    })
  }

  static asState (json) {
    return new ReviewResultState(
      json.value,
      json.display,
      json.level
    )
  }

  static getStateClass (level) {
    return State.STATE_TAG_CLASS[level]
  }

  static getStateByValue (value) {
    return ReviewResultState.STATES[value]
  }
}

class Finding {
  constructor (id, description, createdBy, comments, created, modified) {
    this.id = id
    this.description = description
    this.createdBy = createdBy
    this.comments = comments
    this.pendingComment = null
    this.created = created
    this.modified = modified
  }

  static asFindings (json) {
    return json.map(jsonCase => {
      return Finding.asFinding(jsonCase)
    })
  }

  static asFinding (json) {
    return new Finding(
      json.id ? json.id : null,
      json.description ? json.description : '',
      Profile.asProfile(json.created_by),
      json.comments ? Comment.asComments(json.comments) : [],
      json.created ? dateTimeFormat(json.created) : '',
      json.modified ? dateTimeFormat(json.modified, 'YYYY-MM-DD HH:mm') : '',
    )
  }

  hasComments () {
    return this.comments.length > 0
  }

  hasPendingComment () {
    return this.pendingComment !== null
  }

  addPendingComment (createdBy) {
    this.pendingComment = new Comment('', '', createdBy, dateTimeFormat(new Date()))
  }

  commitPendingComment () {
    this.comments.push(this.pendingComment)
    this.pendingComment = null
  }

  hasAnsweredFinding () {
    if (this.comments.length > 0) {
      let comment = this.comments[this.comments.length - 1]
      return comment.createdBy.isCustomer()
    }
    return false
  }

}

class Comment {
  constructor (id, text, createdBy, created) {
    this.id = id
    this.text = text
    this.createdBy = createdBy
    this.created = created
  }

  static asComments (json) {
    return json.map(jsonCase => {
      return Comment.asComment(jsonCase)
    })
  }

  static asComment (json) {
    return new Comment(
      json.id,
      json.text,
      Profile.asProfile(json.created_by),
      json.created ? dateTimeFormat(json.created) : dateTimeFormat(new Date())
    )
  }
}

export {
  ReviewResult,
  ReviewResultState
}

function isEmpty (obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}
