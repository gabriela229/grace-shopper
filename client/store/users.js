import axios from 'axios';
import {setError} from './error';

const GET_USERS = 'GET_USERS';

export function getUsers(users){
  return {type: GET_USERS, users};
}


export function fetchUsers(){
  return (dispatch) => {
    return axios.get('/api/user')
      .then(result => result.data)
      .then(users => {
        dispatch(getUsers(users));
      })
      .catch(err => dispatch(setError(err.response.data)));
  };
}

export function deleteUser(id){
  return (dispatch) => {
    return axios.delete(`api/user/${id}`)
    .then(() => {
      dispatch(fetchUsers());
    });
  };
}

export function updateUser(user){
  return (dispatch) => {
    return axios.put(`api/user/${user.id}`, user)
    .then( () => {
      dispatch(fetchUsers());
    });
  };
}


export default function reducer(state = [], action){
  switch (action.type){
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
}
