import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Cart from './Cart';
import LoginSignupForm from './LoginSignupForm';
import Navbar from './Navbar';
import ProductsList from './ProductsList';
import SingleProduct from './SingleProduct';
// import AdminUsers from './AdminUsers';
import AdminRoutes from './AdminRoutes';
// import PasswordReset from './PasswordReset';

// store and getProducts thunk

import {fetchUser, fetchUsers, getProducts, getCategories, getReviews, loadCart, fetchOrders} from '../store';

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
          <Route path="/products/:productId" component={SingleProduct} />
          <Route exact path="/" component={ProductsList} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/login" component={LoginSignupForm} />
          <Route exact path="/signup" component={LoginSignupForm} />
          {this.props.authUser.id ?
            <AdminRoutes /> : null
          }
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
      dispatch(fetchOrders());
    }
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
