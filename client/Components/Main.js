import React, { Component } from 'react';
import CategoriesList from './CategoriesList';
import ProductsList from './ProductsList';

export default class Main extends Component {
render() {
    return (
      <div>
        <CategoriesList />
        <ProductsList />
      </div>
    );
  }
}