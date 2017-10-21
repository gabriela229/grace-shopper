import axios from 'axios';
const WRITE_FIRST_NAME = 'WRITE_FIRST_NAME'; 
const WRITE_LAST_NAME = 'WRITE_LAST_NAME'; 
const WRITE_ADDRESS = 'WRITE_ADDRESS';
const WRITE_CITY = 'WRITE_CITY';
const WRITE_STATE = 'WRITE_STATE';
const WRITE_EMAIL = 'WRITE_EMAIL';
const WRITE_POSTAL_CDOE = 'WRITE_POSTAL_CDOE';
const SUBMIT = "SUBMIT";

export const getFirstName = firstName =>{
    return {type: WRITE_FIRST_NAME, firstName}
}

export const getLastName = lastName =>{
    return {type: WRITE_LAST_NAME, lastName}
}

export const getAddress = address =>{
    return {type: WRITE_ADDRESS, address}
}

export const getCity  =  city =>{
    return {type: WRITE_CITY, city}
}

export const getState  =  state =>{
    return {type: WRITE_STATE, state}
}

export const getEmail  =  email =>{
    return {type: WRITE_EMAIL, email}
}

export const getPostalCode  =  postalCode =>{
    return {type: WRITE_POSTAL_CDOE, postalCode}
}

export const submit = customerInfo =>{
    return {type: SUBMIT, customerInfo}
}

// a thunk when submit
export function submitThunk(customerInfo, lineItems){
  return function thunk(dispatch){
    // add this customer and lineItmes to the db
    return axios.post('/api/orders', {customerInfo, lineItems})
      .then( res => res.data)
      .then( result => {                   // don't know what it will be yet
         console.log("Result", result);
         dispatch(submit());                // emptify the controlled form
      })
      .catch(err => console.log(err));
  };
}

const initialState = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    email: '',
    postalCode: ''
}
export default function reducer(state = initialState, action){
    switch(action.type){
        case WRITE_FIRST_NAME:
            return Object.assign({}, state, {firstName: action.firstName})
        case WRITE_LAST_NAME:
            return Object.assign({}, state, {lastName: action.lastName})
        case WRITE_ADDRESS:
            return Object.assign({}, state, {address: action.address})
        case WRITE_CITY:
            return Object.assign({}, state, {city: action.city})
        case WRITE_STATE:
            return Object.assign({}, state, {state: action.state})
        case WRITE_EMAIL:
            return Object.assign({}, state, {email: action.email})
        case WRITE_POSTAL_CDOE:
            return Object.assign({}, state, {postalCode: action.postalCode})
        case SUBMIT:
            return Object.assign({}, initialState);
        default: 
            return state;
    }
}
