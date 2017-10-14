import React from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../store';

const SingleProduct = (props) => {

  const {
    cart,
    product,
    // quantityCounter,
    // handleChange,
    handleAddToCart
  } = props;

  return (
    <div className="row">

      <div className="col-xs-12 col-sm-12 product-image-box">
        <img
          src={product.image}
          alt="default product image"
          className="img-responsive" />
      </div>

      <div className="col-xs-12 col-sm-12 product-info-box">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-quantity">{product.quantity ? 'In Stock!' : 'Sold Out!'}</p>
        <p className="product-price"><strong>${product.price}</strong></p>
      </div>

      <div className="col-xs-12 col-sm-12 product-buy-box center-block">

        {/*<div className="form-group">
          <label htmlFor="quantity">Qty:</label>
          <select
            className="form-control"
            name="orderQuantity"
            onChange={handleChange}
            value={product.quantity}>
            <option value="">-- How many? --</option>
            {
              quantityCounter && quantityCounter.map(_quantity => {
                return (
                  <option key={_quantity} value={_quantity}>{_quantity}</option>
                );
              })
            }
          </select>
        </div>*/}

        <button
          className="btn btn-sm btn-default"
          onClick={() => handleAddToCart(product.id, cart.id)}>Add to Cart</button>

      </div>

    </div>
  );
};

const mapStateToProps = ({products, cart}, ownProps) => {
  const productId = Number(ownProps.match.params.productId);
  const product = products.find(_product => _product.id === productId);

  // const quantityCounter = [];
  // for (var i = 1; i < product.quantity; i++) {
  //   quantityCounter.push(i);
  // }

  return {
    cart,
    product,
    // quantityCounter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // handleChange: function(evt) {
    //   console.log("handleChange: evt.target.value = ", evt.target.value);
    // },
    handleAddToCart: (productId, cartId) => {
      console.log("handleAddToCart: productId = ", productId);
      console.log("handleAddToCart: cartId = ", cartId);
      dispatch(addToCart(productId, cartId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
