import { IParsedQuery } from './typings';
import { generateConditions } from './utils/generateConditions';
import { generateSelect } from './utils/generateSelect';
import { collectionValidator, operatorValidator } from './utils/validators';

export const sqlBuilder = ({
  query,
  projection,
  collectionName,
}: IParsedQuery): string => {
  operatorValidator(query);
  collectionValidator(collectionName);

  const generatedSelects = generateSelect({
    query,
    projection,
    collectionName,
  });

  const sqlQuery = generateConditions(query, generatedSelects);

  console.log('Out: ' + sqlQuery + '\n');

  return sqlQuery;
};
