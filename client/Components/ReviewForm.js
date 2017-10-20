import React, {Component} from 'react';
import {connect} from 'react-redux';
import {} from '../store';

class ReviewForm extends Component {

  constructor() {
    super();
    this.state = {
      content: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    // const reviewContent = Number(evt.target.value);
    this.setState({content});
  }

  render() {

    const {
      authUser,
      product,
      productReviews,
    } = this.props;

    const {handleChange} = this;

    return (
      <div className="row">

        <div className="col-xs-12 col-sm-12 product-buy-box center-block">

        </div>

      </div>
    );
  }
}

const mapStateToProps = ({authUser}, ownProps) => {
  const { product, productReviews } = ownProps;

  return {
    authUser,
    product,
    productReviews,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {

//   };
// };

export default connect(mapStateToProps)(ReviewForm);
