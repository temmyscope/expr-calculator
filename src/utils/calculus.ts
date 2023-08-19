const isNumeric = (str: string): boolean => /^\d+\.?\d*$/.test(str);

const isValidOperator = (str: string): boolean => ['+', '-', '*', '/', '(', ')'].includes(str)

const isValidExpr = (str: string): boolean => /^[0-9+\-*/()\s]*$/.test(str)

const calculate = (query: string): Number => {
  if ( isValidExpr(query) ){
    return Number(Number(eval(query) as number).toFixed(2));
  }
  throw "Invalid operation found in query";
}

calculate('2 * (23/(3*3)) - 23 / (2*3)');

export default calculate;