import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store';
import { searchProducts, getProducts } from '../store/products';

const ProductsList = (props) => {
  const { products, cart, handleChange, handleSubmit, handleAddToCart } = props;
  return (
    <div>
      <h1>Products list</h1>
      <form onSubmit={handleSubmit} className='form-group' style={{ marginTop: '20px' }}>
        <input
          name="searchInput"
          onChange={handleChange}
          className='form-control'
          placeholder="Search product"
        />
      </form>
      <div className="row row-eq-height">
        {products.map(product => (
          <div key={product.id} className="col-xs-4">
            <span className="thumbnail">
              <img src={product.image} alt="..." />
              <Link to={`/products/${product.id}`}> <p>{product.title}</p> </Link>
              <div className="ratings">
                <span className="glyphicon glyphicon-star"></span>
                <span className="glyphicon glyphicon-star"></span>
                <span className="glyphicon glyphicon-star"></span>
                <span className="glyphicon glyphicon-star"></span>
                <span className="glyphicon glyphicon-star"></span>
              </div>
              <p>{product.description}</p>
              <hr className="line" />
              <div className="row">
                <div className="col-xs-6">
                  <p className="price">Price:${product.price}</p>
                </div>
                <div className="col-xs-6">
                  <a onClick={() => handleAddToCart(product.id, cart.id)} className="btn btn-success pull-right">BUY</a>
                </div>

              </div>
            </span>
          </div>
        ))
        }
      </div>

    </div>
  );
}

const mapStateToProps = ({ products, cart }) => {
  return {
    products,
    cart
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    handleAddToCart: (productId, cartId) => {
      dispatch(addToCart(productId, cartId));
    },
    handleChange: function (evt) {
      const input = evt.target.value;
      if (input) {
        dispatch(searchProducts(input))
      } else {
        dispatch(getProducts());
      }
    },
    handleSubmit: function (evt) {
      evt.preventDefault();
      const input = evt.target.searchInput.value;
      if (input) {
        dispatch(searchProducts(input))
      } else {
        dispatch(getProducts());
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);