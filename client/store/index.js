import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger

import cart from './cart';
import categories from './categories';
import error from './error';
import products from './products';
import reviews from './reviews';
import user from './user';

const rootReducer = combineReducers({
  cart,
  categories,
  error,
  products,
  reviews,
  user,
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

export * from './cart';
export * from './categories';
export * from './error';
export * from './products';
export * from './reviews';
export * from './user';
