import { InvalidOperationException } from "../app/exception/index";

const isValidExpr = (str: string): boolean => /^[0-9+\-*/()\s]*$/.test(str)

const calculate = (expr: string): number => {
  if ( isValidExpr(expr) ){
    try {
      return Number(Number(eval(expr) as number).toFixed(2));
    } catch (error) {
      throw new InvalidOperationException((error as any).message);
    }
  }
  throw new InvalidOperationException();
}

export default calculate;