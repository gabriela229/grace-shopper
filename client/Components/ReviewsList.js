import React from 'react';

const ReviewsList = (props) => {

  const {productReviews} = props;

  return (
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
  );
};

export default ReviewsList;
