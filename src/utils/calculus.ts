import { InvalidOperationException } from "../app/exception/index";

const isValidExpr = (str: string): boolean => /^[0-9+\-*/()\s]*$/.test(str)

const calculate = (expr: string): number => {
  if ( isValidExpr(expr) ){
    return Number(Number(eval(expr) as number).toFixed(2));
  }
  throw new InvalidOperationException();
}

export default calculate;