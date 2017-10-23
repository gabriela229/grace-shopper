import axios from 'axios';

// ACTION TYPE(s)
const GET_REVIEWS = 'GET_REVIEWS';

// ACTION CREATOR(s)
export function loadReviews(reviews) {
  return {type: GET_REVIEWS, reviews};
}

// THUNK CREATOR(s)
export function getReviews() {
  return function thunk(dispatch) {
    return axios.get('/api/reviews')
      .then(res => res.data)
      .then(reviews => {
        dispatch(loadReviews(reviews));
      })
      .catch(err => console.log(err));
  };
}

export function postReview(review) {
  return function thunk(dispatch) {
    return axios.post('/api/reviews', review)
      .then(() => {
        dispatch(getReviews());
      })
      .catch(err => console.log(err));
  };
}

// REDUCER(s)
export default function reducer(state = [], action) {
  switch (action.type) {

    case GET_REVIEWS:
      return action.reviews;

    default:
      return state;
  }
}

