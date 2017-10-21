import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// components
import AdminUsers from './AdminUsers';
import AdminOrders from './AdminOrders';
import PasswordReset from './PasswordReset';


export default function AdminRoutes(){
    return (
      <Switch>
          <Route exact path="/admin/users" component={AdminUsers} />
          <Route exact path="/admin/orders" component={AdminOrders} />
          <Route exact path="/reset" component={PasswordReset} />
          <Redirect to="/" />
      </Switch>
    );
}

