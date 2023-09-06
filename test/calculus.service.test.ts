import { describe, expect, it } from '@jest/globals';
import { InvalidOperationException } from '../src/app/exception/invalid';
import CalculusService from '../src/app/services/calculus.service';

describe('calculus service evaluate method ', () => {
  it('checks that calculus function returns correct value', (done) => {
    expect(CalculusService.evaluate('2 * (23/(3*3))- 23 * (2*3)')).toBe(-132.89);

    done();
  });

  it('checks that an error is thrown if invalid operation is passed', (done) => {
    const t = () => CalculusService.evaluate('2 * (23//(3*3))- 23 * (2*3)');

    expect(t).toThrow();

    done();
  });

  it('checks that an error is thrown if invalid operation is passed', (done) => {
    const t = () => CalculusService.evaluate('2% of (23/(3*3))- 23 * (2*3)');

    expect(t).toThrow(InvalidOperationException);
    expect(t).toThrow('Invalid operation/symbol/character found in expression');

    done();
  });
});