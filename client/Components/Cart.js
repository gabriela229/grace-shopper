import React from 'react';
import { connect } from 'react-redux';

const Cart = ({ cart, products }) => {
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
                <input type="email" className="form-control" id="exampleInputEmail1" value={lineItem.quantity} />
                </td>
                <td className="col-sm-1 col-md-1 text-center"><strong>${lineItem.product.price}</strong></td>
                <td className="col-sm-1 col-md-1 text-center"><strong>${lineItem.product.price * lineItem.quantity}</strong></td>
                <td className="col-sm-1 col-md-1">
                <button type="button" className="btn btn-danger">
                    <span className="glyphicon glyphicon-remove"></span> Remove
                </button></td>
            </tr>
              )
            })
            }
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td><h3>Total</h3></td>
                        <td className="text-right"><h3><strong>${cart.lineItems.reduce((total, lineItem) => { return total += lineItem.product.price * lineItem.quantity}, 0)}</strong></h3></td>
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
}

const mapStateToProps = ({ cart, products }) => {
  return {
    cart,
    products
  };
};

export default connect(mapStateToProps)(Cart);