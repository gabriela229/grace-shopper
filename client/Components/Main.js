import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Cart from './Cart';
import LoginSignupForm from './LoginSignupForm';
import Navbar from './Navbar';
import ProductsList from './ProductsList';
import SingleProduct from './SingleProduct';
import AdminRoutes from './AdminRoutes';

// store and getProducts thunk
import PasswordReset from './PasswordReset';
import Checkout from './Checkout';
import { fetchUser, fetchUsers, getProducts, getCategories, getReviews, loadCart, fetchOrders } from '../store';

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


          <Route path="/products/:productId" component={SingleProduct} />
          <Route exact path="/checkout" component={Checkout} />
          {this.props.authUser.id ?
            <AdminRoutes /> : null
          }
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  return {
    authUser
  };
};

const mapDispatchToProps = (dispatch) => {
  // dispatch(loginUser({ email: 'doughnut@gmail.com', password: '123'}, null, {lineItems: []}))
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
