class InvalidDataError extends Error {
  static NAME = 'InvalidDataError'

  constructor (message) {
    super(message)
    this.name = InvalidDataError.NAME
  }

}

class NoDataError extends Error {
  static NAME = 'NoDataError'

  constructor (message) {
    super(message)
    this.name = NoDataError.NAME
  }

}

class InvalidStateError extends Error {
  static NAME = 'InvalidStateError'

  constructor (message) {
    super(message)
    this.name = NoDataError.NAME
  }

}

export {
  InvalidDataError,
  NoDataError,
  InvalidStateError
}
