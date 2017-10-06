import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import categories from './categories';
import products from './products';

const rootReducer = combineReducers({
  products,
  categories
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));

export * from './products';
export * from './categories';
