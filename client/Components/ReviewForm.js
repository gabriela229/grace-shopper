import React, {Component} from 'react';
import {connect} from 'react-redux';
import store, {postReview} from '../store';

class ReviewForm extends Component {

  constructor(props) {
    super(props);
    console.log("ReviewForm: constructor() - props = ", props);
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
    console.log("ReviewForm: handleSubmit - this.props = ", this.props);
    const review = {
      content: evt.target.content.value,
      productId: this.props.singleProduct.id,
      userId: this.props.authUser.id
    };
    console.log("ReviewForm: handleSubmit - review = ", review);
    store.dispatch(postReview(review));
    this.setState({content: ''});
  }

  render() {
    // console.log("ReviewForm: render() - this.props = ", this.props);
    // const {
    //   authUser,
    //   product,
    // } = this.props;

    const {handleChange, handleSubmit} = this;
    const {content} = this.state;

    return (
      <div className="col-xs-12 col-sm-12 well well-sm product-buy-box center-block">
        <h4>Add a Review!</h4>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
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

const mapStateToProps = (ownProps) => {
  // console.log("ReviewForm: mapStateToProps - ownProps = ", ownProps);
  // // const {authUser, product} = ownProps;
  // const authUser = ownProps.authUser;
  // const product = ownProps.singleProduct;
  // console.log("ReviewForm: mapStateToProps - product = ", product);
  return {
    // authUser,
    // product,
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
