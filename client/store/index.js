import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import categories from './categories';
import products from './products';
import user from './user';

const rootReducer = combineReducers({
  products,
  categories,
  user
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

export * from './products';
export * from './categories';
export * from './user';
