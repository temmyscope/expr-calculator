export const isValidExpr = (str: string): boolean => /^[0-9+\-*/()\s]*$/.test(str);


export const decodeExpr = (expr: string): string => Buffer.from(expr, 'base64').toString('utf8');