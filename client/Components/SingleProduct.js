import React from 'react';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

const SingleProduct = (props) => {

  const { product } = props;

  return (
    <div className="row">

      <div className="col-xs-12 col-sm-12 product-image-box">
        <img src={ product.image } alt="default product image" className="img-responsive" />
      </div>

      <div className="col-xs-12 col-sm-12 product-info-box">
        <h1 className="product-title">{ product.title }</h1>
        <p className="product-description">{ product.description }</p>
        <p className="product-price"><strong>${ product.price }</strong></p>
      </div>

      <div className="col-xs-12 col-sm-12 product-button-zone center-block">
        <button
          className="btn btn-sm btn-default">Add to Cart</button>
      </div>

    </div>
  );
};

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ products }, ownProps) => {
  const productId = Number(ownProps.match.params.productId);
  const product = products.find(_product => _product.id === productId);
  return {
    product,
    productId
  };
};

export default connect(mapStateToProps)(SingleProduct);
