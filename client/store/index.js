import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger

import cart from './cart';
import categories from './categories';
import error from './error';
import products from './products';
import authUser from './auth';
import users from './users';
import reviews from './reviews';
import {loadState} from './localStorage';

const persistedState = loadState();

const rootReducer = combineReducers({
  authUser,
  cart,
  categories,
  error,
  products,
  reviews,
  users
});

export default createStore(rootReducer, persistedState, applyMiddleware(thunkMiddleware, logger));


export * from './products';
export * from './categories';
export * from './auth';
export * from './error';
export * from './users';
export * from './cart';
export * from './reviews';
export * from './localStorage';
