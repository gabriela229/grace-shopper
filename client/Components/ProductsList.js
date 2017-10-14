import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {searchProducts, getProducts} from '../store/products';

const ProductsList = (props) => {
  const {products, handleChange, handleSubmit} = props;
  return (
    <div>
      <h1>Products list</h1>
         <form onSubmit = {handleSubmit} className='form-group' style={{marginTop: '20px'}}>
              <input
                name = "searchInput"
                onChange = {handleChange}
                className='form-control'
                placeholder="Search product"
              />
        </form>
      <div className="row row-eq-height">
        {products.map(product => (
          <div key={product.id} className="col-md-3 col-sm-6">
            <span className="thumbnail">
              <img src="http://placehold.it/800x800" alt="..." />
              <p>{product.title}</p>
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
                <div className="col-md-6 col-sm-4">
                  <p className="price">Price:${product.price}</p>
                </div>
                <div className="col-md-6 col-sm-4">
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

const mapStateToProps = ({ products}) => {
  return {
    products,
  };
};

const mapDispatchToProps = function(dispatch){
  return {
    handleChange : function(evt){
      const input = evt.target.value;
      if(input){                 
        dispatch(searchProducts(input))
      }else{
         dispatch(getProducts()); 
      }
    },
    handleSubmit : function(evt){
      evt.preventDefault();
      const input = evt.target.searchInput.value;
      if(input){
        dispatch(searchProducts(input))
      }else{
         dispatch(getProducts());
      }
      // evt.target.searchInput.value = '';
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);