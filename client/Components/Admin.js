import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createUser, deleteUser, setError, updateUser} from '../store';

function Admin({users, removeUserOnClick, authUser, handleUserUpdate}) {
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
                return user.id === authUser.id ?
                  (
                    <tr key={user.id}>
                      <th scope="row">{++counter}</th>
                      <td >{user.name}</td>
                      <td>{user.email}</td>
                      <td>Admin</td>
                    </tr>
                  )
                  :
                  (
                    <tr key={user.id}>
                      <th scope="row">{++counter}</th>
                      <td >{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <select  onChange={handleUserUpdate} name="isAdmin" className="form-control" data-id={user.id} value={user.isAdmin}>
                        <option value={true}>Admin</option>
                        <option value={false}>User</option>
                        </select>
                      </td>
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
    },
    handleUserUpdate: (event) => {
      const isAdmin = event.target.value;
      const id = event.target.dataset.id * 1;
      console.log(id);
      dispatch(updateUser({id, isAdmin}));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
