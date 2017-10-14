import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import categories from './categories';
import products from './products';
import authUser from './auth';
import users from './users';
import error from './error';

const rootReducer = combineReducers({
  products,
  categories,
  authUser,
  users,
  error
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

export * from './products';
export * from './categories';
export * from './auth';
export * from './error';
export * from './users';

