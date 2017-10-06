import React from 'react';
import { connect } from 'react-redux';

const ProductsList = ({ products }) => {
  return (
    <div>
      <h1>
        Products list
      </h1>
    </div>
  );
}

const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

export default connect(mapStateToProps)(ProductsList);