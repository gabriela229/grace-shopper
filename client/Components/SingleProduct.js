import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateLineItem} from '../store';
import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';

class SingleProduct extends Component {

  constructor() {
    super();
    this.state = {
      orderQuantity: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const orderQuantity = Number(evt.target.value);
    this.setState({orderQuantity});
  }

  render() {

    const {
      authUser,
      cart,
      product,
      productReviews,
      userHasReviewed,
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
                  product.quantityCounter && product.quantityCounter.map(_quantity => {
                    return (
                      <option key={_quantity} value={_quantity}>{_quantity}</option>
                    );
                  })
                }
            </select>
          </div>

          <button
            className="btn btn-sm btn-default"
            onClick={() => handleAddToCart(cart.id, product.id, orderQuantity)}>Add to Cart</button>

        </div>

        <div className="col-xs-12 col-sm-12 product-review-box center-block">
          {
            authUser.id && !userHasReviewed
            ? <ReviewForm authUser={authUser} singleProduct={product} hasReviewed={userHasReviewed} />
            : null
          }
          <h3>{product.title} Reviews</h3>
          <ReviewsList productReviews={productReviews} />
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({authUser, cart, products, reviews}, ownProps) => {
  const productId = Number(ownProps.match.params.productId);
  const product = products.find(_product => _product.id === productId);
  const productReviews = reviews.filter(_review => _review.product.id === productId);
  const userHasReviewed = productReviews.reduce((verified, _productReview) => {
    return _productReview.user.id === authUser.id;
  }, false);

  // if user has a review, show edit/delete button?

  return {
    authUser,
    cart,
    product,
    productReviews,
    userHasReviewed
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddToCart: (cartId, productId, orderQuantity) => {
      dispatch(updateLineItem(cartId, productId, orderQuantity, true));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
