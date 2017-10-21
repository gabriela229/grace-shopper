import React, {Component} from 'react';
import {connect} from 'react-redux';
import store, {postReview} from '../store';

class ReviewForm extends Component {

  constructor() {
    super();
    this.state = {
      content: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    // track the number of characters? min: 5, max: 500
    const reviewContent = evt.target.value;
    console.log("handleChange: reviewContent = ", reviewContent);
    this.setState({content: reviewContent});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const reviewContent = evt.target.content.value;
    console.log("handleSubmit: reviewContent = ", reviewContent);
    store.dispatch(postReview(reviewContent));
    this.setState({content: ''});
  }

  render() {

    const {
      authUser,
      product,
    } = this.props;

    const {handleChange, handleSubmit} = this;
    const {content} = this.state;

    return (
      <div className="row">

        <div className="col-xs-12 col-sm-12 product-buy-box center-block">
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

      </div>
    );
  }
}

const mapStateToProps = ({authUser}, ownProps) => {
  const {product} = ownProps;

  return {
    authUser,
    product,
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
