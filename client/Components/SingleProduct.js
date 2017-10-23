import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateLineItem} from '../store';
import ReviewForm from './ReviewForm';
import ProductImageUpload from './ProductImageUpload';

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
      quantityCounter,
      handleAddToCart,
      authUser
    } = this.props;

    const { orderQuantity } = this.state;
    const { handleChange } = this;

    if (!product)
      return (<div />)

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
          {
            authUser.isAdmin ? (<ProductImageUpload productId={product.id}/>) : ('')
          }
          <button
            className="btn btn-sm btn-default"
            onClick={() => handleAddToCart(cart.id, product.id, orderQuantity)}>Add to Cart</button>

        </div>

        <div className="col-xs-12 col-sm-12 product-review-box center-block">
          {
            authUser.id
            ? <ReviewForm authUser={authUser} singleProduct={product} />
            : null
          }
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
            }
          </ul>

        </div>

      </div>
    );
  }
}

const mapStateToProps = ({authUser, cart, products, reviews}, ownProps) => {
  // console.log("SingleProduct: mapStateToProps - authUser = ", authUser);
  const productId = Number(ownProps.match.params.productId);
  const product = products.find(_product => _product.id === productId);
  const productReviews = reviews.filter(_review => _review.product.id === productId);
  // could be moved to model?
  const userReviewed = productReviews.filter(_productReview => _productReview.user.id === authUser.id);
  console.log('userReviewed = ', userReviewed);

  // is user authenticated AND has user NOT already reviewed this product ? show ReviewForm : don't show
  // show review form only if user has ordered this product?
  // if user has a review, show edit/delete button?

  const quantityCounter = [];
  if (product) {
    for (var i = 1; i < product.quantity; i++) {
      quantityCounter.push(i);
    }
  }

  return {
    cart,
    product,
    productReviews,
    quantityCounter,
    authUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddToCart: (cartId, productId, orderQuantity) => {
      dispatch(updateLineItem(cartId, productId, orderQuantity, true));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
