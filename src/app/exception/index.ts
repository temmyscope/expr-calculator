export class InvalidOperationException extends Error {
  /**
   * @property {string} message
   */
  constructor(public message: string = "Invalid operation/symbol/character found in expression") {
    super();
  }
}

export class InternalErrorException extends Error {
  /**
   * @property {string} message
   */
  constructor(public message: string = 'An unknown error occurred') {
    super();
  }
}