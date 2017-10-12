import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// components
import Cart from './Cart';
import CategoriesList from './CategoriesList';
import LoginSignupForm from './LoginSignupForm';
import Navbar from './Navbar';
import ProductsList from './ProductsList';
import SingleProduct from './SingleProduct';

// store and getProducts thunk
import store, {fetchUser, getProducts, getCategories} from '../store';

export default class Main extends Component {

  // fetch products and categories data
  componentDidMount() {
    store.dispatch(getProducts());
    store.dispatch(getCategories());
    store.dispatch(fetchUser());
  }
  render() {
    return (
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={LoginSignupForm} />
          <Route path="/signup" component={LoginSignupForm} />
          <Route path="/products/:productId" component={SingleProduct} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
