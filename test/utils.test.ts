import { describe, expect, it } from '@jest/globals';
import calculus from '../src/utils/calculus';

describe('utils', () => {
  it('checks that calculus returns correct value', (done) => {
    expect(calculus('2 * (23/(3*3))- 23 * (2*3)')).toBe(-132.888888889);
  });
});