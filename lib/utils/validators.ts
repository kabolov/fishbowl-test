import { OPERATORS } from '../typings';

export const operatorValidator = (query: {
  [key: string]: object | string;
}): void => {
  for (const queryEntity in query) {
    if (
      queryEntity.split('')[0] === '$' &&
      !Object.keys(OPERATORS).includes(queryEntity as OPERATORS)
    ) {
      throw new Error(`Operator is not supported`);
    }
  }
};

export const collectionValidator = (collectionName: string): void => {
  if (!collectionName) {
    throw new Error('You must provide a collection');
  }
};
