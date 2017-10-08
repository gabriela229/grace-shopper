import React from 'react';
import { connect } from 'react-redux';

/* -----------------    COMPONENT     ------------------ */

const SingleProduct = (props) => {

  const { product } = props;

  return (
    <div className="row">

      <div className="col-xs-12 col-sm-6 product-info">
        <h1 className="product-title">{ product.title }</h1>
        <p className="product-description">{ product.description }</p>
        <p className="product-price">{ product.price }</p>
      </div>

      <div className="col-xs-12 col-sm-6 product-image">
      </div>

    </div>
  );
};

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ products }, ownProps) => {
  const productId = Number(ownProps.match.params.id);
  const product = products.find(_product => _product.id === productId);
  return {
    product,
  };
};

export default connect(mapStateToProps)(SingleProduct);
