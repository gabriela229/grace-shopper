import React from 'react';
import { connect } from 'react-redux';
import { removeLineItem, updateLineItem } from '../store';

const Cart = ({ cart, products, handleQuantityUpdate, removeLineItemOnClick }) => {
    if (!cart.lineItems.length) {
        return(
            <div>
            The cart is empty
            </div>
        )
    }
  return (
    <div className="container">
    <div className="row">
        <div className="col-sm-12 col-md-10 col-md-offset-1">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Total</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
            {
              cart.lineItems.map(lineItem => {
              return (
                <tr key={lineItem.product.id}>
                <td className="col-sm-8 col-md-6">
                <div className="media">
                    <a className="thumbnail pull-left" href="#"> <img className="media-object" src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png" style={{width: "72px", height: "72px"}} /> </a>
                    <div className="media-body">
                        <h4 className="media-heading"><a href="#">{lineItem.product.description}</a></h4>
                    </div>
                </div></td>
                <td className="col-sm-1 col-md-1" style={{textAlign: "center"}}>
                <select
                className="form-control"
                name="orderQuantity"
                onChange={(event) => handleQuantityUpdate(event, cart.id, lineItem.product.id)}
                value={lineItem.quantity}>
                    <option value="">-- How many? --</option>
                    {
                        lineItem.product.quantity && [...Array(lineItem.product.quantity)].map((_quantity, i) => {
                            return (
                                <option key={i} value={i}>{i}</option>
                            );}
                        )
                    }
                </select>
                </td>
                <td className="col-sm-1 col-md-1 text-center"><strong>${lineItem.product.price}</strong></td>
                <td className="col-sm-1 col-md-1 text-center"><strong>${(lineItem.product.price * lineItem.quantity).toFixed(2)}</strong></td>
                <td className="col-sm-1 col-md-1">
                <button onClick={() => removeLineItemOnClick(cart.id, lineItem.product.id)} type="button" className="btn btn-danger">
                    <span className="glyphicon glyphicon-remove"></span> Remove
                </button></td>
            </tr>
              );
            })
            }
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td><h3>Total</h3></td>
                        <td className="text-right"><h3><strong>${cart.lineItems.reduce((total, lineItem) => { return total += lineItem.product.price * lineItem.quantity;}, 0).toFixed(2)}</strong></h3></td>
                    </tr>
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td>
                        <button type="button" className="btn btn-default">
                            <span className="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
                        </button></td>
                        <td>
                        <button type="button" className="btn btn-success">
                            Checkout <span className="glyphicon glyphicon-play"></span>
                        </button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
  );
};

const mapStateToProps = ({ cart, products }) => {
    return {
        cart,
        products
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleQuantityUpdate: (event, cartId, productId) => {
            dispatch(updateLineItem(cartId, productId, event.target.value, false));
        },
        removeLineItemOnClick: (cartId, productId) => {
            dispatch(removeLineItem(cartId, productId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
