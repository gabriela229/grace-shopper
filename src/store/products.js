import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

export function loadProducts(products){
  return {type: GET_PRODUCTS, products};
}
export function addProduct(product){
  return {type: GET_PRODUCT, product};
}
export function editProduct(product){
  return {type: UPDATE_PRODUCT, product};
}
export function removeProduct(id){
  return {type: DELETE_PRODUCT, id};
}

export function getProducts(){
  return function thunk(dispatch){
    //make sure to update this get request url so that it matches route
    return axios.get('/api/products')
      .then(res => res.data)
      .then(products => {
        dispatch(loadProducts(products))
      })
      //update error handling to do something with this error
      .catch(err => console.log(err));
  };
}

export function postProduct(product){
  return function thunk(dispatch){
    //make sure to update this get request url so that it matches route
    return axios.post('/api/products', product)
      .then(res => res.data)
      .then(newProduct => {
        dispatch(addProduct(newProduct));
      })
      //update error handling to do something with this error
      .catch(err => console.log(err));
  };
}

export function updateProduct(id){
  return function thunk(dispatch){
    //make sure to update this get request url so that it matches route
    return axios.put(`/api/products/${id}`)
      .then(res => res.data)
      .then(product => {
        dispatch(editProduct(product));
      })
      //update error handling to do something with this error
      .catch(err => console.log(err));
  };
}

export function deleteProduct(id){
  return function thunk(dispatch){
    //make sure to update this get request url so that it matches route
    return axios.delete(`/api/products/${id}`)
      .then(res => res.data)
      .then(() => {
        dispatch(removeProduct(id));
      })
      //update error handling to do something with this error
      .catch(err => console.log(err));
  };
}

export default function reducer(state = [], action){
  switch (action.type){
    case GET_PRODUCTS:
      return action.products;
    case GET_PRODUCT:
      return [...state, action.product];
    case UPDATE_PRODUCT:
      return state.map(product => {
        return product.id === action.product.id ? action.product : product;
      });
    case DELETE_PRODUCT:
      return state.filter(product => {
        return product.id !== action.id;
      });
    default:
      return state;
  }
}
