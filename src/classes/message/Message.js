export default class Message {

  static DURATION = 3500
  static POSITION = 'is-top'
  static LEVEL = {
    '1': 'is-success',
    '2': 'is-info',
    '3': 'is-warning',
    '4': 'is-danger'
  }

  constructor (message, type, duration, position, actionText, onAction) {
    this.message = message
    this.type = type
    this.duration = duration
    this.position = position
    this.actionText = actionText
    this.onAction = onAction
  }

  static asMessages (payload) {
    return payload.map(message => {
      return Message.asMessage(message)
    })
  }

  static asMessage (payload) {
    return new Message(
      payload.message,
      payload.type,
      payload.duration ? payload.duration : 3500,
      payload.position,
      payload.actionText ? payload.actionText : null,
      payload.onAction ? payload.actionText : null
    )
  }

  static defaultMessage (message, level, duration = Message.DURATION, position = Message.POSITION, actionText = null, onAction = null) {
    return {
      message: message,
      type: Message.LEVEL[level],
      duration: duration,
      position: position,
      actionText: actionText,
      onAction: onAction
    }
  }
}
