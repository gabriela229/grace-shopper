import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {deleteUser, updateUser} from '../store';

function AdminOrders({orders, users, authUser, handleUserUpdate}) {
  console.log(orders);
    return (
        <div className="table-responsive">
          <h1>Orders</h1>
          <table className="table table-hover" >
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Order Address</th>
                <th>Products Purchased</th>
                <th>Order Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map( order => {
                return (
                    <tr key={order.id}>
                      <th scope="row">{order.id}</th>
                      <td>{order.user.name}</td>
                      <td>{order.user.email}</td>
                      <td style={{wordWrap: 'break-all'}}>{order.address}</td>
                      <td>
                      <table className="table table-hover">
                        <thead>
                        <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Quantity</th>
                      </tr>
                        </thead>
                        <tbody>

                            {order.lineItems.map(lineItem => {
                            return (
                              <tr key={lineItem.id}>
                              <td>{lineItem.product.id}</td>
                              <td>
                                <NavLink  to={`/products/${lineItem.product.id}`}>{lineItem.product.title}</NavLink>
                              </td>
                              <td>{lineItem.quantity}</td>
                              </tr>
                            );
                          })}

                        </tbody>
                      </table>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
    );
}

const mapStateToProps = ({orders, users, authUser}) => {
  return {
    orders,
    authUser,
    users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders);
