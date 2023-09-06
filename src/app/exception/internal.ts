export class InternalErrorException extends Error {
  /**
   * @property {string} message
   */
  constructor(public message: string = 'An unknown error occurred') {
    super();
  }
}