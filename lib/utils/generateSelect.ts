import { IParsedQuery } from '../typings';

export const generateSelect = ({
  query,
  projection,
  collectionName,
}: IParsedQuery): string => {
  let sqlQuery = 'SELECT';

  if (projection) {
    const projectionNames = Object.keys(projection);
    const projectionLength = projectionNames.length;

    for (let i = 0; i < projectionLength; i++) {
      sqlQuery += projection[projectionNames[i]]
        ? ' ' +
          (projectionLength > 0 && i !== projectionLength - 1
            ? projectionNames[i] + ','
            : projectionNames[i])
        : '';
    }
  } else {
    sqlQuery += ' *';
  }

  sqlQuery += ' FROM ' + collectionName;

  return sqlQuery;
};
