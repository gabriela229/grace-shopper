import axios from 'axios';
import {setError} from './error';

const GET_ORDERS = 'GET_ORDERS';

export function getOrders(orders){
  return {type: GET_ORDERS, orders};
}

export function fetchOrders(){
  return (dispatch) => {
    return axios.get('/api/orders')
      .then(result => result.data)
      .then(orders => {
        dispatch(getOrders(orders));
      })
      .catch(err => dispatch(setError(err.response.data)));
  };
}

export function updateOrder(order){
  return (dispatch) => {
    return axios.put(`api/orders/${order.id}`, order)
    .then( () => {
      dispatch(fetchOrders());
    });
  };
}

export default function reducer(state = [], action){
  switch (action.type){
    case GET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
