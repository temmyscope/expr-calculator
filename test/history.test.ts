import assert from 'assert';
import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import calculus from '../src/app';
import { QueryHistory } from '../src/app/types';

describe('GET /api/calculus/history', () => {
  it('responds with last 5 operations done by user', async () => {
    request(calculus)
      .get('/api/calculus/history')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect((res.body.data as Array<QueryHistory>).length).toBeLessThanOrEqual(5);
        expect(res.body.data[0]).toHaveProperty('query');
        expect(res.body.data[0]).toHaveProperty('result');
      });
  });
});
