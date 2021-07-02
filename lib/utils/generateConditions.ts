import { OPERATORS } from '../typings';

export const generateConditions = (
  query: { [key: string]: { [objKey: string]: number[] } },
  generatedSelects: string
): string => {
  const queryKeys = Object.keys(query);
  const queryLength = queryKeys.length;

  for (let i = 0; i < queryLength; i++) {
    if (
      queryKeys[i].split('')[0] !== '$' &&
      typeof query[queryKeys[i]] !== 'object'
    ) {
      generatedSelects += ` ${i === 0 ? 'WHERE' : 'AND'} ${queryKeys[i]} = ${
        typeof query[queryKeys[i]] === 'string'
          ? `'${query[queryKeys[i]]}'`
          : query[queryKeys[i]]
      }`;
    } else if (
      queryKeys[i].split('')[0] !== '$' &&
      typeof query[queryKeys[i]] === 'object' &&
      query[queryKeys[i]] !== null
    ) {
      for (const operator in query[queryKeys[i]] as unknown as object) {
        generatedSelects += ` ${i === 0 ? 'WHERE' : 'AND'} ${queryKeys[i]} ${
          OPERATORS[operator as keyof typeof OPERATORS]
        } ${
          operator === '$in'
            ? '(' + query[queryKeys[i]][operator] + ')'
            : query[queryKeys[i]][operator]
        }`;
      }
    } else if (queryKeys[i] === '$or' || queryKeys[i] === '$and') {
      const conditions = (query[queryKeys[i]] as unknown as Array<any>).map(
        (condition) => {
          for (const item in condition) {
            return `${item} = ${condition[item]}`;
          }
        }
      );
      generatedSelects +=
        ' ' +
        conditions.join(
          ` ${OPERATORS[queryKeys[i] as keyof typeof OPERATORS]} `
        );
    }
  }
  return (generatedSelects += ';');
};
