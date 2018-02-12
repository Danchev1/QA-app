import State from './State'
import FormDescriptor from '@/classes/form/FormDescriptor'
import FormData from '@/classes/form/FormData'

export default class Issue {
  constructor (id, state, title, message, formDescriptors, formDatas, caseId) {
    this.id = id
    this.state = state
    this.title = title
    this.message = message
    this.formDescriptors = formDescriptors
    this.formDatas = formDatas
    this.caseId = caseId
  }

  static asIssues (json) {
    return json.map(issue => {
      return Issue.asIssue(issue)
    })
  }

  static asIssue (json) {
    let formDescriptors = FormDescriptor.asFormDescriptors([{ id: 1, field_sets: json.field_sets }])
    let formDatas = FormData.initiateFormDatas(formDescriptors)
    return new Issue(
      json.id,
      State.asState(json.state),
      json.title,
      json.message,
      formDescriptors,
      formDatas,
      json.case_id
    )
  }
}
