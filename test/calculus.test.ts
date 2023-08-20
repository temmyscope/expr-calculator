import request from 'supertest';
import calculus from '../src/app';
import { describe, it,  } from '@jest/globals';

describe('GET /api/calculus', () => {

  it('responds with correct response when valid encoding is sent', (done) => {
    request(calculus)
      .get(`/api/calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=`) //2 * (23/(3*3))- 23 * (2*3)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        error: false, result: -132.89
      }, done);
  }, 10000);

  it('responds with error message when invalid operation is used in expression', (done) => {
    request(calculus)
      .get(`/api/calculus?query=MiUgb2YgKDIzLygzKjMpKS0gMjMgKiAoMiozKQ==`) //2% of (23/(3*3))- 23 * (2*3)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, {
        error: true, message: "Invalid operation/symbol/character found in expression"
      }, done);
  }, 10000);

});