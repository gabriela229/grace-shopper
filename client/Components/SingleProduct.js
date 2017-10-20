import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../store';

class SingleProduct extends Component {

  constructor() {
    super();
    this.state = {
      orderQuantity: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const orderQuantity = evt.target.value;
    this.setState({orderQuantity});
  }

  render() {

    const {
      cart,
      product,
      productReviews,
      quantityCounter,
      handleAddToCart
    } = this.props;

    const {orderQuantity} = this.state;
    const {handleChange} = this;

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

          <div className="form-group">
            <select
              className="form-control"
              name="orderQuantity"
              onChange={handleChange}
              value={orderQuantity}>
              <option value="">-- How many? --</option>
              {
                quantityCounter && quantityCounter.map(_quantity => {
                  return (
                    <option key={_quantity} value={_quantity}>{_quantity}</option>
                  );
                })
              }
            </select>
          </div>

          <button
            className="btn btn-sm btn-default"
            onClick={() => handleAddToCart(product.id, cart.id, orderQuantity)}>Add to Cart</button>

        </div>

        <div className="col-xs-12 col-sm-12 product-review-box center-block">
          <h3>{product.title} Reviews</h3>
          <ul className="list-group">
            {
              productReviews.length > 0
              ? productReviews.map(review => {
                return (
                  <li
                    key={review.id}
                    className="list-group-item"><em>"{review.content}"</em> - <strong>{review.user.name}</strong> {review.isVerified ? <span className="badge"><small>Verified Review!</small></span> : null}</li>
                );
              })
              : <li className="list-group-item">No reviews yet!</li>
            /* pagination? */}
          </ul>

        </div>

      </div>
    );
  }
}

const mapStateToProps = ({products, cart, reviews}, ownProps) => {
  const productId = Number(ownProps.match.params.productId);
  const product = products.find(_product => _product.id === productId);
  const productReviews = reviews.filter(_review => _review.product.id === productId);

  const quantityCounter = [];
  for (var i = 1; i < product.quantity; i++) {
    quantityCounter.push(i);
  }

  return {
    cart,
    product,
    productReviews,
    quantityCounter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddToCart: (productId, cartId, orderQuantity) => {
        dispatch(addToCart(productId, cartId, orderQuantity));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
