export enum OPERATORS {
  '$or' = 'OR',
  '$and' = 'AND',
  '$lt' = '<',
  '$lte' = '<=',
  '$gt' = '>=',
  '$gte' = '>=',
  '$ne' = '!=',
  '$in' = 'IN',
}
// export enum OPERATORS {
//   OR = '$or',
//   AND = '$and',
//   LESS_THAN = '$lt',
//   LESS_THAN_OR_EQUAL = '$lte',
//   GREATER_THAN = '$gt',
//   GREATER_THAN_OR_EQUAL = '$gte',
//   NOT_EQUAL = '$ne',
//   IN = '$in',
// }

export interface IParsedQuery {
  collectionName: string;
  query: { [key: string]: { [objKey: string]: any[] } };
  // query: Record<OPERATORS | string, string | undefined>;
  projection: Record<string, any | string | undefined>;
}
