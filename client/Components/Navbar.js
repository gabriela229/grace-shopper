import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories, getProducts, logoutUser } from '../store';


function Navbar(props) {
  const { categories, products, authUser, cart, endUserSession } = props;
  return (
    <div className="navbar navbar-default navbar-fixed-top">
      <div className="container">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="/">__ Donuts!</a>
        </div>

        <div className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="nav navbar-nav">

            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                exact to="/categories">All Categories</NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                exact to="/products">All Products</NavLink>
            </li>

            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">Categories <span className="caret" /></a>
              <ul className="dropdown-menu">
                {
                  categories && categories.map(category => {
                    return (
                      <li key={category.id}>
                        <NavLink
                          activeClassName="active"
                          className="nav-link"
                          to={`/categories/${category.id}`}>{category.title}</NavLink>
                      </li>
                    );
                  })
                }
              </ul>
            </li>

            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Products <span className="caret" /></a>
              <ul className="dropdown-menu">
                {
                  products && products.map(product => {
                    return (
                      <li key={product.id}>
                        <NavLink
                          activeClassName="active"
                          className="nav-link"
                          to={`/products/${product.id}`}>{product.title}</NavLink>
                      </li>
                    );
                  })
                }
              </ul>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <NavLink to="/cart" activeClassName="active">
                Cart {cart.lineItems ? `(${cart.lineItems.reduce((total, item) => {return total + item.quantity}, 0)})` : ''}
              </NavLink>
            </li>
            <li>
              <NavLink className={!authUser.id ? 'show' : 'hidden'}  to="/login" activeClassName="active">
              Log in
              </NavLink>
            </li>
            <li>
              <NavLink className={!authUser.id ? 'show' : 'hidden'}  to="/signup" activeClassName="active">
              Sign up
              </NavLink>
            </li>
            <li>
              <NavLink className={authUser.id && authUser.isAdmin ? 'show' : 'hidden'}  to="/admin" activeClassName="active">
              Admin
              </NavLink>
            </li>
            <li>
              <a><button className={`btn btn-primary ${authUser.id ? 'show' : 'hidden'}`} onClick={endUserSession}>
              logout
              </button></a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ categories, products, cart, authUser }) => {
  return {
    categories,
    products,
    cart,
    authUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    endUserSession: () => {
      dispatch(logoutUser());
    },
    getCategories: () => {
      dispatch(getCategories());
    },
    getProducts: () => {
      dispatch(getProducts());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
