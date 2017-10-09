import React, { Component } from 'react';
import CategoriesList from './CategoriesList';
import ProductsList from './ProductsList';

// store and getProducts thunk
import store from '../store'; 
import {getProducts} from '../store/products';
import {getCategories} from '../store/categories';

export default class Main extends Component {
  // fetch products and categories data
  componentDidMount(){
    store.dispatch(getProducts());
    store.dispatch(getCategories());
  }

  render() {
    return (
      <div>
        <CategoriesList />
        <ProductsList />
      </div>
    );
  }
}