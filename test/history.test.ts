import { describe, expect, it,  } from '@jest/globals';
import assert from 'assert';
import request from 'supertest';
import calculus from '../src/app';
import { QueryHistory } from '../src/app/types';

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
  }, 10000);

});