import { describe, it } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';

describe('Test to check if Api is properly setup', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'B24 Calculus API - 👋🌎🌍🌏',
      }, done);
  });

  it('responds with `not found` status code', (done) => {
    request(app)
      .get('/api/random')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});
