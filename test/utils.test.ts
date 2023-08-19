import { describe, expect, it } from '@jest/globals';
import calculus from '../src/utils/calculus';

describe('utils', () => {
  it('checks that calculus function returns correct value', (done) => {
    expect(calculus('2 * (23/(3*3))- 23 * (2*3)')).toBe(-132.89);

    done();
  });

  it('checks that an error is thrown if invalid operation is passed', (done) => {
    expect(calculus('2% of (23/(3*3))- 23 * (2*3)')).toThrowError();

    done();
  });
  
});