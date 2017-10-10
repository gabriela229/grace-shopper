import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../store';


function Navbar(props){
  const {user, endUserSession} = props;
  return (
    <div className="navbar navbar-default">
      <div className="container-fluid">
        <ul className="nav navbar-nav navbar-right">
            <li>
              <NavLink to="/" activeClassName="active">
              Home
              </NavLink>
              </li>
              <li>
                <NavLink to="/cart" activeClassName="active">
                Cart
                </NavLink>
              </li>
              <li>
              <NavLink className={!user.id ? 'show' : 'hidden'}  to="/login" activeClassName="active">
              Log in
              </NavLink>
              </li>
              <li>
              <NavLink className={!user.id ? 'show' : 'hidden'}  to="/signup" activeClassName="active">
              Sign up
              </NavLink>
              </li>
              <li>
                <a><button className={`btn btn-primary ${user.id ? 'show' : 'hidden'}`} onClick={endUserSession}>
                logout
                </button></a>
              </li>
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = ({user}) => {
  return {
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    endUserSession: () => {
      dispatch(logoutUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
