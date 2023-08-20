import { describe, expect, it,  } from '@jest/globals';
import assert from 'assert';
import request from 'supertest';
import calculus from '../src/app';
import { QueryHistory } from '../src/app/types';

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

  it('responds with error message when invalid operation is used in expression', (done) => {
    request(calculus)
      .get(`/api/calculus?query=MiUgb2YgKDIzLygzKjMpKS0gMjMgKiAoMiozKQ==`) //2% of (23/(3*3))- 23 * (2*3)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, {
        error: true, message: "Invalid operation/symbol/character found in expression"
      }, done);
  });

});

describe('GET /api/calculus/history', () => {

  it('responds with last 5 operations done by user', async () => {
    const res = await request(calculus)
      .get(`/api/calculus/history`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        error: false, data: []
      });

    expect((res.body.data as Array<QueryHistory>).length).toBeLessThanOrEqual(5)
  });

  it('responds with last correct attributes in response data body', (done) => {
    request(calculus)
      .get(`/api/calculus/history`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        assert(
          (response.body.data as Array<QueryHistory>)[0].query, '2 *%(23/(3*3))- 23 * (2*3)'
        );
        assert(
          (response.body.data as Array<QueryHistory>)[0].result, '-132.89'
        );
      }, done);
  });

});