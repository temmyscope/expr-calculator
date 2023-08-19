const isValidExpr = (str: string): boolean => /^[0-9+\-*/()\s]*$/.test(str)

const calculate = (query: string): number => {
  if ( isValidExpr(query) ){
    return Number(Number(eval(query) as number).toFixed(2));
  }
  throw "Invalid operation/symbol/character found in query";
}

export default calculate;