import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store';
import { searchProducts, getProducts } from '../store/products';

const Checkout = (props) => {
  const {cart} = props;
  return (
    <div className="container wrapper">
            <div className="row cart-head">
                <div className="container">
                  
                </div>
            </div>    
            <div className="row cart-body">
                <form className="form-horizontal" method="post" action="">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-md-push-6 col-sm-push-6">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            Review Order <div className="pull-right"><Link to='/cart'>Edit Cart</Link></div>
                        </div>
                        <div className="panel-body">
                        {cart.lineItems.map(lineItem=> (
                            <div key = {lineItem.product.id} className="form-group">
                                <div className="col-sm-3 col-xs-3">
                                    <img className="img-responsive" src={lineItem.product.image} />
                                </div>
                                <div className="col-sm-6 col-xs-6">
                                    <div className="col-xs-12">{lineItem.product.title}</div>
                                    <div className="col-xs-12"><small>Quantity:<span>2</span></small></div>
                                </div>
                                <div className="col-sm-3 col-xs-3 text-right">
                                    <h6><span>$</span>3</h6>
                                </div>
                            </div>
                        ))}
                            <div className="form-group"><hr /></div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <strong>Order Total</strong>
                                    <div className="pull-right"><span>$</span><span>
                                    {cart.lineItems.reduce((total,lineItem)=> {
                                        return total + (2 * 3)
                                    },0)}
                                    </span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-md-pull-6 col-sm-pull-6">
                    <div className="panel panel-info">
                        <div className="panel-heading">Address</div>
                        <div className="panel-body">
                            <div className="form-group">
                                <div className="col-md-12">
                                    <h4>Shipping Address</h4>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-6 col-xs-12">
                                    <strong>First Name:</strong>
                                    <input type="text" name="first_name" className="form-control" value="" />
                                </div>
                                <div className="span1"></div>
                                <div className="col-md-6 col-xs-12">
                                    <strong>Last Name:</strong>
                                    <input type="text" name="last_name" className="form-control" value="" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12"><strong>Address:</strong></div>
                                <div className="col-md-12">
                                    <input type="text" name="address" className="form-control" value="" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12"><strong>City:</strong></div>
                                <div className="col-md-12">
                                    <input type="text" name="city" className="form-control" value="" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-6 col-xs-12">
                                    <strong>State:</strong>
                                    <input type="text" name="first_name" className="form-control" value="" />
                                </div>
                                <div className="span1"></div>
                                <div className="col-md-6 col-xs-12">
                                    <strong>Zip / Postal Code:</strong>
                                    <input type="text" name="last_name" className="form-control" value="" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12"><strong>Email Address:</strong></div>
                                <div className="col-md-12"><input type="text" name="email_address" className="form-control" value="" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-info">
                        <div className="panel-heading"><span><i className="glyphicon glyphicon-lock"></i></span> Secure Payment</div>
                        <div className="panel-body">
                            <div className="form-group">
                                <div className="col-md-12"><strong>Card Type:</strong></div>
                                <div className="col-md-12">
                                    <select id="CreditCardType" name="CreditCardType" className="form-control">
                                        <option value="5">Visa</option>
                                        <option value="6">MasterCard</option>
                                        <option value="7">American Express</option>
                                        <option value="8">Discover</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12"><strong>Credit Card Number:</strong></div>
                                <div className="col-md-12"><input type="text" className="form-control" name="car_number" value="" /></div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12"><strong>Card CVV:</strong></div>
                                <div className="col-md-12"><input type="text" className="form-control" name="car_code" value="" /></div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <strong>Expiration Date</strong>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <select className="form-control" name="">
                                        <option value="">Month</option>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                </select>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <select className="form-control" name="">
                                        <option value="">Year</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <button type="submit" className="btn btn-primary btn-submit-fix">Place Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                </form>
            </div>
            <div className="row cart-footer">
        
            </div>
    </div>
  )
}

const mapStateToProps = ({cart }) => {
  return {
    cart
  };
};

const mapDispatchToProps = function (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);