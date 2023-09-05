import { InvalidOperationException } from '../app/exception/index';

const isValidExpr = (str: string): boolean => /^[0-9+\-*/()\s]*$/.test(str);

/**
 * evaluate valid mathematical expression to 2 decimal places
 * @param {string} expr
 *
 * @throws InvalidOperationException
 * @returns
 */
const calculate = (expr: string): number => {
  if (isValidExpr(expr)) {
    try {
      let result = Function("return "+ expr)();
      return Number(Number(result as number).toFixed(2));
    } catch (error) {
      throw new InvalidOperationException();
    }
  }
  throw new InvalidOperationException();
};

export default calculate;
