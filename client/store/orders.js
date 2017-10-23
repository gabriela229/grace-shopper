import axios from 'axios';
import {setError} from './error';

const GET_ORDERS = 'GET_ORDERS';
// const SEARCH_ORDERS = 'SEARCH_ORDERS';

export function getOrders(orders){
  return {type: GET_ORDERS, orders};
}

// export function searchOrders(toSearch){
//   return { type: SEARCH_ORDERS, toSearch};
// }

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


export default function reducer(state = [], action){
  switch (action.type){
    case GET_ORDERS:
      return action.orders;
    // case SEARCH_ORDERS:
    //   return state.filter(order => {
    //     const {user, status} = order;
    //     return user.name.toLowerCase().match(action.toSearch.toLowerCase()) || status.toLowerCase().match(action.toSearch.toLowerCase()) || user.email.toLowerCase().match(action.toSearch.toLowerCase());
      // });
    default:
      return state;
  }
}
