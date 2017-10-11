import axios from 'axios';
import {setError} from './error';

const SET_USER = 'SET_USER';

export function setUser(user){
  return {type: SET_USER, user};
}


export function loginUser(credentials, history){
  return function thunk(dispatch){
    return axios.post('/api/auth', credentials)
      .then(res => res.data)
      .then(user => {
        dispatch(setUser(user));
        history.push('/');
      })
      //update error handling to do something with this error
      .catch(err => dispatch(setError(err.response.data)));
  };
}

export function logoutUser(){
  return function thunk(dispatch){
    return axios.delete('/api/auth')
      .then(() => {
        dispatch(setUser({}));
      })
      //update error handling to do something with this error
      .catch(err => dispatch(setError(err.response.data)));
  };
}

export function createUser(credentials, history){
  return function thunk(dispatch){
    return axios.post('/api/user', credentials)
      .then(() => {
        dispatch(loginUser(credentials, history));
      })
      //update error handling to do something with this error
      .catch(err => dispatch(setError(err.response.data)));
  };
}

export function fetchUser(){
  return (dispatch) => {
    return axios.get('/api/auth')
      .then(result => result.data)
      .then(user => {
        dispatch(setUser(user));
      })
      .catch(err => dispatch(setError(err.response.data)));
  };
}


export default function reducer(state = {}, action){
  switch (action.type){
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
