import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Cart from './Cart';
import LoginSignupForm from './LoginSignupForm';
import Navbar from './Navbar';
import ProductsList from './ProductsList';
import SingleProduct from './SingleProduct';
import Admin from './Admin';
import PasswordReset from './PasswordReset';
import Checkout from './Checkout';

// store and getProducts thunk

import store, {fetchUser, fetchUsers, getProducts, getCategories, getReviews, loadCart, addToCart} from '../store';

class Main extends Component {

  // fetch categories, products, and reviews data
  componentDidMount() {
    this.props.fetchInitialData();

  }
  render() {
    return (
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/login" component={LoginSignupForm} />
          <Route exact path="/signup" component={LoginSignupForm} />
          <Route path="/products/:productId" component={SingleProduct} />
          <Route path="/checkout" component={Checkout} />
          {this.props.authUser.id ? <Route exact path="/reset" component={PasswordReset} /> : <Redirect to="/" />}
          {/* <Route path="/products/:productId" component={SingleProduct} />  */}
          <Route exact path="/admin" component={this.props.authUser.id ? Admin : LoginSignupForm} />
          {this.props.authUser.id ? <Route exact path="/reset" component={PasswordReset} /> : <Redirect to="/" />}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({authUser}) => {
  return {
    authUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialData: () => {
      dispatch(getProducts());
      dispatch(getCategories());
      dispatch(fetchUser());
      dispatch(fetchUsers());
      dispatch(loadCart());
      dispatch(getReviews());
    }
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
