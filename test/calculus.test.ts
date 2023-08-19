import { describe, it } from '@jest/globals';
import request from 'supertest';
import calculus from '../src/app';

describe('GET /api/calculus', () => {

  it('responds with correct response when valid encoding is sent', (done) => {
    request(calculus)
      .get(`/api/calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=`) //2 * (23/(3*3))- 23 * (2*3)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        error: false, result: -132.89
      }, done);
  });

  it('responds with error message when invalid encoding is passed', (done) => {
    request(calculus)
      .get(`/api/calculus?query=MiAqICgyMy8oMyozKSktIDICogKDIqMyk`) //random string
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        error: true, message: ""
      }, done);
  });

  it('responds with error message when invalid operation is used in expression', (done) => {
    request(calculus)
      .get(`/api/calculus?query=MiAqJSgyMy8oMyozKSktIDIzICogKDIqMyk=`) //2 *%(23/(3*3))- 23 * (2*3)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        error: true, message: "Invalid operation used: only +, -, *, /, (, ) are supported"
      }, done);
  });

});