import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import categories from './categories';
import products from './products';
import user from './user';
import error from './error';

const rootReducer = combineReducers({
  products,
  categories,
  user,
  error
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

export * from './products';
export * from './categories';
export * from './user';
export * from './error';
