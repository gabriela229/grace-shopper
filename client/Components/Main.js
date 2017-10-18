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

// store and getProducts thunk
import {fetchUser, fetchUsers, getProducts, getCategories, loadCart, addToCart} from '../store';

class Main extends Component {

  // fetch products and categories data
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
          {this.props.authUser.id ? <Route exact path="/reset" component={PasswordReset} /> : <Redirect to="/" />}
          <Route path="/products/:productId" component={SingleProduct} />
          <Route exact path="/admin" component={this.props.authUser.id ? Admin : LoginSignupForm} />
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
    }
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
