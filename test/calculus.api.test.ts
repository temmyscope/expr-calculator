import request from 'supertest';
import calculus from '../src/app';
import { describe, expect, it } from '@jest/globals';

describe('GET /api/calculus', () => {
  it('responds with correct response when valid encoding is sent', () => {
    request(calculus)
      .get('/api/calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=')
      .set('Accept', 'application/json').expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toStrictEqual({ error: false, result: -132.89 });
      });
  }, 10000);

  it('responds with error message when invalid operation is used in expression', async () => {
    request(calculus)
      .get('/api/calculus?query=MiAqICgyMy8vKDMqMykpLSAyMyAqICgyKjMp')
      .set('Accept', 'application/json').expect('Content-Type', /json/)
      .expect(422)
      .then((res) => {
        expect(res.body).toStrictEqual({
          error: true, message: "Invalid operation/symbol/character found in expression",
        });
      });
  }, 10000);

  it('responds with error message if query is empty', async () => {
    request(calculus)
      .get('/api/calculus?query=')
      .set('Accept', 'application/json').expect('Content-Type', /json/)
      .expect(422)
      .then((res) => {
        expect(res.body).toHaveProperty('error', true);
      });
  }, 10000);

  it('responds with error message when invalid operation is used in expression', async () => {
    request(calculus)
      .get('/api/calculus?query=MiUgb2YgKDIzLygzKjMpKS0gMjMgKiAoMiozKQ==')
      .set('Accept', 'application/json').expect('Content-Type', /json/)
      .expect(422)
      .then((res) => {
        expect(res.body).toStrictEqual({
          error: true, message: 'Invalid operation/symbol/character found in expression',
        });
      });
  }, 10000);
});
