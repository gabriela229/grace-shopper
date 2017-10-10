import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const ProductsList = ({ products }) => {
  return (
    <div>
      <h1>Products list</h1>
      <div classNameName="row">
        {products.map(product => (
          <div className="col-md-3 col-sm-6">
                  <span className="thumbnail">
                      <img src="http://placehold.it/400x400" alt="..." />
                      <h4>{product.title}</h4>
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
                        <div className="col-md-6 col-sm-6">
                          <p className="price">Price:${product.price}</p>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <Link to="/go-to-cart" className="btn btn-success pull-right">BUY</Link>
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

const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

export default connect(mapStateToProps)(ProductsList);