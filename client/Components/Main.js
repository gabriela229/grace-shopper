import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginSignupForm from './LoginSignupForm';
import ProductsList from './ProductsList';
import Navbar from './Navbar';
import {fetchUser} from '../store';


export default class Main extends Component {
  componentDidMount(){
    fetchUser();
  }
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Route exact path="/login" component={LoginSignupForm} />
          <Route exact path="/signup" component={LoginSignupForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
