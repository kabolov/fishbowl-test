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

export interface IParsedQuery {
  collectionName: string;
  query: { [key: string]: { [objKey: string]: any[] } };
  projection: Record<string, any | string | undefined>;
}
