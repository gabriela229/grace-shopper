import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postReview} from '../store';

class ReviewForm extends Component {

  constructor(props) {
    super(props);
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
      productId: this.props.singleProduct.id,
      userId: this.props.authUser.id
    };
    this.props.dispatch(postReview(review));
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

const mapStateToProps = ({authUser, singleProduct}) => {
  console.log("ReviewForm: mapStateToProps - authUser = ", authUser);
  console.log("ReviewForm: mapStateToProps - singleProduct = ", singleProduct);

  return {
    authUser,
    singleProduct
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmitReview: (review) => {
      dispatch(postReview(review));
    },
  };
};

export default connect(mapStateToProps, mapStateToProps)(ReviewForm);
