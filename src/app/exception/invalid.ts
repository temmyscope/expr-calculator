export class InvalidOperationException extends Error {
  /**
   * @property {string} message
   */
  constructor(public message: string = 'Invalid operation/symbol/character found in expression') {
    super();
  }
}