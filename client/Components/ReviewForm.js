import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postReview} from '../store';

class ReviewForm extends Component {

  constructor(props) {
    super(props);
    // console.log("ReviewForm: constructor() - this.props = ", this.props);
    this.state = {
      content: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({content: evt.target.value});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const review = {
      content: evt.target.content.value,
      productId: this.props.product.id,
      userId: this.props.reviewer.id
    };
    this.props.dispatch(postReview(review));
    this.setState({content: ''});
  }

  render() {

    const {handleChange, handleSubmit} = this;
    const {content} = this.state;

    return (
      <div className="col-xs-12 col-sm-12 well well-sm product-buy-box center-block">
        <h4>Add a Review!</h4>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              name="content"
              onChange={handleChange}
              placeholder="Type your review..."
              type="text"
              value={content} />
          </div>

          <div>
            <button
              className="btn btn-sm btn-default"
              type="submit">Save</button>
          </div>
        </form>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log("ReviewForm: mapStateToProps - authUser = ", ownProps.authUser);
  // console.log("ReviewForm: mapStateToProps - singleProduct = ", ownProps.singleProduct);
  // console.log("ReviewForm: mapStateToProps - verified = ", ownProps.hasReviewed);

  return {
    reviewer: ownProps.authUser,
    product: ownProps.singleProduct,
    userHasReviewed: ownProps.hasReviewed
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     handleSubmitReview: (review) => {
//       dispatch(postReview(review));
//     },
//   };
// };

export default connect(mapStateToProps)(ReviewForm);
