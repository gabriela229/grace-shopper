import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import LoginSignupForm from './LoginSignupForm';
import CategoriesList from './CategoriesList';
import ProductsList from './ProductsList';
import Navbar from './Navbar';
import {fetchUser} from '../store';


class Main extends Component {
  componentDidMount(){
    this.props.fetchInitialData();
  }
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Route exact path="/login" component={LoginSignupForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialData: () => {
      dispatch(fetchUser());
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Main));
