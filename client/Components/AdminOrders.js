import React, {Component} from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {updateOrder} from '../store';
import ReactModal from 'react-modal';

const customStyles = {
  overlay: {
    background: 'rgba(0, 0, 0, .7)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class AdminOrders extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      orderOnState: {lineItems: []},
      filteredOrders: props.orders
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.search = this.search.bind(this);
  }
  showModal(orderOnState){
    this.setState({isOpen: true, orderOnState});
  }
  closeModal(){
    this.setState({isOpen: false, orderOnState: {lineItems: []}});
  }

  search(event){
    const searchTerm = event.target.value;
    const filteredOrders = this.props.orders.filter(order => {
      const {user, status} = order;
      return user.name.toLowerCase().match(searchTerm.toLowerCase()) || status.toLowerCase().match(searchTerm.toLowerCase()) || user.email.toLowerCase().match(searchTerm.toLowerCase());
    });
    this.setState({filteredOrders});
  }
  render(){
    const {closeModal, showModal, search} = this;
    const {isOpen, orderOnState, filteredOrders} = this.state;
    const {orders, handleChange} = this.props;
    return (
        <div className="table-responsive">
          <h1>Orders</h1>
          <div className="row">
            <div className="col-md-3 col-md-offset-9">
            <input
            name="searchInput"
            onChange={search}
            className="form-control pull-right"
            placeholder="Search Orders" />
            </div>
          </div>
          <br></br>
          <table className="table table-hover" >
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Order Address</th>
                <th>Products Purchased</th>
                <th>Order Total</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map( order => {
                let visibility = '';
                if (!filteredOrders.find((ord) => {
                  return ord.id === order.id;
                })){
                  visibility = 'hide';
                }
                return (
                    <tr key={order.id} className={visibility} >
                      <td>{order.id}</td>
                      <td>{order.user.name}</td>
                      <td>{order.user.email}</td>
                      <td>{order.address}</td>
                      <td onClick={() => {
                        showModal(order);
                      }}>
                          <a>Order Details</a>
                      </td>
                      <td><strong>${order.lineItems.reduce((total, lineItem) => { return total += lineItem.product.price * lineItem.quantity;}, 0).toFixed(2)}</strong></td>
                      <td>
                        <select onChange={handleChange} name="orderStatus" className="form-control" data-id={order.id} value={order.status}>
                          <option value="Created">Created</option>
                          <option value="Processing">Processing</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
          <ReactModal isOpen={isOpen} style={customStyles}>
          <div className="">
          <button className="btn btn-danger pull-right" onClick={closeModal}><span className="glyphicon glyphicon-remove" /></button>
          <table className="table table-hover">
            <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Price per Item</th>
                  <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {orderOnState.lineItems.map(lineItem => {
                return (
                  <tr key={lineItem.id}>
                  <td>{lineItem.product.id}</td>
                  <td>
                    <NavLink  to={`/products/${lineItem.product.id}`}>{lineItem.product.title}</NavLink>
                  </td>
                  <td>{lineItem.quantity}</td>
                  <td>${lineItem.product.price}</td>
                  <td>${(lineItem.quantity * lineItem.product.price).toFixed(2)}</td>
                  </tr>
                );
              })}
              <tr>
                <td><strong>Order Total:</strong></td>
                <td />
                <td />
                <td />
                <td><strong>${orderOnState.lineItems.reduce((total, lineItem) => { return total += lineItem.product.price * lineItem.quantity;}, 0).toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
          </div>
        </ReactModal>
        </div>
    );
  }
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
    handleChange: function (event) {
      const status = event.target.value;
      const id = event.target.dataset.id * 1;
      dispatch(updateOrder({id, status}));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders);
