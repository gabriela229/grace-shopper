import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CategoriesList from './CategoriesList';
import ProductsList from './ProductsList';
import Cart from './Cart';
import LoginSignupForm from './LoginSignupForm';
import Navbar from './Navbar';

// store and getProducts thunk
import store, {fetchUser, getProducts, getCategories, loadCart, addToCart} from '../store';

export default class Main extends Component {

  // fetch products and categories data
  componentDidMount() {
    store.dispatch(getProducts());
    store.dispatch(getCategories());
    store.dispatch(fetchUser());
    store.dispatch(loadCart());
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
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
