export default class State {
  static DEFAULT = 0
  static INFO = 1
  static SUCCESS = 2
  static WARNING = 3
  static DANGER = 4

  static STATE_TAG_CLASS = {
    [State.DEFAULT]: 'is-default',
    [State.INFO]: 'is-info',
    [State.SUCCESS]: 'is-success',
    [State.WARNING]: 'is-warning',
    [State.DANGER]: 'is-danger'
  }

  constructor (value, display, level) {
    this.value = value
    this.display = display
    this.level = level
  }

  static asStates (json) {
    return json.map(state => {
      return State.asState(state)
    })
  }

  static asState (json) {
    return new State(
      json.value,
      json.display,
      json.level
    )
  }

  static getStateClass (level) {
    return State.STATE_TAG_CLASS[level]
  }
}
