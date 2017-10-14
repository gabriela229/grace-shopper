import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createUser, deleteUser, setError} from '../store';

function Admin({users, removeUserOnClick, authUser}) {
  let counter = 0;
  return (
        <div>
          <h1>Users</h1>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map( user => {
                return (
                  <tr key={user.id}>
                    <th scope="row">{++counter}</th>
                    <td >{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                    <td><button value={user.id} onClick={removeUserOnClick} className="btn btn-danger">Delete</button></td>
                  </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
    );
}

const mapStateToProps = ({users, authUser}) => {
  return {
    users,
    authUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeUserOnClick: (event) => {
      const id = event.target.value;
      dispatch(deleteUser(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
