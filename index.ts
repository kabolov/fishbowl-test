import { mongoQueryParser } from './lib/utils/parser';
import { sqlBuilder } from './lib/sqlBuilder';

const testQueries = [
  "db.user.find({name: 'julio'});",
  'db.user.find({_id: 23113},{name: 1, age: 1});',
  "db.user.find({_id: 23113, name: 'alex'},{name: 1, age: 1});",
  'db.user.find({age: {$gte: 21}},{name: 1, _id: 1});',
  "db.user.find({age: {$gte: 21}, name: 'alex', _id: {$lt: 2}},{name: 1, _id: 1});",
  'db.user.find({age: {$in: [1,2,3,4,5,6]}});',
  'db.inventory.find( { $or: [ { quantity: 20 }, { price: 10 } ] } )',
  'db.inventory.find( { $and: [ { rating: 5 }, { price: 1 } ] } )',
];

const mongoQueryToSql = (rawString: string) => {
  const parsedQuery = mongoQueryParser(rawString);
  sqlBuilder(parsedQuery);
};

testQueries.forEach((query) => {
  console.log('--------------------------------\n\nIncoming: ' + query + '\n');
  mongoQueryToSql(query);
});
