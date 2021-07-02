import { IParsedQuery, OPERATORS } from '../typings';

const queryProjectionRegExp = /\(([^)]+)\)/;

export const mongoQueryParser = (rawString: string): IParsedQuery => {
  const [dbName, collectionName] = rawString.split('.');

  const [_, queryProjectionString] = queryProjectionRegExp.exec(
    rawString
  ) as RegExpExecArray;

  let [queryString, projectionString] = queryProjectionString.split('},{');

  if (projectionString) queryString += '}';
  if (queryString && projectionString)
    projectionString = '{' + projectionString;

  const query = eval('(' + queryString + ')');
  const projection = eval('(' + projectionString + ')');

  return {
    collectionName,
    query,
    projection,
  };
};
